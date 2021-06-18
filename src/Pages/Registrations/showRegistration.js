import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, SafeAreaView, Dimensions, Image, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";



import Global from "../../Public/Global";
import Header from "../../Components/Header/header";

export default function ShowRegistration ({ navigation }) {

    const [ registration, SetRegistration ] = useState({});

    useEffect(() => {     
        getData();
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

    getData();

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

                } else {
                    console.log(responseText.message);                 
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };


    //<TouchableOpacity 
    //            style={styles.ContainerPictureProfile}
    //            onPress={() =>{alert('Adicionar Imagem')}}
    //            >
    //            <Image
    //                style={styles.PictureProfile}
    //                source={require('../../assets/Picture_User_Add_Black.png')}                   
    //            />
    //</TouchableOpacity>

    return (
        <View style={styles.Container}>
            <Header
                    navigation = { navigation }
                    menu = {true}
                    title = {'Show Registration'}
                />

            
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
                    <Text style={styles.Property}>CEP</Text>
                    <Text style={styles.PropertyValue} >{registration.CEP ? registration.CEP : "uninformed"}</Text>

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
        height : heightScreen * 0.95,
        paddingTop: 20
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
