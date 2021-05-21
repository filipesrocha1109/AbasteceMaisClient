import React, { useState, useEffect } from "react";
import {StyleSheet, Dimensions, TextInput, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView, StatusBar, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Global from "../../Public/Global";
import ToAsseces from '../GasStation/ToAssess'
import Comment from "../GasStation/comment";

export default function ShowGasStation( { route , navigation }) {
    
    const { id } = route.params;
    return (
        <View >
            <View style={ styles.details }>
                <Text> pagina posto { id } </Text>
            </View>
            <View style={ styles.lineWhite } />
            <ToAsseces />
            <View style={ styles.lineWhite } />
            <Comment/>


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
        height:10
    }
});
