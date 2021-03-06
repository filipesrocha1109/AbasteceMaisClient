import React, { useState, useEffect } from "react";
import {StyleSheet, Dimensions, TextInput, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView, StatusBar, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Global from "../../Public/Global";
import ListGasStation from "./listGasStation";
import NotFound from './notFound';
import Header from '../../Components/Header/header';
import Loading from '../GasStation/loading';

export default function Index({ navigation }) {
    const [ registrationId, setRegistrationId] = useState("");
    const [ name, setName ] = useState("");
    const [ order, setOrder ] = useState("");
    const [ listOrder, SetListOrder ] = useState(['More Relevant','Highest Price','Lower Price']);
    const [ typeGas, setTypeGas ] = useState("");
    const [ listTypeGas, SetListTypeGas ] = useState(['Gasolina Comum','Gasolina Aditivada','Disel','Gás']);
    const [ district, setDistrict] = useState('');
    const [ listDistrict, SetListDistrict ] = useState([]);
    const [ load, SetLoad ] = useState(0);
    const [ listGasStation, SetListGasStation] = useState([]);
    const [ latitudeUser, setLatitudeUser] = useState("");
    const [ longitudeUser, setLongitudeUser] = useState("");
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        getData();
        listSelectGasStation(name, typeGas, district, order);
        listSelectDistrict("4314902");
    }, []);


    const getData = async () => {
        try {
            const registration_id = await AsyncStorage.getItem(
                "@registration_id"
            );
            const latitude_user = await AsyncStorage.getItem(
                "@latitude_user"
            );
            const longitude_user = await AsyncStorage.getItem(
                "@longitude_user"
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


    const listSelectGasStation = ( name, typegas, districtid, order) =>{
        setLoading(true);

        (async function(){
            const {status, permissions} = await Permissions.askAsync(Permissions.LOCATION);
            if(status === 'granted'){
                let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
                //console.log(location.coords.latitude);
                //console.log(location.coords.longitude);

                var latitude = location.coords.latitude.toString();
                var longitude = location.coords.longitude.toString();

                var uri = Global.ServerIP + "api/GasStations/GetGasStations?Name="+ name +"&TypeGas="+ typegas +"&DistrictID="+ districtid +"&Order="+ order +"&latitude="+ latitude +"&longitude="+ longitude
                //console.log(uri)
                fetch(uri , {
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

                            SetListGasStation(list);

                            setLoading(false)
                            
                            
                        } else {
                            console.log(responseText.message);                 
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    }); 

                
            }else{
                throw new Error('Location permission not granted');
            }
        })();      
    }



    return (

        <View style={styles.Container}>
            <Header
                navigation = { navigation }
                menu = {true}
                title = {'Home'}
            />
                <View  style={styles.ContainerTop}>
                    <View  style={styles.ContainerSearch}>
                        <TextInput
                            style={styles.Search}
                            placeholder={"Search..."}
                            placeholderTextColor="#B2B0B0"
                            onChangeText={(text) => setName(text)}
                            value={name}
                        />
                        
                    </View>
                    <View  style={styles.ContainerFilter}>
                        <TouchableOpacity style={order ? [styles.select,styles.firstSelect] : [styles.selectPlaceholder,styles.firstSelect]}>
                            <Picker
                                selectedValue={order}
                                style={order ? styles.select : styles.selectPlaceholder}
                                onValueChange={(itemValue) => 
                                setOrder(itemValue)}                      
                            >
                            <Picker.Item label={" Select Order"} value={""} key={""}/>
                            {
                                listOrder.map(value =>{
                                    return <Picker.Item label={value} value={value} key={value}/>
                                })
                            }
                            </Picker>
                        </TouchableOpacity>
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
                    </View>
                    <View  style={styles.ContainerFilter}>
                        <TouchableOpacity style={typeGas ? [styles.select,styles.firstSelect] : [styles.selectPlaceholder,styles.firstSelect]}>
                            <Picker                            
                                style={typeGas ? styles.select : styles.selectPlaceholder}
                                selectedValue={typeGas}
                                onValueChange={(itemValue) => 
                                setTypeGas(itemValue)}                      
                            >
                            <Picker.Item label={"Select Type Gas"} value={""} key={""}/>
                            {
                                listTypeGas.map(value =>{
                                    return <Picker.Item label={value} value={value} key={value}/>
                                })
                            }
                            </Picker>
                        </TouchableOpacity>
                        <Text
                        style={styles.buttonSearch}
                        onPress={() => listSelectGasStation(name, typeGas, district, order)}
                        >
                        Search
                        </Text>                         
                    </View>
                </View>
                <SafeAreaView >
                    {isLoading ?
                        <Loading/>
                        :

                        <ScrollView 
                        style={styles.scrollView}
                        keyboardShouldPersistTaps='always'
                        >
                        {                  
                            listGasStation.length>0 ?
                            
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
                                    updatedOn,
                                    distance,
                                    lastUpdatePrice
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
                                            distance = {distance} 
                                            lastUpdatePrice = {lastUpdatePrice}     
                                            route ={() => navigation.navigate("Show", { id: id } )}        
                                                
                                                
                                            />
                                            )   
                                        })
                                        :                     
                                <NotFound/>                    
                        }              
                
                        </ScrollView>
                    }
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
        height:heightScreen* 0.66
    },
    ContainerTop:{
        height:heightScreen* 0.21
    },
    
    select: {
        width: widthScreen * 0.45,
        marginLeft:5,
        backgroundColor: "#0e2d3f",
        borderRadius: 5,
        height: '90%',
        color: "#ffff",
        padding: 0
        
    },
    selectPlaceholder:{
        width: widthScreen * 0.45,
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
    },
    selectPlaceholderDistrict:{
        width: widthScreen * 0.48,
        marginLeft:5,
        backgroundColor: "#0e2d3f",
        borderRadius: 5,
        height: '90%',
        color: "#B2B0B0",
        padding: 0
        
    },
    selectDistrict: {
        width: widthScreen * 0.48,
        marginLeft:5,
        backgroundColor: "#0e2d3f",
        borderRadius: 5,
        height: '90%',
        color: "#ffff",
        padding: 0
        
    },

});
