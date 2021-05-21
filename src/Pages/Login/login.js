import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, Text, View, Alert,Image } from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconIonicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Global from "../../Public/Global";

export default function Login({ navigation }) {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [erros, setErros] = useState("");

    // storeData String
    const StoreData = async (value, name) => {
        try {
            await AsyncStorage.setItem("@" + name, value);
        } catch (e) {
            console.log(e);
        }
    };

    const Login = () => {
        if (user && password) {
            fetch(Global.ServerIP + "api/Registrations/LoginRegistrations", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: Global.Authorization,
                },
                body: JSON.stringify({
                    username: user,
                    password: password,
                }),
            })
                .then((response) => response.text())
                .then((responseText) => {
                    responseText = JSON.parse(responseText);
                    if (responseText.success) {
                        StoreData(
                            responseText.data.registration.id,
                            "registration_id"
                        );
                        navigation.navigate("Home");
                        //navigation.navigate("Test");
                    } else {
                        setErros(responseText.message);
                        Alert.alert(
                            erros,
                            "Enter a valid username and password!"
                        );
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            setErros("Invalid username or password");
            Alert.alert(erros, "Enter a valid username and password!");
        }
    };

    return (
        <View style={styles.Container}>
            <Image
                style={styles.IconLogo}
                source={require('../../assets/logo-black.png')}
            />
            <IconAntDesign
                name="user"
                size={20}
                color="#ffff"
                style={styles.IconUser}
            />
            <TextInput
                style={styles.Input}
                placeholder={"Username"}
                placeholderTextColor="#fff"
                onChangeText={(text) => setUser(text)}
                value={user}
            />
            <IconIonicons
                name="key"
                size={20}
                color="#ffff"
                style={styles.IconPassword}
            />
            <TextInput
                style={styles.Input}
                placeholder={"Password"}
                placeholderTextColor="#fff"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
            />
            <Text style={styles.Button} onPress={Login}>
                LOGIN
            </Text>
            <Text style={styles.ForgotPasswor}>forgot passwor ?</Text>
            <Text
                style={styles.ForgotPasswor}
                onPress={() => navigation.navigate("Create",{ screen: 'Create' })}
            >
                Sing Up
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    Input: {
        height: 50,
        width: "85%",
        backgroundColor: "#0e2d3f",
        marginTop: 15,
        borderRadius: 5,
        color: "#ffff",
        paddingLeft: 50,
    },
    Titulo: {
        fontSize: 30,
        textAlign: "center",
    },
    Button: {
        backgroundColor: "#1F9BE2",
        borderRadius: 5,
        height: 40,
        width: "85%",
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: 20,
        marginTop: 15,
        paddingTop: 6,
        fontWeight: "bold",
        fontFamily: "Roboto",
    },
    Error: {
        backgroundColor: "red",
        color: "white",
        textAlign: "center",
        marginBottom: 20,
        fontSize: 20,
        padding: 5,
    },
    Container: {
        backgroundColor: "#1d4a5f",
        flex: 1,
        alignItems: "center",
        
    },
    ForgotPasswor: {
        color: "#ffff",
        textAlign: "center",
        marginTop: 7,
    },
    imageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: "stretch",
        alignItems: "center",
    },
    IconUser: {
        position: "absolute",
        top: 201,
        left: 45,
        zIndex: 3,
    },
    IconLogo: {
        top: 40,
        marginBottom: 50,
        height:120,
        width:190
    },
    IconPassword: {
        position: "absolute",
        top: 266,
        left: 45,
        zIndex: 4,
    },
});
