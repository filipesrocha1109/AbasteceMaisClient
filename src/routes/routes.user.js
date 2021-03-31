import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Show from '../Components/Registrations/showRegistration';
import Update from '../Components/Registrations/updateRegistration';
import Delete from '../Components/Registrations/deleteRegistration';
import Create from '../Components/Registrations/createRegistration';

const Stack = createStackNavigator();

export default function RoutesUser() {
    return (
            <Stack.Navigator initialRouteName="Show">
                <Stack.Screen
                    name="Show"
                    component={Show}                   
                    options={{
                        title: "Show registration",
                        headerShown:true,
                        headerTitleAlign:'center',
                        
                    }}
                />
                <Stack.Screen
                    name="Create"
                    component={Create}                   
                    options={{
                        title: "Create registration",
                        headerShown:true,
                        headerTitleAlign:'center',
                        swipeEnabled: true 
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
    );
}

