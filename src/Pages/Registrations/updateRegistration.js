import React, { useState, useEffect } from "react";
import {StyleSheet, TextInput, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView,  View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Global from "../../Public/Global";


export default function CreateRegistration({ navigation }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [CEP, setCEP] = useState("");
    const [password, setPassword] = useState("");
    const [replayPassword, setReplayPassword] = useState("");

    const [ errors , setErrors ] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [CEPError, setCEPError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [replayPasswordError, setReplayPasswordError] = useState("");
    
    
    useEffect(() => {     
        getData();
    }, []);


    const getData = async () => {
        try {
            const registration_id = await AsyncStorage.getItem("@registration_id");
            if (registration_id) {
                GetRegistration(registration_id);        

            } else {
                () => navigation.navigate("CreateRegistration");
            }
        } catch (e) {
            Alert.alert(e);
        }
    };

    const GetRegistration = ( ID ) =>{
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

                    setName(responseText.data.registration.name)
                    setEmail(responseText.data.registration.email)
                    setCEP(responseText.data.registration.cep)


                } else {
                    console.log(responseText.message);                 
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }


    const Save = () => {

        var errorCreate = false

        if (!name) {
            setNameError("Name is empity");
            errorCreate = true;
            
        } else {
            setNameError("");
        }
        if (!email) {
            setEmailError("Email is empity");
            
        } else {
            setEmailError("");
        }
        if (!password) {
            setPasswordError("Password is empity");
            errorCreate = true;
        } else {
            setPasswordError("");
        }
        if (!replayPassword) {
            setReplayPasswordError("Replay Password is empity");
            errorCreate = true;
        } else {
            setReplayPasswordError("");
        }

        if(replayPassword && password ){
            if (replayPassword != password) {
                setReplayPasswordError("Different passwords");
                setPasswordError("Different passwords");
                errorCreate = true;
            } else {
                setReplayPasswordError("");
                setPasswordError("");
            }
        }
        
        if(!errorCreate){
            fetch(Global.ServerIP + "api/Registrations/CreateRegistrations", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: Global.Authorization,
                },
                body: JSON.stringify({
                    name : name,
                    email : email,
                    password : password,
                    CEP : CEP ? CEP : null ,
                }),            
            })
                .then((response) => response.text())
                .then((responseText) => {
                    responseText = JSON.parse(responseText);
                    if (responseText.success) {
                        if(!responseText.data.registration){
                            setErrors(responseText.message);
                            Alert.alert(
                                "Error",
                                errors,       
                            );
                        }else{
                            navigation.navigate("Login");
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
        }

    }


    return (
        <SafeAreaView style={styles.container}>
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
                    placeholder={"E-mail"}
                    placeholderTextColor="#B2B0B0"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                />
                <Text style={emailError ? styles.error : ""}>{emailError}</Text>
                <TextInput
                    style={styles.Input}
                    placeholder={"CEP"}
                    placeholderTextColor="#B2B0B0"
                    onChangeText={(text) => setCEP(text)}
                    value={CEP}
                />
                <Text style={CEPError ? styles.error : ""}>{CEPError}</Text>
                <TextInput
                    style={styles.Input}
                    placeholder={"Password"}
                    placeholderTextColor="#B2B0B0"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                />
                <Text style={passwordError ? styles.error : ""}>
                    {passwordError}
                </Text>
                <TextInput
                    style={styles.Input}
                    placeholder={"Replay Password"}
                    placeholderTextColor="#B2B0B0"
                    onChangeText={(text) => setReplayPassword(text)}
                    value={replayPassword}
                    secureTextEntry={true}
                />
                <Text style={replayPasswordError ? styles.error : ""}>
                    {replayPasswordError}
                </Text>

                <Text style={styles.Button} onPress={Save}>
                    Update
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
