import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from '@react-native-picker/picker';



export default function Test () {

    const [ listState, SetListState ] = useState(['portugues', 'ingles', 'espanhol']);
    const [ state, setState] = useState([])

    const Save = () =>{
        console.log(state)
    }
  
    return (
        <View style={styles.container}>
           <Picker
            style={{height: 50, width: 200}}
            onValueChange={(itemValue) => 
            setState(itemValue)
            }
            >
                <Picker.Item label={"Select State"} value = {0} key={0}/>
                {
                    listState.map(value =>{
                        return <Picker.Item label={value} value = {value} key={value}/>
                    })
                }
            </Picker>
            <Text onPress={Save}>
                    Create
            </Text>
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
