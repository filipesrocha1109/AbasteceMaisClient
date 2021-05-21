import React, { useState, useEffect } from "react";
import {StyleSheet, Dimensions, Image, TextInput, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView, StatusBar, View, BackHandler } from "react-native";


export default function NotFound() {
    return (
        <View style={styles.Container}>
            <Text style={styles.Text}>Not Found</Text>
            <Text style={styles.Text}>Gas Stations</Text>
        </View>
    )
};

let heightScreen = Dimensions.get('window').height; 
let widthScreen = Dimensions.get('window').width;

const styles = StyleSheet.create({
    Container:{
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', // Centered horizontally
        flex:1,
        textAlignVertical:'center',
        //backgroundColor:'red',
        height: heightScreen * 0.5,
        
    },
    Text:{
        fontSize:35,
        color:'#930F0F'
    }
    
});