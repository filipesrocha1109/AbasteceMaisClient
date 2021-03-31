import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../Components/GasStation/index'

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
            </Stack.Navigator>
    );
}

