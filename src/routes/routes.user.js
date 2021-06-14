import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Show from '../Pages/Registrations/showRegistration';
import Update from '../Pages/Registrations/updateRegistration';
import Delete from '../Pages/Registrations/deleteRegistration';
import Create from '../Pages/Registrations/createRegistration';

const Stack = createStackNavigator();

export default function RoutesUser() {
    return (
            <Stack.Navigator initialRouteName="Show">
                <Stack.Screen
                    name="Show"
                    component={Show}                   
                    options={{
                        title: "Show registration",
                        headerShown:false,
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
                        headerShown:false,
                        headerTitleAlign:'center'
                    }}
                />
                <Stack.Screen
                    name="Delete"
                    component={Delete}                   
                    options={{
                        title: "Delete registration",
                        headerShown:false,
                        headerTitleAlign:'center'
                    }}
                />            
            </Stack.Navigator>
    );
}

