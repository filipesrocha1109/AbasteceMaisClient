import React, { useState, useEffect } from "react";
import {StyleSheet, TextInput, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView, StatusBar, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Global from "../../Public/Global";

export default function Index({ navigation }) {
    const [registrationId, setRegistrationId] = useState("");
    const [search, setSearch ] = useState("");
    const [order, setOrder ] = useState("");
    const [ listOrder, SetListOrder ] = useState(['Price ^ ','Price v']);
    const [district, setDistrict] = useState('');
    const [ listDistrict, SetListDistrict ] = useState([]);
    const [ load, SetLoad ] = useState(0);


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
                        var list = [];
                        responseText.data.listDistricts.forEach(element => {
                            list.push(element.name)
                        });

                        SetListDistrict(list);

                    } else {
                        console.log(responseText.message);                 
                    }
                    console.log('list Districty')
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
                    <Picker.Item label={"Order"} value={0} key={0}/>
                    {
                        listOrder.map(value =>{
                            return <Picker.Item label={value} value={value} key={value}/>
                        })
                    }
                    </Picker>
                </TouchableOpacity>
                <TouchableOpacity style={district ? styles.select : styles.selectPlaceholder}>
                    <Picker
                        style={district ? styles.select : styles.selectPlaceholder}
                        onValueChange={(itemValue) => 
                        setDistrict(itemValue)}                      
                    >
                    <Picker.Item label={"Filter District"} value={0} key={0}/>
                    {
                        listDistrict.map(value =>{
                            return <Picker.Item label={value} value={value} key={value}/>
                        })
                    }
                    </Picker>
                </TouchableOpacity>
            </View>
            <SafeAreaView >
                <ScrollView 
                style={styles.scrollView}
                keyboardShouldPersistTaps='always'
                >
                <Text style={styles.ContainerGasStation}>Exemple</Text>
                <Text style={styles.ContainerGasStation}>Exemple</Text>

                <Text style={styles.ContainerGasStation}>Exemple</Text>

                <Text style={styles.ContainerGasStation}>Exemple</Text>

                <Text style={styles.ContainerGasStation}>Exemple</Text>

                <Text style={styles.ContainerGasStation}>Exemple</Text>

                <Text style={styles.ContainerGasStation}>Exemple</Text>

                <Text style={styles.ContainerGasStation}>Exemple</Text>

                <Text style={styles.ContainerGasStation}>Exemple</Text>

                </ScrollView>
            </SafeAreaView >

        </View>
        
        
    );
}

const styles = StyleSheet.create({
    Container:{
        flex:1,
    },
    ContainerSearch:{
        height: 50,
        padding:5,
        marginBottom:0
    },
    Search:{
        width: "100%",
        backgroundColor: "#0e2d3f",
        height: '90%',
        borderRadius: 5,
        paddingLeft:20,
        marginTop:2,
        color:'#ffff',
        fontSize:16,
        fontWeight:'bold'

    },
    ContainerFilter:{
        height: 50,
        padding:5,
        flexDirection:'row'
    },
    scrollView: {
        marginHorizontal: 5,
        height:'80%'
    },
    ContainerGasStation:{
        backgroundColor:"#E5E5E5",
        height:70,
        borderRadius:5,
        marginBottom: 7

    },
    select: {
        width: 180,
        marginLeft:5,
        backgroundColor: "#0e2d3f",
        borderRadius: 5,
        height: '90%',
        color: "#ffff",
        padding: 0
        
    },
    selectPlaceholder:{
        width: 180,
        marginLeft:5,
        backgroundColor: "#0e2d3f",
        borderRadius: 5,
        height: '90%',
        color: "#B2B0B0",
        padding: 0
    },
    firstSelect:{
        marginLeft:0,
        width:165,
    }

});
