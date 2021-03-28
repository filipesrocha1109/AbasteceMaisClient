import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Picker } from '@react-native-picker/picker';



export default function DeleteRegistration ({ navigation }) {
  
    return (
        <View style={styles.container}>
           <Text>
               show registration
           </Text>
           <Button
           title='Delete Registration'
           onPress={()=> alert('Delete')}
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
