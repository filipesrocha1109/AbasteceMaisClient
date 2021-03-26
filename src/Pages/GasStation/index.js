import React, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index({ navigation }) {
    const [registrationId, setRegistrationId] = useState("");

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

    return (
        <View>
            <Text>userID = {registrationId}</Text>
            <Text>Index</Text>
        </View>
    );
}
