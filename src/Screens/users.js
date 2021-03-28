import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, useIsDrawerOpen  } from '@react-navigation/drawer'
import Entypo from "react-native-vector-icons/Entypo";

import Show from '../Components/Registrations/showRegistration'
import Update from '../Components/Registrations/updateRegistration'
import Delete from '../Components/Registrations/deleteRegistration'
/*
headerShown:true,
headerTitleAlign:'center'
*/
const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer
            independent={true}
            >
            <Stack.Navigator initialRouteName="Show">
                <Stack.Screen
                    name="Show"
                    component={Show}                   
                    options={{
                        title: "Show registration",
                        headerShown:true,
                        headerTitleAlign:'center'
                    }}
                />
                <Stack.Screen
                    name="Update"
                    component={Update}                   
                    options={{
                        title: "Update registration",
                        headerShown:true,
                        headerTitleAlign:'center'
                    }}
                />
                <Stack.Screen
                    name="Delete"
                    component={Delete}                   
                    options={{
                        title: "Delete registration",
                        headerShown:true,
                        headerTitleAlign:'center'
                    }}
                />
            

            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    menu:{
        marginTop: 10,
    }
})

