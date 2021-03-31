import React from 'react';
import { View, StyleSheet, SafeAreaView, Image, Dimensions   } from 'react-native';
import IconAntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { DrawerItem,DrawerContentScrollView } from '@react-navigation/drawer';

let heigt = Dimensions.get('window').height * 0.85
let heigtBack = Dimensions.get('window').height * 0.93

export default function DrawerContent(props) {
	const {navigation} = props;

	const Disconnect = async (value) => {
        try {
            await AsyncStorage.removeItem('@'+value)
        } catch(e) {
            console.log(e);
        }
    }

	const logOut = () => {
	 	Disconnect('registration_id')	
		navigation.navigate('Login')
	}


	return (
		<DrawerContentScrollView  style={styles.drawerContent}>

			<View style={styles.top}>	
				<View style={styles.logo}>
					<Image
						style={styles.IconLogo}
						source={require('../../assets/logo-white.png')}
            		/>
				</View>
				<IconAntDesign
					name="home"
					size={20}
					color="black"
					style={styles.IconHome}
            	/>

				<DrawerItem
					style={styles.item}
					label="Home"
					onPress={() => navigation.navigate('Home')}
				/>
				<IconAntDesign
					name="user"
					size={20}
					color="black"
					style={styles.IconUser}
            	/>
				<DrawerItem
					style={styles.item}
					label="User"
					onPress={() => navigation.navigate('User')}
				/>

				

			</View>
				<MaterialIcons
						name="exit-to-app"
						size={20}
						color="black"
						style={styles.IconBack}
					/>
			
			<View style={styles.footer}>
				
				<DrawerItem
					style={styles.lasItem}
					label="Logout"
					onPress={logOut}
				/>
			</View>

		</DrawerContentScrollView >
	);
}

const styles = StyleSheet.create({
	drawerContent: {
		flex: 1,
		
	},
	logo:{
		height: 200,
		//backgroundColor: 'blue'
	},
	item:{
		height:50,
		backgroundColor: '#E5E5E5',
		margin:5,
		borderRadius:5,
		paddingLeft:40
	},top:{
		height:heigt,
		
	},
	footer:{
		backgroundColor: '#E5E5E5',
		margin:5,
		borderRadius:5
	},
	IconLogo: {
        top: 40,
        marginBottom: 50,
        height:120,
        width:190,
		marginLeft:30
    },
	IconHome: {
        position: "absolute",
        top: 218,
        left: 25,
        zIndex: 3,
    },
	IconUser: {
        position: "absolute",
        top: 274,
        left: 25,
        zIndex: 3,
    },
	IconBack: {
        position: "absolute",
        top: heigtBack,
        left: 25,
        zIndex: 99,
    },
	lasItem:{
		paddingLeft:40
	}

});