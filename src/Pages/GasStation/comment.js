import React, { useState, useEffect } from "react";
import {StyleSheet, Dimensions, TextInput, KeyboardAvoidingView ,Text, TouchableOpacity, Alert, ScrollView, SafeAreaView, StatusBar, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { Header } from "@react-navigation/stack";



import Global from "../../Public/Global";
import ListGasStation from "./listGasStation";
import NotFound from './notFound'

export default function Comment( props ) {
    
    //const { id } = route.params;
    var _comment = "comentario ... " + props.comment

    return (


            <View style={ styles.container }  >

                <EvilIcons
                    name="user"
                    size={40}
                    color={"#0e2d3f"}
                    style={styles.user}
                    //onPress ={Alert.alert("ok","ok")}
                />
                <View style={styles.comment}>
                    <Text>
                        { _comment }

                    </Text>
                </View>   

            </View>

        
    );
};

let heightScreen = Dimensions.get('window').height; 
let widthScreen = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#E5E5E5',
        height: heightScreen * 0.1,
        borderRadius: 10,
        padding: 10,
        marginBottom:5,
        justifyContent: 'center', 
        display:'flex',
        flexDirection: 'row'
    },

    comment:{
       width:'85%',
       marginLeft:15
     },


});
