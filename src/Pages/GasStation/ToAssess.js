import React, { useState, useEffect } from "react";
import {StyleSheet, Dimensions, TextInput, KeyboardAvoidingView ,Text, TouchableOpacity, Alert, ScrollView, SafeAreaView, StatusBar, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from "react-native-vector-icons/Feather";
import { Header } from "@react-navigation/stack";



import Global from "../../Public/Global";
import ListGasStation from "./listGasStation";
import NotFound from './notFound'

export default function ToAsseces( { route , navigation }) {
    
    //const { id } = route.params;

    return (
        <View style={ styles.container } >

            <View style={ styles.containerInput }  >
                <TextInput style={styles.input}
                    placeholder={"Add a comment..."}
                    numberOfLines={10}
                    multiline={true}
                />  
            </View>
       
            <Feather
                name="send"
                size={30}
                color={"#0e2d3f"}
                style={styles.send}
                //onPress ={Alert.alert("ok","ok")}
            />
        </View>
        
        
    );
};

let heightScreen = Dimensions.get('window').height; 
let widthScreen = Dimensions.get('window').width;

const styles = StyleSheet.create({
    containerInput:{
        backgroundColor:'#E5E5E5',
        height: heightScreen * 0.15,
        borderRadius: 10,
        padding: 10
    },
    lineWhite:{
        height:10
    },
    input:{
        //backgroundColor: '#FFFFFF',
        height: '100%',
        borderColor: '#B2B1B1',
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        paddingRight:50,
        width: widthScreen * 0.82,

    },
    send:{
        transform: [{ rotate: '42deg'}],
        alignSelf:'flex-end',
        marginRight: 20,
        marginTop: -60
     },

     commnet:{
        backgroundColor:'#E5E5E5',
        height: heightScreen * 0.15,
        borderRadius: 10,
        padding: 10
     },
     container:{
        marginTop: 5,
        marginBottom: 5
     }
});
