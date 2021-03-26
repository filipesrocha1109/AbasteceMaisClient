import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./src/Pages/Login/login";
import CreateRegistration from "./src/Pages/Registrations/createRegistration";
import Index from "./src/Pages/GasStation/index";

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        title: "Login",
                    }}
                />

                <Stack.Screen
                    name="CreateRegistration"
                    component={CreateRegistration}
                    options={{
                        title: "Create Registration",
                    }}
                />

                <Stack.Screen
                    name="Index"
                    component={Index}
                    options={{
                        title: "Home",
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
