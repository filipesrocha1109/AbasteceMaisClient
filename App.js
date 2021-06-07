import React, {useState,useEffect,useRef} from "react";
import Routes from './src/routes/routes';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function App() {

    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);

    useEffect(()=>{
        (async function(){
            const {status, permissions} = await Permissions.askAsync(Permissions.LOCATION);
            if(status === 'granted'){
                //return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
                let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
                console.log(location.coords.latitude);
                console.log(location.coords.longitude);
                StoreData(
                    location.coords.latitude.toString(),
                    "latitude_user"
                );
                StoreData(
                    location.coords.longitude.toString(),
                    "longitude_user"
                );
                
            }else{
                throw new Error('Location permission not granted');
            }
        })();
    },[]);

    const StoreData = async (value, name) => {
        try {
            await AsyncStorage.setItem("@" + name, value);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Routes/>
    );
}


