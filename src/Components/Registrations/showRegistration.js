import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Picker } from '@react-native-picker/picker';



export default function ShowRegistration ({ navigation }) {
  
    return (
        <View style={styles.container}>
           <Text>
               show registration
           </Text>
           <Button
           title='Update Registration'
           onPress={()=> navigation.navigate("Update")}
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
