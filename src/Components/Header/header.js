import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, Text, View, Image } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import IconAntDesign from "react-native-vector-icons/AntDesign";
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
            
                <Feather
                    name="menu"
                    size={30}
                    color={'black'}
                    style={styles.menu}
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    
                />
                <IconAntDesign
                name="arrowleft"
                size={30}
                color="black"
                style={[{left: 20,top:10, position:'absolute',zIndex:90}]}
                onPress={() => navigation.goBack()}
                
            />
                
            
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
        right: 20,
        top:15


    },
    Title:{
        fontSize:20,
        fontWeight:'bold'
    }
});
