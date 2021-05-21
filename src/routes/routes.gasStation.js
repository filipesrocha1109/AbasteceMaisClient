import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../Pages/GasStation/index'
import Show from '../Pages/GasStation/showGasStation'

const Stack = createStackNavigator();

export default function RoutesGasStation() {
    return (
            <Stack.Navigator 
                initialRouteName="Home"
                >               
                <Stack.Screen
                    name="Home"
                    component={Home}                   
                    options={{
                        title: "Home",
                        headerShown:false,
                        headerTitleAlign:'center'
                    }}
                />  
                <Stack.Screen
                    name="Show"
                    component={Show}                   
                    options={{
                        title: "Show",
                        headerShown:false,
                        headerTitleAlign:'center'
                    }}
                />              
            </Stack.Navigator>
    );
}

