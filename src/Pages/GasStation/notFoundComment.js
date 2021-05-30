import React, { useState, useEffect } from "react";
import {StyleSheet, Dimensions, Image, TextInput, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView, StatusBar, View, BackHandler } from "react-native";


export default function NotFoundComment() {
    return (
        <View style={styles.Container}>
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
        height: heightScreen * 0.1,
        
    },
    Text:{
        fontSize:35,
        color:'#930F0F'
    }
    
});