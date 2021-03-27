import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Global from "../../Public/Global";

export default function Index({ navigation }) {
    const [registrationId, setRegistrationId] = useState("");
    const [ listState, SetListState ] = useState([]);


    useEffect(() => {
        setRegistrationId(registrationId);
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
    getData();

    const Login = () => {
        fetch(Global.ServerIP + "api/Registrations/GetState", {
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
                    var list = [];
                    responseText.data.listStates.forEach(element => {
                        list.push(element.name)
                    });

                    SetListState(list);

                } else {
                    console.log(responseText.message);
                    
                }
            })
            .catch((error) => {
                console.error(error);
            });
        
    };

    function imprime(value){ console.log(value)}

    return (
        <View>
            <Text>userID = {registrationId}</Text>
            <Text onPress={Login}>Index</Text>
            <Text>states = {listState}</Text>
        </View>
    );
}
