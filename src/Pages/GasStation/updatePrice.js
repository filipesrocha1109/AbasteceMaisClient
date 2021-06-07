import React, { useState, useEffect } from "react";
import {StyleSheet, TextInput, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView,  View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Global from "../../Public/Global";
import NumericInput from '@wwdrew/react-native-numeric-textinput'

export default function UpdatePrice({ route , navigation } ) {
    const [gasolinaComum, setGasolinaComum] = useState("");
    const [checkGasolinaComum, setCheckGasolinaComum] = useState("");
    const [gasolinaAditivada, setGasolinaAditivada] = useState("");
    const [checkGasolinaAditivada, setCheckGasolinaAditivada] = useState("");
    const [disel, setDisel] = useState("");
    const [checkDisel, setCheckDisel] = useState("");
    const [gas, setGas] = useState("");
    const [checkGas, setCheckGas] = useState("");
    const [registrationId, setRegistrationId] = useState("");
     
    const { id } = route.params;
    
    
    useEffect(() => {     
        //getGasStation(id),
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


    const UpdatePrice = () =>{

        if(validate()){

            fetch(Global.ServerIP + "api/GasStations/UpdatePriceGasStations" , {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: Global.Authorization,
                },
                body: JSON.stringify({
                GasstationID: id,
                RegistrationID: registrationId,
                GasolinaComum: gasolinaComum ? gasolinaComum : 0,
                GasolinaAditivada: gasolinaAditivada ? gasolinaAditivada : 0 ,
                Gas: gas ? gas : 0,
                Disel: disel ? disel : 0
                }),
            })
                .then((response) => response.text())
                .then((responseText) => {
                    responseText = JSON.parse(responseText);
                    if (responseText.success) {
                        navigation.goBack()
                    } else {
                        console.log(responseText.message);                 
                    }
                })
                .catch((error) => {
                    console.error(error);
                });

        }else{

            Alert.alert("All empty fields.","Add at least one price!");          
        }

            
    }

    const validate = () => {
        if(gasolinaComum || gasolinaAditivada || disel || gas){
            return true
        }else{
            return false
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView 
            style={styles.scrollView}
            keyboardShouldPersistTaps='always'
            >
                <NumericInput
                    style={styles.Input}
                    type='currency'
                    locale='pt-BR'
                    currency='BRL'
                    value={gasolinaComum}
                    onUpdate={(value) => setGasolinaComum(value)}
                    placeholder={"Gasolina Comum"}
                />
                <NumericInput
                    style={styles.Input}
                    type='currency'
                    locale='pt-BR'
                    currency='BRL'
                    value={gasolinaAditivada}
                    onUpdate={(value) => setGasolinaAditivada(value)}
                    placeholder={"Gasolina Aditivada"}
                />
                <NumericInput
                    style={styles.Input}
                    type='currency'
                    locale='pt-BR'
                    currency='BRL'
                    value={disel}
                    onUpdate={(value) => setDisel(value)}
                    placeholder={"Disel"}
                />               
                <NumericInput
                    style={styles.Input}
                    type='currency'
                    locale='pt-BR'
                    currency='BRL'
                    value={gas}
                    onUpdate={(value) => setGas(value)}
                    placeholder={"Gás"}
                />                   
                <Text 
                    style={styles.Button} 
                    onPress={() =>{ UpdatePrice()}}
                >
                    Update Prices
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        marginHorizontal: 30,
    },
    FirstInput: {
        width: "100%",
        backgroundColor: "#E5E5E5",
        borderRadius: 5,
        height: 50,
        paddingLeft: 20,
        color: "#000000",
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 25,
    },
    Input: {
        marginTop: 25,
        width: "100%",
        backgroundColor: "#E5E5E5",
        borderRadius: 5,
        height: 50,
        paddingLeft: 20,
        color: "#000000",
        fontSize: 15,
        fontWeight: "bold",
    },
    Button: {
        backgroundColor: "#1F9BE2",
        borderRadius: 5,
        height: 40,
        width: "100%",
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: 20,
        marginTop: 15,
        paddingTop: 6,
        fontWeight: "bold",
        fontFamily: "Roboto",
        marginBottom: 20,
    },
    error: {
        color: "#D83E45",
        marginLeft: 20,
        marginBottom: 3,
        marginTop: 3,
        fontSize: 12,
    },
    select: {
        width: "100%",
        backgroundColor: "#E5E5E5",
        borderRadius: 5,
        height: 50,
        paddingLeft: 15,
        color: "#000000",
        
    },
    selectPlaceholder: {
        width: "100%",
        backgroundColor: "#E5E5E5",
        borderRadius: 5,
        height: 50,
        paddingLeft: 15,
        color: "#B2B0B0",
        
    },
    Number:{
        width: '30%',
        marginLeft:10
    },
    Address:{
        width: '67%'
    },
    ContainerAdress:{
        flexDirection:'row'
    },
    ErrorNumber:{
        marginLeft:110
    }
});
