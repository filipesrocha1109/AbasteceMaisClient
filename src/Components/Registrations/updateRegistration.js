import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Picker } from '@react-native-picker/picker';



export default function UpdateRegistration ({ navigation }) {
  
    return (
        <View style={styles.container}>
           <Text>
               Update registration
           </Text>
           <Button
           title='Update Registration'
           onPress={()=> navigation.navigate("Update")}
           />
           <Button
           title='Delete Registration'
           onPress={()=> navigation.navigate("Delete")}
           />
        </View>
    );
}

const styles = StyleSheet.create({
    container : {
        flex            : 1,
        backgroundColor : "#fff",
        alignItems      : "center",
        justifyContent  : "center",
    },
});
