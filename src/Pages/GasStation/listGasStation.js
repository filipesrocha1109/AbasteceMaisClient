import React, { useState, useEffect } from "react";
import {StyleSheet, Image, Linking, TextInput, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView, StatusBar, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Global from "../../Public/Global";


export default function ListGasStation(props) {
    
    var name = props.name;

    const [ registrationId, setRegistrationId] = useState("");

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        try {
            const registration_id = await AsyncStorage.getItem(
                "@registration_id"
            );
            if (registration_id) {
                setRegistrationId(registration_id);
            } else {
                () => navigation.navigate("CreateRegistration");
            }
        } catch (e) {
            Alert.alert(e);
        }
    };

    const assessment = (gasStation, registration, assessmentString) =>{

        fetch(Global.ServerIP + "api/GasStations/CreateAssessment" , {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: Global.Authorization,
            },body: JSON.stringify({
                GasStationID: gasStation,
                RegistrationID: registration,
                Assessment: assessmentString
            }),
        })
            .then((response) => response.text())
            .then((responseText) => {
                responseText = JSON.parse(responseText);
                if (responseText.success) {
                    //console.log(responseText.data);
                    Alert.alert("Your assessment has been added.","Thanks for feddback!");

                } else {
                    console.log(responseText.message);                 
                }
            })
            .catch((error) => {
                console.error(error);
            }); 
    }

    return (
       
            <View style={styles.ContainerGasStation}>
                <View style={styles.ContainerLeft}>
                    <TouchableOpacity  onPress={props.route}>
                        <Text style={styles.Name} >
                            {name.length > 25 ? name.substring(0, 25) + "...": name}
                        </Text>
                        <Text>
                            {`${props.address}, ${props.number} - ${props.districtID}` }
                        </Text>
                        <Text>
                            {`${props.cep ? props.cep: '00000-000' }`}
                        </Text>
                    </TouchableOpacity >
                    <View style={styles.ContaineButtons}> 
                        <MaterialCommunityIcons
                            name="google-maps"
                            size={25}
                            color="black"
                            style={styles.maps}
                            onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${props.address}, ${props.number} - ${props.districtID}` )}
                        />
                        <Text 
                            style ={styles.distance}
                        >
                            { Number(props.distance).toFixed(2) + " km"}
                        </Text>
                        <View style={styles.ContaineButtons} >
                            <AntDesign
                                name="like1"
                                size={25}
                                color="green"
                                style={styles.like}
                                onPress={() => assessment(props.id,registrationId,true)}
                                
                            />
                            <AntDesign
                                name="dislike1"
                                size={25}
                                color="red"
                                style={styles.like}
                                onPress={() => assessment(props.id,registrationId,false)}
                                
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.ContainerRight}>
                    <View style={styles.ContainerPrice}>
                        <Image
                            style={styles.ImgTypeGas}
                            source={ props.priceGasolinaComum == 0 ? require('../../assets/GC_GRAY.png') : require('../../assets/GC.png')}
                        />
                         <Text style = { props.priceGasolinaComum == 0 ? styles.PriceWhite : styles.Price}> 
                           R$ {props.priceGasolinaComum ? props.priceGasolinaComum : 0 }
                        </Text>
                    </View >
                    <View style={styles.ContainerPriceGray}>
                        <Image
                            style={styles.ImgTypeGas}
                            source={ props.priceGasolinaAditivada == 0 ? require('../../assets/GA_GRAY.png') : require('../../assets/GA.png')}
                        />
                        <Text style = { props.priceGasolinaAditivada == 0 ? styles.PriceWhite : styles.Price}> 
                            R$ {props.priceGasolinaAditivada ? props.priceGasolinaAditivada : 0 }
                        </Text>
                    </View>
                    <View style={styles.ContainerPrice}>
                        <Image
                            style={styles.ImgTypeGas}
                            source={ props.priceDisel == 0 ? require('../../assets/DS_GRAY.png') : require('../../assets/DS.png')}
                        />
                        <Text style = { props.priceDisel == 0 ? styles.PriceWhite : styles.Price}> 
                            R$ {props.priceDisel ? props.priceDisel : 0 }
                        </Text>
                    </View>
                    <View style={styles.ContainerPriceGray}>
                        <Image
                            style={styles.ImgTypeGas}
                            source={ props.priceGas == 0 ? require('../../assets/GS_GRAY.png') : require('../../assets/GS.png')}
                        />
                        <Text style = { props.priceGas == 0 ? styles.PriceWhite : styles.Price}> 
                            R$ {props.priceGas ? props.priceGas : 0 }
                        </Text>
                        
                    </View>
                    {  props.lastUpdatePrice ?
                    <View style={{display:'flex',flexDirection:'row', paddingTop:5,paddingLeft:5}}>
                        <MaterialCommunityIcons
                        name="update"
                        size={20}
                        color="black"         
                        />

                        <Text style={styles.updated}>
                        {props.lastUpdatePrice}
                        </Text>
                    </View>
                    :
                    <View style={{display:'flex',flexDirection:'row', paddingTop:5,paddingLeft:5}}>
                        <MaterialCommunityIcons
                        name="update"
                        size={20}
                        color="black"         
                        />

                        <Text style={styles.updated}>
                        Not Found
                        </Text>
                    </View>
                    }
                    
                </View>
                
            </View> 
       
    );
}


const styles = StyleSheet.create({
    ContainerGasStation:{
        backgroundColor:"#E5E5E5",
        
        borderRadius:5,
        marginBottom: 7,
        flexDirection:'row'

    },
    ContainerLeft:{
        width:'67%',
        margin:3,
        borderRadius:5,
        padding:10
    },
    ContainerRight:{
        width:'30%',
        margin:3,
        borderRadius:5       
    },
    ImgTypeGas:{
        height: 30,
        width: 30,
        resizeMode: "stretch",
        alignItems: "center",   
        marginTop:3,    
    },
    Price:{
        color:'black',
        marginTop:5,
        fontSize:18,
        fontFamily:'Roboto',
        marginRight:10
    },
    PriceWhite:{
        color:'#B0B0B0',
        marginTop:5,
        fontSize:18,
        fontFamily:'Roboto',
        marginRight:10
    },
    ContainerPrice:{
        flexDirection: "row",
        justifyContent: 'space-between',
        
        borderRadius:5      
    },
    ContainerPriceGray:{
        flexDirection: "row",
        justifyContent: 'space-between',
        
        borderRadius:5      
    },
    Name:{
        fontSize:21,
        fontWeight:'bold',
        color:'#0e2d3f'
    },
    maps:{
        backgroundColor:'#B2B0B0',
        height:25,
        width:25,
        borderRadius:5,
        marginTop: 3,
        marginLeft:5
    },
    like:{
        height:25,
        width:25,
        borderRadius:5,
        marginTop: 3,
        marginLeft:5
    },
    ContaineButtons:{
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingRight:5,
        marginTop:5
    },
    distance:{
        marginTop: 7
    },
    updated:{
        fontSize: 11,
        //marginLeft: -15,
        marginBottom: 3,
        textAlign:'center',
        marginTop:3,
        marginLeft:5
    }

});