import React, { useState, useEffect } from "react";
import {StyleSheet, Dimensions, TextInput, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView, StatusBar, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Global from "../../Public/Global";
import Comment from "../GasStation/comment";
import NotFound from './notFoundComment';
import Feather from "react-native-vector-icons/Feather";
import { Rating, AirbnbRating } from 'react-native-elements';
import Star from '../GasStation/star'


export default function ShowGasStation( { route , navigation }) {

    const [ name, setName ] = useState("");
    const [ fullAddress, setFullAddress ] = useState("");
    const [ listComments, SetListComments] = useState([]);
    const [ comment, setComment ] = useState("");
    const [ registrationId, setRegistrationId] = useState("");
    const [ star, setStar ] = useState(0);
    const { id } = route.params;

    useEffect(() => {
        getGasStation(id),
        comments(id),  
        getData()
    }, []);

    var StarsValue = 0;

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


    const getGasStation = ( id ) =>{

        fetch(Global.ServerIP + "api/GasStations/GetGasStationsByID?ID="+  id , {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: Global.Authorization,
            }
        })
            .then((response) => response.text())
            .then((responseText) => {
                responseText = JSON.parse(responseText);
                if (responseText.success) {
                    var gas = responseText.data.gasStation;

                    setName(gas.name);
                    setFullAddress(gas.address + ", " + gas.number + " - " + gas.districtID)
                    
                } else {
                    console.log(responseText.message);                 
                }
            })
            .catch((error) => {
                console.error(error);
            });    
    }

    const comments = (gasstation) =>{

        fetch(Global.ServerIP + "api/GasStations/GetComments?GasStationID=" + gasstation , {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: Global.Authorization,
            }
        })
            .then((response) => response.text())
            .then((responseText) => {
                responseText = JSON.parse(responseText);
                if (responseText.success) {
                    //console.log(responseText.data.comments)
                    SetListComments(responseText.data.comments)
                    
                } else {
                    console.log(responseText.message);                 
                }
            })
            .catch((error) => {
                console.error(error);
            });  


    }
    const addComments = (gasstation, registration, comment) =>{

        fetch(Global.ServerIP + "api/GasStations/CreateComments" , {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: Global.Authorization,
            },body: JSON.stringify({
                GasStationID: gasstation,
                RegistrationID: registration,
                Comment:comment
            }),
        })
            .then((response) => response.text())
            .then((responseText) => {
                responseText = JSON.parse(responseText);
                if (responseText.success) {
                    //console.log(responseText.data.comments);
                    Alert.alert("Your comment has been added.","Thanks for feddback!");
                    comments(id);
                    setComment("");
                    
                } else {
                    console.log(responseText.message);                 
                }
            })
            .catch((error) => {
                console.error(error);
            });  

    }

    
    
    return (
        <View >
            <View style={ styles.details }>
                <Text> { name } </Text>
                <Text> { fullAddress } </Text>
                <Text 
                    style={styles.updatePrices}
                    onPress= {() => navigation.navigate("UpdatePrice", { id: id } )}
                >
                    Updadte prices
                </Text>
                             
            </View>
            <View 
                style={styles.star}
            >
                <Star
                    id={id}
                    
                />
            </View>
            <View style={ styles.container } >

                <View style={ styles.containerInput }  >
                    <TextInput style={styles.input}
                        placeholder={"comment ..."}
                        numberOfLines={10}
                        multiline={true}
                        onChangeText={(text) => setComment(text)}
                        value={comment}
                    />  
                </View>
        
                <Feather
                    name="send"
                    size={30}
                    color={"#0e2d3f"}
                    style={styles.send}
                    onPress ={ () => addComments(id, registrationId, comment)}
                />
            </View>
            
            <SafeAreaView >
                <ScrollView 
                style={styles.scrollView}
                keyboardShouldPersistTaps='always'
                >
                    
                {                  
                    listComments.length>0 ?

                        listComments.map(({
                            id,
                            gasStaionID,
                            registrationID,
                            comment,
                            createdOn,
                            })=>{
                                return(
                                    <Comment
                                        id = {id}
                                        key = {id}                     
                                        comment={comment}                                                
                                    />
                                )   
                            })
                        :    
                        <NotFound                                           
                        />                 
                                        
                }     
               
                </ScrollView>
            </SafeAreaView >
        </View>
        
        
    );
};

let heightScreen = Dimensions.get('window').height; 
let widthScreen = Dimensions.get('window').width;

const styles = StyleSheet.create({
    details:{
        backgroundColor:'#E5E5E5',
        //backgroundColor:'red',
        height: heightScreen * 0.35,
        borderRadius: 10
    },
    lineWhite:{
        height:10,
        backgroundColor:'#000000',
    },
    scrollView: {
        marginHorizontal: 5,
        height:heightScreen* 0.3
    },
    containerInput:{
        backgroundColor:'#E5E5E5',
        height: heightScreen * 0.15,
        borderRadius: 10,
        padding: 10
    },
    lineWhite:{
        height:10
    },
    input:{
        //backgroundColor: '#FFFFFF',
        height: '100%',
        borderColor: '#B2B1B1',
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        paddingRight:50,
        width: widthScreen * 0.82,

    },
    send:{
        transform: [{ rotate: '42deg'}],
        alignSelf:'flex-end',
        marginRight: 20,
        marginTop: -60
    },

    commnet:{
        backgroundColor:'#E5E5E5',
        height: heightScreen * 0.15,
        borderRadius: 10,
        padding: 10
    },
    container:{
        marginTop: 5,
        marginBottom: 35
    },
    star:{
        backgroundColor:'#E5E5E5',
        width: widthScreen
    },
    updatePrices:{
        color:'#ffff',
        backgroundColor:'#1F9BE2',
        height : 30,
        width: 130,
        textAlign:'center',
        textAlignVertical: 'center',
        borderRadius: 5

    }
});
