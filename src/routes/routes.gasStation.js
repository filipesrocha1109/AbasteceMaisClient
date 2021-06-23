import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../Pages/GasStation/index'
import Show from '../Pages/GasStation/showGasStation'
import UpdatePrice from '../Pages/GasStation/updatePrice'
import Create from '../Pages/GasStation/createGasstaion'

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
                <Stack.Screen
                    name="UpdatePrice"
                    component={UpdatePrice}                   
                    options={{
                        title: "Show",
                        headerShown:false,
                        headerTitleAlign:'center'
                    }}
                />    
                <Stack.Screen
                    name="Create"
                    component={Create}                   
                    options={{
                        title: "create",
                        headerShown:false,
                        headerTitleAlign:'center'
                    }}
                />        
            </Stack.Navigator>
    );
}

