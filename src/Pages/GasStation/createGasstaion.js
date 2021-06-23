import React, { useState, useEffect } from "react";
import {StyleSheet, TextInput, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView,  Dimensions, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Header from "../../Components/Header/header";

import Global from "../../Public/Global";


export default function CreateGasstation({ navigation }) {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [CEP, setCEP] = useState("");
    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const [replayPassword, setReplayPassword] = useState("");
    const [ district, setDistrict] = useState('');
    const [ listDistrict, SetListDistrict ] = useState([]);

    const [ errors , setErrors ] = useState("");

    const [nameError, setNameError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [numberError, setNumberError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [CEPError, setCEPError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [replayPasswordError, setReplayPasswordError] = useState("");
    
    
    useEffect(() => {     
        listSelectDistrict("4314902");
    }, []);


    const Save = () => {

        var errorCreate = false
        if(!name || !number || !address){
            errorCreate = true
        }
        
        if(!errorCreate){

            fetch(Global.ServerIP + "api/GasStations/CreateGasStations", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: Global.Authorization,
                },             
                body: JSON.stringify({
                    name : name,
                    address : address,
                    number : number ,
                    CEP : CEP,
                    DistrictID: district  
                }),           
            })
                .then((response) => response.text())
                .then((responseText) => {
                    responseText = JSON.parse(responseText);
                    if (responseText.success) {
                        if(!responseText.data.gasStation){
                            setErrors(responseText.message);
                            console.log(responseText)
                            Alert.alert(
                                "Error",
                                errors,       
                            );
                        }else{
                            Alert.alert("Success", "Thank you feed back!\nThe gas station available after validation!")
                            navigation.navigate("Home");
                        }
                        

                    } else {
                        console.log(responseText.message)
                        setErrors(responseText.message);
                        Alert.alert(
                            "Error",
                            errors,       
                        );
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }else{
            if(!name){setNameError('Name is empty!')}else{setNameError('')}
            if(!address){setAddressError('Adress is empty!')}else{setAddressError('')}
            if(!number){setNumberError('Number is empty!')}else{setNumberError('')}
        }

    }

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
        <SafeAreaView style={styles.container}>
            <Header
                navigation = { navigation }
                menu = {true}
                title = {'Add Gass'}
            />
            <ScrollView 
            style={styles.scrollView}
            keyboardShouldPersistTaps='always'
            >
                <TextInput
                    style={styles.FirstInput}
                    placeholder={"Name"}
                    placeholderTextColor="#B2B0B0"
                    onChangeText={(text) => setName(text)}
                    value={name}
                />
                <Text style={nameError ? styles.error : ""}>{nameError}</Text>
                <TextInput
                    style={styles.Input}
                    placeholder={"Address"}
                    placeholderTextColor="#B2B0B0"
                    onChangeText={(text) => setAddress(text)}
                    value={address}
                />
                <Text style={addressError ? styles.error : ""}>{addressError}</Text>
                <TextInput
                    style={styles.Input}
                    placeholder={"Number"}
                    placeholderTextColor="#B2B0B0"
                    onChangeText={(text) => setNumber(text)}
                    value={number}
                    
                />
                <Text style={numberError ? styles.error : ""}>{numberError}</Text>

                <TextInput
                    style={styles.Input}
                    placeholder={"CEP"}
                    placeholderTextColor="#B2B0B0"
                    onChangeText={(text) => setCEP(text)}
                    value={CEP}
                />

<               Text ></Text>
                <TouchableOpacity style={district ? styles.selectDistrict : styles.selectPlaceholderDistrict}>
                    <Picker
                        selectedValue={district}
                        style={ district ? styles.selectDistrict : styles.selectPlaceholderDistrict}
                        onValueChange={(itemValue) => 
                        setDistrict(itemValue)}                      
                    >
                        <Picker.Item label={"Select District"} value={""} key={""}/>
                        {
                            Object.keys(listDistrict).map(key => {
                                return <Picker.Item label={listDistrict[key]} value={key} key={key}/>
                            })
                        } 
                        <Picker.Item label={"Outher District"} value={"NF"} key={"NF"}/> 
                    </Picker>
                </TouchableOpacity> 



                <Text style={styles.Button} onPress={Save}>
                    Create
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

let heightScreen = Dimensions.get('window').height; 
let widthScreen = Dimensions.get('window').width;

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
    },   
    selectDistrict: {
        width: widthScreen * 0.83,
        marginLeft:0,
        backgroundColor: "#E5E5E5",
        borderRadius: 5,
        height: 50,
        color: "black",
        paddingLeft: 10
        
    },
    selectPlaceholderDistrict:{
        width: widthScreen * 0.83,
        marginLeft:0,
        backgroundColor: "#E5E5E5",
        borderRadius: 5,
        height: 50,
        color: "#B2B0B0",
        paddingLeft: 10,
        fontWeight:'bold'
        
    },
});
