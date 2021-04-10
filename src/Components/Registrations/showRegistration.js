import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, SafeAreaView, Dimensions, Image, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Entypo from "react-native-vector-icons/Entypo";

import Global from "../../Public/Global";

export default function ShowRegistration ({ navigation }) {

    const [ registration, SetRegistration ] = useState({});

    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    
    const [ listState, SetListState ] = useState([]);
    const [ listCity, SetListCity ] = useState([]);
    const [ listDistrict, SetListDistrict ] = useState([]);


    useEffect(() => {     
        getData();
        listSelectState();
    }, []);

    const getData = async () => {
        try {
            const registration_id = await AsyncStorage.getItem(
                "@registration_id"
            );
            if (registration_id) {
                GetRegistration(registration_id);
                
            } else {
                () => navigation.navigate("CreateRegistration");
            }
        } catch (e) {
            Alert.alert(e);
        }
    };

    const GetRegistration = ( ID ) => {
        fetch(Global.ServerIP + "api/Registrations/GetRegistrationsByID?ID="+ ID , {
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
                    
                    SetRegistration(responseText.data.registration);
                    listSelectCity(responseText.data.registration.stateID);
                    listSelectDistrict(responseText.data.registration.cityID)

                } else {
                    console.log(responseText.message);                 
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const listSelectState = () =>{
        fetch(Global.ServerIP + "api/Registrations/GetStates", {
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
                    
                    var list = {};
                    var listState = responseText.data.listStates;

                    for (var i = 0; i < listState.length; ++i){
                        list[listState[i].id] = listState[i].name;
                    }       

                    SetListState(list);

                } else {
                    console.log(responseText.message);                 
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    

    const listSelectCity = ( stateID ) =>{
        fetch(Global.ServerIP + "api/Registrations/GetCitys?StateID=" + stateID , {
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

                    var list = {};
                    var listCitys = responseText.data.listCitys;

                    for (var i = 0; i < listCitys.length; ++i){
                        list[listCitys[i].id] = listCitys[i].name;
                    }       

                    SetListCity(list);         

                } else {
                    console.log(responseText.message);                 
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const listSelectDistrict = ( cityID ) =>{
        fetch(Global.ServerIP + "api/Registrations/GetDistricts?CityID=" + cityID , {
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
                    var list = {};
                    var listDistricts = responseText.data.listDistricts;

                    for (var i = 0; i < listDistricts.length; ++i){
                        list[listDistricts[i].id] = listDistricts[i].name;
                    }       

                    SetListDistrict(list);
 
                } else {
                    console.log(responseText.message);                 
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <View style={styles.Container}>

            <TouchableOpacity 
                style={styles.ContainerPictureProfile}
                onPress={() =>{alert('Adicionar Imagem')}}
                >
                <Image
                    style={styles.PictureProfile}
                    source={require('../../assets/Picture_User_Add_Black.png')}                   
                />
            </TouchableOpacity>
            <SafeAreaView >
                <ScrollView 
                style={styles.ContainerDataProfile}
                keyboardShouldPersistTaps='always'
                >
                <View>
                    <Text style={styles.Property}>Name</Text>
                    <Text style={styles.PropertyValue} >{registration.name}</Text>
                    <Text style={styles.Property}>Email</Text>
                    <Text style={styles.PropertyValue} >{registration.email}</Text>
                    <Text style={styles.Property}>CPF / CNPJ</Text>
                    <Text style={styles.PropertyValue} >{registration.cpfcnpj}</Text>
                    <Text style={styles.Property}>Phone</Text>
                    <Text style={styles.PropertyValue} >{registration.phone}</Text>
                    <Text style={styles.Property}>CEP</Text>
                    <Text style={styles.PropertyValue} >{registration.CEP}</Text>
                    <Text style={styles.Property}>Address</Text>
                    <Text style={styles.PropertyValue} >{registration.address}</Text>
                    <Text style={styles.Property}>Number</Text>
                    <Text style={styles.PropertyValue} >{registration.number}</Text>
                    <Text style={styles.Property}>District</Text>
                    <Text style={styles.PropertyValue} >{registration.districtID == "NF" ? "Não Informado": listDistrict[registration.districtID] }</Text>
                    <Text style={styles.Property}>City</Text>
                    <Text style={styles.PropertyValue} >{registration.cityID == "NF" ? "Não Informado": listCity[registration.cityID] }</Text>
                    <Text style={styles.Property}>State</Text>
                    <Text style={styles.PropertyValue} >{registration.stateID == "NF" ? "Não Informado": listState[registration.stateID]}</Text>

                    <Text
                        style={styles.EditUser}
                        onPress={()=> navigation.navigate("Update")}
                    >
                        Edit User
                    </Text>
                    <Text
                        style={styles.DeleteUser}
                        onPress={()=> navigation.navigate("Delete")}
                    >
                        Delete User
                    </Text>
                </View>

                </ScrollView>
            </SafeAreaView>

        </View>
    );
}

let heightScreen = Dimensions.get('window').height; 
let widthScreen = Dimensions.get('window').width;

const styles = StyleSheet.create({
    Container : {
        flex: 1,
        height:heightScreen,
        width:widthScreen,
        backgroundColor:'#ffff'
        
    },
    ContainerPictureProfile:{
        height : heightScreen * 0.2 ,
        //backgroundColor: 'red',
        justifyContent:"center",
        alignItems:'center'
    },
    ContainerDataProfile :{
        height : heightScreen * 0.65
        //backgroundColor: 'blue'
    },
    PictureProfile:{
        marginTop:25,
        height:150,
        width:150
        //marginTop:20
    },
    Property:{
        marginLeft:25,
        fontSize:18,
        marginTop:10,
        marginBottom:10,
        fontWeight:'bold'
    },
    PropertyValue:{
        marginLeft:25,
        fontSize:18,
        backgroundColor:'#E5E5E5',
        marginRight:25,
        borderRadius:5,
        paddingLeft:20,
        height:50,
        textAlignVertical:'center'

    },
    IconMenu:{
        position:'absolute',
        top: -20,
        zIndex:999
    },
    DeleteUser:{
        marginLeft:25,
        fontSize:20,
        backgroundColor:'#E31111',
        marginRight:25,
        borderRadius:5,
        paddingLeft:20,
        height:50,
        textAlignVertical:'center',
        textAlign:'center',
        fontWeight:'bold'
    },
    EditUser:{
        marginLeft:25,
        fontSize:20,
        backgroundColor:'#2B83A9',
        marginRight:25,
        borderRadius:5,
        paddingLeft:20,
        height:50,
        textAlignVertical:'center',
        marginBottom:25,
        marginTop:25,
        textAlign:'center',
        fontWeight:'bold'
    }

});
