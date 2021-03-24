/*import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from './src/Pages/Login/login'
import CreateRegistration from './src/Pages/Registrations/createRegistration'

const Stack = createStackNavigator();

export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="CreateRegistrationr" component={CreateRegistration}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
}
*/

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/Pages/Login/login'
import CreateRegistration from './src/Pages/Registrations/createRegistration'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{
            title: 'Login'
          }}
        />
        <Stack.Screen 
        name="CreateRegistration" 
        component={CreateRegistration} 
        options={{
          title: 'Cadastro de usuário'
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;