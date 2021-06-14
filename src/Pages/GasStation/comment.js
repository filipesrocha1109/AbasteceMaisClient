import React, { useState, useEffect } from "react";
import {StyleSheet, Dimensions, TextInput, KeyboardAvoidingView ,Text, TouchableOpacity, Alert, ScrollView, SafeAreaView, StatusBar, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import EvilIcons from "react-native-vector-icons/EvilIcons";


export default function Comment( props ) {
    
    const _comment = props.comment;
    const name = props.name;

    return (

            <View style={ styles.container }  >
                <View style={[{ width:'20%', alignItems:'center'}] }>
                    <EvilIcons
                        name="user"
                        size={40}
                        color={"#0e2d3f"}
                        
                    />
                    <Text    
                        style={styles.user}
                        >{name}
                    </Text>
                </View>
               
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
        //height: heightScreen * 0.1,
        borderRadius: 10,
        padding: 10,
        marginBottom:5,
        justifyContent: 'center', 
        display:'flex',
        flexDirection: 'row'
    },

    comment:{
       width:'85%',
 
     },
     user:{
         textAlign:'center'
     }


});
