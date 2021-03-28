import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, useIsDrawerOpen  } from '@react-navigation/drawer'
import Entypo from "react-native-vector-icons/Entypo";

import Index from '../Components/GasStation/index'
import Test from '../Components/Registrations/test'
import Login from '../Components/Login/login'
/*
headerShown:true,
headerTitleAlign:'center'
*/
const Stack = createStackNavigator();

export default function App() {
    return (
            <Stack.Navigator 
                initialRouteName="Home"
                >
                
                <Stack.Screen
                    name="Index"
                    component={Index}                   
                    options={{
                        title: "Home",
                        headerShown:false,
                        headerTitleAlign:'center'
                    }}
                />

                <Stack.Screen
                    name="Test"
                    component={Test}
                    options={{
                        title: "User",
                    }}
                />
   

                <Stack.Screen
                    name="Log out"
                    component={Login}
                    options={{
                        swipeEnabled: false,

                    }}
                />
                

                

                
            </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    menu:{
        marginTop: 10,
    }
})

