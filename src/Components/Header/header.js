import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, Text, View, Image } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { DrawerActions   } from '@react-navigation/native';

 
export default function Header( props ) {

    const isDrawerOpen = useIsDrawerOpen();

    var navigation = props.navigation;   
    var menu = props.menu;
    var title = props.title;

    return (
        <View style={styles.Container}>
            <Text
                style={styles.Title}
            >{title ? title : 'Home'}</Text>
            { menu ?
                <Feather
                    name="menu"
                    size={30}
                    color={'black'}
                    style={styles.menu}
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    
                />
            :
            <Text style={[{position: 'absolute'}]}></Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({

    Container: {
        backgroundColor: '#ffff',
        alignItems: "center",
        justifyContent: "center",
        height : 50,
        marginTop: 25
        
    },
    menu:{
        position: 'absolute',
        left: 20,

    },
    Title:{
        fontSize:20,
        fontWeight:'bold'
    }
});
