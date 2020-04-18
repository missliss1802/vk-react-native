import React, {useEffect} from 'react';
import { View, Text, Button, TouchableHighlight, StyleSheet} from 'react-native';
import VKLogin from 'react-native-vkontakte-login';
import ThemeContainer from './../ThemeContainer/ThemeContainer'
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Login = (props) => {
	const {navigate} = props.navigation;
	let loginApi = async (e) => {
		const isLoggedIn = await VKLogin.isLoggedIn();
		const auth = await VKLogin.login(['friends', 'photos', 'stories']);
		console.log(auth.access_token, isLoggedIn, auth);
		props.setToken(auth.access_token);
		auth.user_id && AsyncStorage.setItem('myId', auth.user_id, (err) => {
			if (err) throw err
		})
		console.log(AsyncStorage.getItem('myId'))
		navigate('Поиск');
	}
	return (
		<View style = {!props.theme.theme ? stylesBlack.body : stylesWhite.body}>
			<ThemeContainer />
			<Text style = {!props.theme.theme ? stylesBlack.text : stylesWhite.text}>Для пользования приложением необходимо авторизоваться</Text>
			<TouchableOpacity onPress={loginApi} style={!props.theme.theme ? stylesBlack.button : stylesWhite.button}>
				<Text style={!props.theme.theme ? stylesBlack.log : stylesWhite.log}>Войти</Text>
			</TouchableOpacity>
		</View>
		)
}

let stylesBlack = StyleSheet.create({
	body: {
		backgroundColor: 'black',
		height: '100%'
	},
	button: {
		backgroundColor: '#000',
		marginLeft: 50,
		marginRight: 50,
		marginTop: 50,
		height: 40,
		marginBottom: 20,
		borderWidth: 1,
		borderColor: '#aaa',
		borderRadius: 5,
		alignItems: 'center'
	},
	text: {
		color: 'white',
		fontSize: 25,
		textAlign: 'center',
		marginTop: 20
	},
	log: {
		color: '#fff',
		fontSize: 18,
		paddingTop: 5
	}
})

let stylesWhite = StyleSheet.create({
	body: {
		backgroundColor: 'white',
		height: '100%'
	},
	button: {
		backgroundColor: '#fff',
		marginLeft: 50,
		marginRight: 50,
		marginTop: 50,
		height: 40,
		marginBottom: 20,
		borderWidth: 1,
		borderColor: '#aaa',
		borderRadius: 5,
		alignItems: 'center'
	},
	text: {
		color: 'black',
		fontSize: 25,
		textAlign: 'center',
		marginTop: 20
	},
	log: {
		color: '#000',
		fontSize: 18,
		paddingTop: 5
	}
})

export default Login;