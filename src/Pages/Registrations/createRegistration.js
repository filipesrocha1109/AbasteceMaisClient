import * as React from 'react';
import { View, Text, Button } from 'react-native';


export default function CreateRegistration({ navigation }){
    return(
      <View>
        <Text>
          CreateRegistration
        </Text>
        <Button 
          title="Login"
          onPress={()=> navigation.navigate('Login')}
        />
      </View>
    )
}