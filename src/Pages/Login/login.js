import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, Text, View, Alert } from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";
import IconIonicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Global from "../../Public/Global";

export default function Login({ navigation }) {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [erros, setErros] = useState("");

    useEffect(() => {
        setUsuario(usuario);
        setSenha(senha);
        setErros(erros);
    }, []);

    // storeData String
    const StoreData = async (value, name) => {
        try {
            await AsyncStorage.setItem("@" + name, value);
        } catch (e) {
            console.log(e);
        }
    };

    const Login = () => {
        if (usuario && senha) {
            fetch(Global.ServerIP + "api/Registrations/LoginRegistrations", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: Global.Authorization,
                },
                body: JSON.stringify({
                    username: usuario,
                    password: senha,
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
                        navigation.navigate("Index");
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
            <IconFontAwesome5
                name="gas-pump"
                size={70}
                color="#ffff"
                style={styles.IconLogo}
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
                onChangeText={(text) => setUsuario(text)}
                value={usuario}
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
                onChangeText={(text) => setSenha(text)}
                value={senha}
                secureTextEntry={true}
            />
            <Text style={styles.Button} onPress={Login}>
                LOGIN
            </Text>
            <Text style={styles.ForgotPasswor}>forgot passwor ?</Text>
            <Text
                style={styles.ForgotPasswor}
                onPress={() => navigation.navigate("CreateRegistration")}
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
        top: 130,
        left: 40,
        zIndex: 3,
    },
    IconLogo: {
        top: 25,
        marginBottom: 25,
    },
    IconPassword: {
        position: "absolute",
        top: 192,
        left: 40,
        zIndex: 4,
    },
});
