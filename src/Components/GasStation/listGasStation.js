import React, { useState, useEffect } from "react";
import {StyleSheet, Image, Linking, TextInput, Text, TouchableOpacity, Alert, ScrollView, SafeAreaView, StatusBar, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";



export default function ListGasStation(props) {

    return (
       
            <View style={styles.ContainerGasStation}>
                <View style={styles.ContainerLeft}>
                    <Text style={styles.Name} >{props.name}</Text>
                    <Text>{`${props.address}, ${props.number} - ${props.districtID}` }</Text>
                    <Text>{`${props.cep ? props.cep: '00000-000' }`}</Text>
                    <View style={styles.ContaineButtons}> 
                        <MaterialCommunityIcons
                            name="google-maps"
                            size={25}
                            color="black"
                            style={styles.maps}
                            onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${props.address}, ${props.number} - ${props.districtID}` )}
                        />
                        <View style={styles.ContaineButtons} >
                            <AntDesign
                                name="like1"
                                size={25}
                                color="green"
                                style={styles.like}
                                onPress={() => alert('like')}
                            />
                            <AntDesign
                                name="dislike1"
                                size={25}
                                color="red"
                                style={styles.like}
                                onPress={() => alert('deslike')}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.ContainerRight}>
                    <View style={styles.ContainerPrice}>
                        <Image
                            style={styles.ImgTypeGas}
                            source={ props.priceGasolinaComum == 0 ? require('../../assets/GC_GRAY.png') : require('../../assets/GC.png')}
                        />
                         <Text style = { props.priceGasolinaComum == 0 ? styles.PriceWhite : styles.Price}> 
                           R$ {props.priceGasolinaComum ? props.priceGasolinaComum : 0 }
                        </Text>
                    </View >
                    <View style={styles.ContainerPriceGray}>
                        <Image
                            style={styles.ImgTypeGas}
                            source={ props.priceGasolinaAditivada == 0 ? require('../../assets/GA_GRAY.png') : require('../../assets/GA.png')}
                        />
                        <Text style = { props.priceGasolinaAditivada == 0 ? styles.PriceWhite : styles.Price}> 
                            R$ {props.priceGasolinaAditivada ? props.priceGasolinaAditivada : 0 }
                        </Text>
                    </View>
                    <View style={styles.ContainerPrice}>
                        <Image
                            style={styles.ImgTypeGas}
                            source={ props.priceDisel == 0 ? require('../../assets/DS_GRAY.png') : require('../../assets/DS.png')}
                        />
                        <Text style = { props.priceDisel == 0 ? styles.PriceWhite : styles.Price}> 
                            R$ {props.priceDisel ? props.priceDisel : 0 }
                        </Text>
                    </View>
                    <View style={styles.ContainerPriceGray}>
                        <Image
                            style={styles.ImgTypeGas}
                            source={ props.priceGas == 0 ? require('../../assets/GS_GRAY.png') : require('../../assets/GS.png')}
                        />
                        <Text style = { props.priceGas == 0 ? styles.PriceWhite : styles.Price}> 
                            R$ {props.priceGas ? props.priceGas : 0 }
                        </Text>
                    </View>
                    
                </View>
                
            </View> 
       
    );
}


const styles = StyleSheet.create({
    ContainerGasStation:{
        backgroundColor:"#E5E5E5",
        height:140,
        borderRadius:5,
        marginBottom: 7,
        flexDirection:'row'

    },
    ContainerLeft:{
        width:'67%',
        margin:3,
        borderRadius:5,
        padding:10
    },
    ContainerRight:{
        width:'30%',
        margin:3,
        borderRadius:5       
    },
    ImgTypeGas:{
        height: 30,
        width: 30,
        resizeMode: "stretch",
        alignItems: "center",       
    },
    Price:{
        color:'black',
        marginTop:3,
        fontSize:18,
        fontFamily:'Roboto',
        marginRight:8
    },
    PriceWhite:{
        color:'#B0B0B0',
        marginTop:3,
        fontSize:18,
        fontFamily:'Roboto',
        marginRight:8
    },
    ContainerPrice:{
        flexDirection: "row",
        justifyContent: 'space-between',
        
        borderRadius:5      
    },
    ContainerPriceGray:{
        flexDirection: "row",
        justifyContent: 'space-between',
        
        borderRadius:5      
    },
    Name:{
        fontSize:21,
        fontWeight:'bold',
        color:'#0e2d3f'
    },
    maps:{
        backgroundColor:'#B2B0B0',
        height:25,
        width:25,
        borderRadius:5,
        marginTop: 3,
        marginLeft:5
    },
    like:{
        height:25,
        width:25,
        borderRadius:5,
        marginTop: 3,
        marginLeft:5
    },
    ContaineButtons:{
        flexDirection: "row",
        justifyContent: 'space-between',
    }

});