import React, { useState, useEffect } from "react";
import {StyleSheet, TextInput, Text, View, Button, Alert, ScrollView, SafeAreaView, StatusBar } from "react-native";

export default function CreateRegistration({ navigation }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [CPFCNPJ, setCPFCNPJ] = useState("");
    const [CEP, setCEP] = useState("");
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [password, setPassword] = useState("");
    const [replayPassword, setReplayPassword] = useState("");
    const [errors, setEerrors] = useState(false);

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [CPFCNPJError, setCPFCNPJError] = useState("");
    const [CEPError, setCEPError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [numberError, setNumberError] = useState("");
    const [districtError, setDistrictError] = useState("");
    const [cityError, setCityError] = useState("");
    const [stateError, setStateError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [replayPasswordError, setReplayPasswordError] = useState("");

    useEffect(() => {
        setName(name);
        setEmail(email);
        setCPFCNPJ(CPFCNPJ);
        setCEP(CEP);
        setAddress(address);
        setNumber(number);
        setDistrict(district);
        setCity(city);
        setState(state);
        setPassword(password);
        setReplayPassword(replayPassword);
        setNameError(nameError);
        setEmailError(emailError);
        setCPFCNPJError(CPFCNPJError),
            setCEPError(CEPError),
            setAddressError(addressError),
            setNumberError(numberError),
            setDistrictError(districtError),
            setCityError(cityError),
            setStateError(stateError),
            setPasswordError(passwordError),
            setReplayPasswordError(replayPasswordError);
    }, []);

    function Validate() {
        setEerrors(false);

        if (!name) {
            setNameError("Name is empity");
            setEerrors(true);
        } else {
            setNameError("");
        }
        if (!email) {
            setEmailError("Email is empity");
            setEerrors(true);
        } else {
            setEmailError("");
        }
        if (!CPFCNPJ) {
            setCPFCNPJError("CPF / CNPJ is empity");
            setEerrors(true);
        } else {
            setCPFCNPJError("");
        }
        if (!CEP) {
            setCEPError("CEP is empity");
            setEerrors(true);
        } else {
            setCEPError("");
        }
        if (!address) {
            setAddressError("Address is empity");
            setEerrors(true);
        } else {
            setAddressError("");
        }
        if (!number) {
            setNumberError("Number is empity");
            setEerrors(true);
        } else {
            setNumberError("");
        }
        if (!district) {
            setDistrictError("District is empity");
            setEerrors(true);
        } else {
            setDistrictError("");
        }
        if (!city) {
            setCityError("City is empity");
            setEerrors(true);
        } else {
            setCityError("");
        }
        if (!state) {
            setStateError("State is empity");
            setEerrors(true);
        } else {
            setStateError("");
        }
        if (!password) {
            setPasswordError("Password is empity");
            setEerrors(true);
        } else {
            setPasswordError("");
        }
        if (!replayPassword) {
            setReplayPasswordError("Replay Password is empity");
            setEerrors(true);
        } else {
            setReplayPasswordError("");
        }

        if (!errors) {
            Create();
        }
    }

    function Create() {
        Alert.alert("Salvar");
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
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
                    placeholder={"CPF / CNPJ"}
                    placeholderTextColor="#B2B0B0"
                    onChangeText={(text) => setCPFCNPJ(text)}
                    value={CPFCNPJ}
                />
                <Text style={CPFCNPJError ? styles.error : ""}>
                    {CPFCNPJError}
                </Text>
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
                    placeholder={"Address"}
                    placeholderTextColor="#B2B0B0"
                    onChangeText={(text) => setAddress(text)}
                    value={address}
                />
                <Text style={addressError ? styles.error : ""}>
                    {addressError}
                </Text>
                <TextInput
                    style={styles.Input}
                    placeholder={"Number"}
                    placeholderTextColor="#B2B0B0"
                    onChangeText={(text) => setNumber(text)}
                    value={number}
                />
                <Text style={numberError ? styles.error : ""}>
                    {numberError}
                </Text>
                <TextInput
                    style={styles.Input}
                    placeholder={"Distric"}
                    placeholderTextColor="#B2B0B0"
                    onChangeText={(text) => setDistrict(text)}
                    value={district}
                />
                <Text style={districtError ? styles.error : ""}>
                    {districtError}
                </Text>
                <TextInput
                    style={styles.Input}
                    placeholder={"City"}
                    placeholderTextColor="#B2B0B0"
                    onChangeText={(text) => setCity(text)}
                    value={city}
                />
                <Text style={cityError ? styles.error : ""}>{cityError}</Text>
                <TextInput
                    style={styles.Input}
                    placeholder={"State"}
                    placeholderTextColor="#B2B0B0"
                    onChangeText={(text) => setState(text)}
                    value={state}
                />
                <Text style={stateError ? styles.error : ""}>{stateError}</Text>
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

                <Text style={styles.Button} onPress={Validate}>
                    Create
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
});
