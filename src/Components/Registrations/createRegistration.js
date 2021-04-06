import React, { useState, useEffect } from "react";
import {StyleSheet, TextInput, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView,  View } from "react-native";
import { Picker } from '@react-native-picker/picker';

import Global from "../../Public/Global";


export default function CreateRegistration({ navigation }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [CPFCNPJ, setCPFCNPJ] = useState("");
    const [phone, setPhone] = useState("");
    const [CEP, setCEP] = useState("");
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [password, setPassword] = useState("");
    const [replayPassword, setReplayPassword] = useState("");

    const [ listState, SetListState ] = useState([]);
    const [ listCity, SetListCity ] = useState([]);
    const [ listDistrict, SetListDistrict ] = useState([]);

    const [ load, SetLoad ] = useState(false);
    const [ errors , setErrors ] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [CPFCNPJError, setCPFCNPJError] = useState("");
    const [phoneError, setPhoneError] = useState("");
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
        setPhone(phone);
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
        setPhoneError(phoneError),
        setCEPError(CEPError),
        setAddressError(addressError),
        setNumberError(numberError),
        setDistrictError(districtError),
        setCityError(cityError),
        setStateError(stateError),
        setPasswordError(passwordError),
        setReplayPasswordError(replayPasswordError);
        SetLoad(load);
    }, []);


    const listSelct = () =>{

        if(!load){    
            fetch(Global.ServerIP + "api/Registrations/GetStates", {
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
                        var listState = responseText.data.listStates;

                        for (var i = 0; i < listState.length; ++i){
                            list[listState[i].id] = listState[i].name;
                        }       

                        SetListState(list);

                    } else {
                        console.log(responseText.message);                 
                    }
                    //console.log('list State')
                })
                .catch((error) => {
                    console.error(error);
                });

            fetch(Global.ServerIP + "api/Registrations/GetCitys", {
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
                        var listCitys = responseText.data.listCitys;
    
                        for (var i = 0; i < listCitys.length; ++i){
                            list[listCitys[i].id] = listCitys[i].name;
                        }       
    
                        SetListCity(list);                      
    
                    } else {
                        console.log(responseText.message);                 
                    }
                    //console.log('list city')
                })
                .catch((error) => {
                    console.error(error);
                });
            
            fetch(Global.ServerIP + "api/Registrations/GetDistricts", {
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
                    //console.log('list Districty')
                })
                .catch((error) => {
                    console.error(error);
                });

            SetLoad(true)
        }
    }
    listSelct();



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
        if (!CPFCNPJ) {
            setCPFCNPJError("CPF / CNPJ is empity");
            errorCreate = true;
        } else {
            setCPFCNPJError("");
        }
        if (!phone) {
            setPhoneError("Phone is empity");
            errorCreate = true;
        } else {
            setPhoneError("");
        }
        if (!CEP) {
            setCEPError("CEP is empity");
            errorCreate = true;
        } else {
            setCEPError("");
        }
        if (!address) {
            setAddressError("Address is empity");
            errorCreate = true;
        } else {
            setAddressError("");
        }
        if (!number) {
            setNumberError("Number is empity");
            errorCreate = true;
        } else {
            setNumberError("");
        }
        if (!district) {
            setDistrictError("District is empity");
            errorCreate = true;
        } else {
            setDistrictError("");
        }
        if (!city) {
            setCityError("City is empity");
            errorCreate = true;
        } else {
            setCityError("");
        }
        if (!state) {
            setStateError("State is empity");
            errorCreate = true;
        } else {
            //alert(state)
            setStateError("");
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

        if (replayPassword != password) {
            setReplayPasswordError("Different passwords");
            setPasswordError("Different passwords");
            errorCreate = true;
        } else {
            setReplayPasswordError("");
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
                    CPFCNPJ : CPFCNPJ,
                    phone : phone,
                    password : password,
                    CEP : CEP,
                    address : address,
                    number : number,
                    districtID : district,
                    cityID : city,
                    stateID : state
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
                    placeholder={"Phone"}
                    placeholderTextColor="#B2B0B0"
                    onChangeText={(text) => setPhone(text)}
                    value={phone}
                />
                <Text style={phoneError ? styles.error : ""}>
                    {phoneError}
                </Text>
                <TextInput
                    style={styles.Input}
                    placeholder={"CEP"}
                    placeholderTextColor="#B2B0B0"
                    onChangeText={(text) => setCEP(text)}
                    value={CEP}
                />
                <Text style={CEPError ? styles.error : ""}>{CEPError}</Text>
                <View style={styles.ContainerAdress}>
                    <TextInput
                        style={[styles.Input, styles.Address]}
                        placeholder={"Address"}
                        placeholderTextColor="#B2B0B0"
                        onChangeText={(text) => setAddress(text)}
                        value={address}
                    />               
                    <TextInput
                        style={[styles.Input, styles.Number]}
                        placeholder={"Number"}
                        placeholderTextColor="#B2B0B0"
                        onChangeText={(text) => setNumber(text)}
                        value={number}
                    />
                </View>
                <View style={styles.ContainerAdress}>
                    <Text style={addressError ? styles.error : ""}>
                        {addressError}
                    </Text>
                    <Text style={numberError ? [styles.error, styles.ErrorNumber] : ""}>
                        {numberError}
                    </Text>
                </View>

                <TouchableOpacity style={  state ? styles.select : styles.selectPlaceholder}>
                    <Picker
                        style={ state ? styles.select : styles.selectPlaceholder}
                        onc
                        onValueChange={(itemValue) => { setState(itemValue); }
                    }
                    >
                        <Picker.Item label={"Select State"} value={0} key={0}/>
                        {
                            Object.keys(listState).map(key => {
                                return <Picker.Item label={listState[key]} value={key} key={key}/>
                            })
                        }  
                        <Picker.Item label={"Outher State"} value={"NF"} key={"NF"}/> 
                    </Picker>
                </TouchableOpacity>
                <Text style={stateError ? styles.error : ""}>{stateError}</Text>

                <TouchableOpacity style={  city ? styles.select : styles.selectPlaceholder}>
                    <Picker
                        style={ city ? styles.select : styles.selectPlaceholder}
                        onValueChange={(itemValue) => {
                            setCity(itemValue);
                            
                        }
                        
                    }                      
                    >
                        <Picker.Item label={"Select City"} value={0} key={0}/>
                        {
                            Object.keys(listCity).map(key => {
                                return <Picker.Item label={listCity[key]} value={key} key={key}/>
                            })
                        } 
                        <Picker.Item label={"Outher City"} value={"NF"} key={"NF"}/> 

                    </Picker>
                </TouchableOpacity>
                <Text style={cityError ? styles.error : ""}>{cityError}</Text>

                <TouchableOpacity style={ district ? styles.select : styles.selectPlaceholder}>
                    <Picker
                        style={ district ? styles.select : styles.selectPlaceholder}
                        onValueChange={(itemValue) => 
                        setDistrict(itemValue)}                      
                    >
                        <Picker.Item label={"Select District"} value={0} key={0}/>
                        {
                            Object.keys(listDistrict).map(key => {
                                return <Picker.Item label={listDistrict[key]} value={key} key={key}/>
                            })
                        } 
                        <Picker.Item label={"Outher District"} value={"NF"} key={"NF"}/> 
                    </Picker>
                </TouchableOpacity>
                <Text style={districtError ? styles.error : ""}>{districtError}</Text>

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
