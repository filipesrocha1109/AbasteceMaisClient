import React, { useState, useEffect } from "react";
import {StyleSheet, Dimensions, TextInput, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView, StatusBar, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Global from "../../Public/Global";
import Comment from "../GasStation/comment";
import NotFound from './notFoundComment';
import Feather from "react-native-vector-icons/Feather";
import { Rating, AirbnbRating } from 'react-native-elements';


export default function Star( props ) {

    const id = props.id;

    const [value, setValue] = useState(-1)

    const stars = (gasstation) =>{

        fetch(Global.ServerIP + "api/GasStations/GetStars?ID=" + gasstation , {
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

                    if(responseText.data.stars.total != 0){

                        var total = responseText.data.stars.total
                        var positive = responseText.data.stars.positive
                        var negative = responseText.data.stars.negative

                        var x = (positive * 100) / total

                        var y = (5 * x) / 100

                        setValue(parseFloat(y)); 
                    }else{
                        setValue(0)
                    }

                    
                   
                } else {
                    console.log(responseText.message);                 
                }
            })
            .catch((error) => {
                console.error(error);
            });  


    }

    
    return (
        <View>

        { 
        value != -1 ?  
            <View 
                style={{marginTop:-25}}
            >
                
                <Text
                    style={{textAlign:'center', marginBottom:2}}
                >{value + " / 5" }</Text>
                <Rating 
                    imageSize={35} 
                    startingValue={value}  
                    readonly
                    style={ styles.star }
                    type='custom'
                    tintColor = {"#E5E5E5"}
                    
                />
                
            </View>
        :
            stars(id)
        }

        </View>
        
    );
};

let heightScreen = Dimensions.get('window').height; 
let widthScreen = Dimensions.get('window').width;

const styles = StyleSheet.create({
     star:{
        backgroundColor:'#E5E5E5',
     }
});
