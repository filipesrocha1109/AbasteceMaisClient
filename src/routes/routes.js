import * as React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Image
  } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerItems } from '@react-navigation/drawer'

import User from '../Screens/users'
import gasStation from '../Screens/gasStation'
import Login from '../Pages/Login/login'
import CustomDrawer from '../Components/drawer/drawer'

const Drawer = createDrawerNavigator();


export default function Routes() {
    return (
        <NavigationContainer>
            <Drawer.Navigator 
                initialRouteName="Login"  
                
                drawerStyle={{width: 250 }}
                drawerContent={(props) => <CustomDrawer {...props} />}            
            >               
                <Drawer.Screen
                    name="Home"
                    component={gasStation}                   
                    options={{
                        title: "Gas Station",
                        headerShown:true,
                        headerTitleAlign:'center'
                    }}
                />
                <Drawer.Screen
                    name="User"
                    component={User}  
                    openByDefault                                                                    
                />
                <Drawer.Screen
                    name="Login"
                    component={Login}
                    options={{
                        title: 'Logout',
                        swipeEnabled: false,
                        
                    }}
                    labelStyle={{
                        fontSize:18,
                        fontWeight:'bold'
                    }}
                />  
                <Drawer.Screen
                    name="Create"
                    component={User}   
                    options={{
                        title: '',
                        swipeEnabled: false
                        
                    }}       

                />  
                                                      
            </Drawer.Navigator>
        </NavigationContainer>
    );
}