import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, useIsDrawerOpen  } from '@react-navigation/drawer'
import Entypo from "react-native-vector-icons/Entypo";

import users from './src/Screens/users'
import gasStation from './src/Screens/gasStation'
import Login from './src/Components/Login/login'
import CreateRegistration from './src/Components/Registrations/createRegistration'

/*
headerShown:true,
headerTitleAlign:'center'
*/
const Drawer = createDrawerNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator 
                initialRouteName="Login"
                drawerStyle ={{backgroundColor:'#2c353c'}}
                drawerContentOptions={{
                    activeBackgroundColor: '#ffff',
                    activeTintColor:'#2c353c',
                    inactiveTintColor: '#ffff',
                    labelStyle:{
                    fontSize:18,
                    fontWeight:'bold'
                }
            }}
                >
                
                
                <Drawer.Screen
                    name="Index"
                    component={gasStation}                   
                    options={{
                        title: "Home",
                        headerShown:true,
                        headerTitleAlign:'center'
                    }}
                />
                <Drawer.Screen
                    name="User"
                    component={users}
                    options={{
                        title: "User",
                    }}
                />

                <Drawer.Screen
                    name="Login"
                    component={Login}
                    options={{
                        swipeEnabled: false,
                        title:"Log out"
                    }}
                />
                <Drawer.Screen
                    
                    name="CreateRegistration"
                    component={CreateRegistration}
                    options={{
                        title: "Create Registration",
                        headerShown:true,
                        headerTitleAlign:'center',
                        swipeEnabled: false,
                        headerLeft: () => (
                            <Text
                              onPress={() => alert('This is a button!')}
                              title="Info"
                              color="#fff"
                            />
                          ),
                        drawerLabel: () => null,
                        title: undefined,
                        drawerIcon: () => null,
                    }}
                />
                                       
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    menu:{
        marginTop: 10,
    }
})

