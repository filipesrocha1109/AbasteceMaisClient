import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Global from "../../Public/Global";

export default function DeleteRegistration ({ navigation }) {

    const [ userID, SetuserID ] = useState({});

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const registration_id = await AsyncStorage.getItem("@registration_id");
            
            if (registration_id) {
                SetuserID(registration_id);
            } else {
                () => navigation.navigate("Login");
            }
        } catch (e) {
            Alert.alert(e);
        }
    };

    const Disconnect = async (value) => {
        try {
            await AsyncStorage.removeItem('@'+value)
        } catch(e) {
            console.log(e);
        }
    };

    const DeleteRegistrationConfirm = () =>{
        Alert.alert("Deletion confirmation!", "Are you sure ? This action is irreversible!",[
            {
              text: "Cancel"
            },
            { text: "OK", 
                onPress: () => DeleteRegistration(userID) 
            }
          ]
        );
    };

    const DeleteRegistration = ( Id ) =>{
        fetch(Global.ServerIP + "api/Registrations/DeleteRegistrationsByID?ID="+ Id , {
            method: "DELETE",
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

                    console.log(responseText.data.registrationDeletdID)
                    Disconnect('registration_id')	
                    navigation.navigate('Login')

                } else {
                    console.log(responseText.message);                 
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
  
    return (
        <View style={styles.container}>
            <Text style={styles.title}>               
                Are you sure you want to delete the registration?
            </Text>
            <Text  style={styles.subtitle}>               
                This action is irreversible!
            </Text>
            <Text
                style={styles.deleteUser}
                onPress={()=> DeleteRegistrationConfirm()}
            >
                Delete User
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex : 1,      

    },
    deleteUser:{
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
    title:{
        textAlign: 'center',
        marginTop:150,
        fontSize:20,
        fontWeight:'bold'
    },
    subtitle:{
        textAlign: 'center',
        marginBottom:70,
        fontSize:20,
        marginTop:10,
    },
});
