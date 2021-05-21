import React, { useState, useEffect } from "react";
import {StyleSheet, Dimensions, TextInput, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView, StatusBar, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Global from "../../Public/Global";
import ToAsseces from '../GasStation/ToAssess'
import Comment from "../GasStation/comment";

export default function ShowGasStation( { route , navigation }) {

    const [ name, setName ] = useState("");
    const [ fullAddress, setFullAddress ] = useState("");






    const { id } = route.params;
    useEffect(() => {
        getGasStation( id )
    }, []);

    //http://servidor.construtiva.com.br/AbasteceMais/api/GasStations/GetGasStationsByID?ID=29

    const getGasStation = ( id ) =>{
        var uri = Global.ServerIP + "api/GasStations/GetGasStationsByID?ID="+  id
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
                    var gas = responseText.data.gasStation;

                    setName(gas.name);
                    setFullAddress(gas.address + ", " + gas.number + " - " + gas.districtID)



                    console.log(gas)
                    
                } else {
                    console.log(responseText.message);                 
                }
            })
            .catch((error) => {
                console.error(error);
            });    
    }
    
    
    return (
        <View >
            <View style={ styles.details }>
                <Text> { name } </Text>
                <Text> { fullAddress } </Text>
                
            </View>

            <ToAsseces 
                id={id}
            />
            
            <SafeAreaView >
                <ScrollView 
                style={styles.scrollView}
                keyboardShouldPersistTaps='always'
                >
                    
                    <Comment
                        comment={"bom posto"}
                    />
                    <Comment
                        comment={"bom legal"}
                    />
                    <Comment
                        comment={"gasolina boa"}
                    />
                    <Comment
                        comment={"show de bola"}
                    />
                    <Comment
                        comment={"ruim"}
                    />

                
                </ScrollView>
            </SafeAreaView >
        </View>
        
        
    );
};

let heightScreen = Dimensions.get('window').height; 
let widthScreen = Dimensions.get('window').width;

const styles = StyleSheet.create({
    details:{
        backgroundColor:'#E5E5E5',
        height: heightScreen * 0.4,
        borderRadius: 10
    },
    lineWhite:{
        height:10,
        backgroundColor:'#000000',
    },
    scrollView: {
        marginHorizontal: 5,
        height:heightScreen* 0.3
    },
});
