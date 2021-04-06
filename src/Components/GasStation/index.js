import React, { useState, useEffect } from "react";
import {StyleSheet, Dimensions, TextInput, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView, StatusBar, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Global from "../../Public/Global";
import ListGasStation from "../GasStation/listGasStation";

export default function Index({ navigation }) {
    const [registrationId, setRegistrationId] = useState("");
    const [search, setSearch ] = useState("");
    const [order, setOrder ] = useState("");
    const [ listOrder, SetListOrder ] = useState(['More Relevant','Highest Price','Lower Price']);
    const [typeGas, setTypeGas ] = useState("");
    const [ listTypeGas, SetListTypeGas ] = useState(['Gasolina Comum','Gasolina Aditivada','Disel','Gás']);
    const [district, setDistrict] = useState('');
    const [ listDistrict, SetListDistrict ] = useState([]);
    const [ load, SetLoad ] = useState(0);
    const [ listGasStation, SetListGasStation] = useState([]);

    useEffect(() => {
        setRegistrationId(registrationId);
        SetListGasStation(listGasStation)
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

    const list = () =>{
        if(load == 0){

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

            fetch(Global.ServerIP + "api/GasStations/GetGasStations", {
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
                        var list = responseText.data.gasStations;

                        SetListGasStation(list)                      
    
                    } else {
                        console.log(responseText.message);                 
                    }
                    //console.log('list Districty')
                })
                .catch((error) => {
                    console.error(error);
                });

            
            SetLoad(1)
        }
        
    }

    list();



    return (
        <View style={styles.Container}>
            <View  style={styles.ContainerTop}>
                <View  style={styles.ContainerSearch}>
                    <TextInput
                        style={styles.Search}
                        placeholder={"Search..."}
                        placeholderTextColor="#B2B0B0"
                        onChangeText={(text) => setSearch(text)}
                        value={search}
                    />
                    
                </View>
                <View  style={styles.ContainerFilter}>
                    <TouchableOpacity style={order ? [styles.select,styles.firstSelect] : [styles.selectPlaceholder,styles.firstSelect]}>
                        <Picker
                            style={order ? styles.select : styles.selectPlaceholder}
                            onValueChange={(itemValue) => 
                            setOrder(itemValue)}                      
                        >
                        <Picker.Item label={" Select Order"} value={0} key={0}/>
                        {
                            listOrder.map(value =>{
                                return <Picker.Item label={value} value={value} key={value}/>
                            })
                        }
                        </Picker>
                    </TouchableOpacity>
                    <TouchableOpacity style={district ? styles.select : styles.selectPlaceholder}>
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
                </View>
                <View  style={styles.ContainerFilter}>
                    <TouchableOpacity style={typeGas ? [styles.select,styles.firstSelect] : [styles.selectPlaceholder,styles.firstSelect]}>
                        <Picker
                            style={typeGas ? styles.select : styles.selectPlaceholder}
                            onValueChange={(itemValue) => 
                            setTypeGas(itemValue)}                      
                        >
                        <Picker.Item label={"Select Type Gas"} value={0} key={0}/>
                        {
                            listTypeGas.map(value =>{
                                return <Picker.Item label={value} value={value} key={value}/>
                            })
                        }
                        </Picker>
                    </TouchableOpacity>
                    <Text
                    style={styles.buttonSearch}
                    onPress={() => alert("pesquisar")}
                    >
                    Search
                    </Text>                         
                </View>
            </View>
            <SafeAreaView >
                <ScrollView 
                style={styles.scrollView}
                keyboardShouldPersistTaps='always'
                >
                {
                    listGasStation.map(({
                        id,
                        status,
                        name,
                        phone,
                        gasolinaComum,
                        gasolinaAditivada,
                        disel,
                        gas,
                        priceGasolinaComum,
                        priceGasolinaAditivada,
                        priceDisel,
                        priceGas,
                        latitude,
                        longitude,
                        cep,
                        address,
                        number,
                        districtID,
                        cityID,
                        stateID,
                        createdOn,
                        updatedOn
                        })=>{
                            return(
                                <ListGasStation
                                    id = {id}
                                    key = {id}
                                    status = {status}
                                    name = {name}
                                    phone = {phone}
                                    gasolinaComum = {gasolinaComum}
                                    gasolinaAditivada = {gasolinaAditivada}
                                    disel = {disel}
                                    gas = {gas}
                                    priceGasolinaComum = {priceGasolinaComum}
                                    priceGasolinaAditivada = {priceGasolinaAditivada}
                                    priceDisel = {priceDisel}
                                    priceGas = {priceGas}
                                    latitude = {latitude}
                                    longitude = {longitude}
                                    cep  = {cep}
                                    address = {address}
                                    number = {number}
                                    districtID = {listDistrict[districtID]}
                                    cityID = {cityID}
                                    stateID = {stateID}
                                    createdOn = {createdOn}
                                    updatedOn = {updatedOn}
                                />
                            )                    
                        })
                }


                
                </ScrollView>
            </SafeAreaView >

        </View>
        
        
    );
};

let heightScreen = Dimensions.get('window').height; 
let widthScreen = Dimensions.get('window').width;

const styles = StyleSheet.create({
    Container:{
        flex:1,
    },
    ContainerSearch:{
        height: 50,
        padding:0,
        paddingLeft:5,
        marginBottom:0,
        flexDirection:'row'
    },
    Search:{
        width: widthScreen * 0.97,
        backgroundColor: "#0e2d3f",
        height: '90%',
        borderRadius: 5,
        paddingLeft:20,
        marginTop:2,
        color:'#ffff',
        fontSize:16,
        fontWeight:'bold'

    },
    buttonSearch:{
        width: widthScreen * 0.48,
        marginLeft: 5,
        backgroundColor:"#1F9BE2",
        height: '90%',
        borderRadius: 5,
        fontSize:16,
        fontWeight:'bold',
        color:'#ffff',
        padding:5,
        paddingHorizontal:widthScreen * 0.17
    },
    ContainerFilter:{
        height: 40,
        padding:0,
        paddingLeft:5,
        flexDirection:'row'
    },
    scrollView: {
        marginHorizontal: 5,
        height:heightScreen* 0.64
    },
    ContainerTop:{
        height:heightScreen* 0.21
    },
    
    select: {
        width: widthScreen * 0.48,
        marginLeft:5,
        backgroundColor: "#0e2d3f",
        borderRadius: 5,
        height: '90%',
        color: "#ffff",
        padding: 0
        
    },
    selectPlaceholder:{
        width: widthScreen * 0.48,
        marginLeft:5,
        backgroundColor: "#0e2d3f",
        borderRadius: 5,
        height: '90%',
        color: "#B2B0B0",
        padding: 0
    },
    firstSelect:{
        marginLeft:0,
        width: widthScreen * 0.48,
    }

});
