import React, { useState, useEffect } from "react";
import {StyleSheet, Dimensions, TextInput, KeyboardAvoidingView ,Text, TouchableOpacity, Alert, ScrollView, SafeAreaView, StatusBar, View } from "react-native";
import * as Animatable from 'react-native-animatable';
//const handleViewRef2 = useRef(null);
//ref={handleViewRef2}
export default function Loading( props ) {
    


    return (
        <View style={styles.loading}>
        <Animatable.View style={styles.rotateRight}
            easing="ease-in-out"
            iterationCount="infinite"
            animation='rotate'>
            <Animatable.View style={styles.rotateLeft}
                direction='normal'
                easing="ease-in-out"
                iterationCount="infinite"
                animation='rotate'
                
            >
            </Animatable.View>
        </Animatable.View>
        </View>
   
    );
};


const styles = StyleSheet.create({
    loading:{
        width: '30%',
        height: '30%',
        position: 'absolute',
        top: '65%',
        left: '35%',
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: '35%'
    },
    rotateRight:{
        width: 140,
        height: 140,
        borderRightColor: "#1F9BE2",
        borderLeftColor: "#1F9BE2",
        zIndex: 9,
        alignItems: "center",
        justifyContent: 'center',
        borderWidth: 8,
        borderRadius: 100,
        borderTopColor: "transparent",
        borderBottomColor: "transparent",
    },
    rotateLeft:{
        width: 100,
        height: 100,
        zIndex: 8,
        borderTopColor: "#0e2d3f",
        borderBottomColor: "#0e2d3f",
        borderWidth: 8,
        borderRadius: 100,
        borderRightColor: "transparent",
        borderLeftColor: "transparent",
    },
});

//#1F9BE2
//#0e2d3f