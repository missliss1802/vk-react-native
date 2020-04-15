import React, {useEffect} from 'react';
import { View, Text, Button, TouchableHighlight, StyleSheet} from 'react-native';
import VKLogin from 'react-native-vkontakte-login';

const Login = (props) => {
	const {navigate} = props.navigation;
	let loginApi = async (e) => {
		const isLoggedIn = await VKLogin.isLoggedIn();
		const auth = await VKLogin.login(['friends', 'photos']);
		console.log(auth.access_token, isLoggedIn);
		props.setToken(auth.access_token);
		navigate('Поиск');
	}
	return (
		<View style = {styles.body}>
			<Text style = {styles.text}>Для пользования приложением необходимо авторизоваться</Text>
			<TouchableHighlight onPress={loginApi} style={styles.button}>
				<Text style={styles.log}>Войти</Text>
			</TouchableHighlight>
		</View>
		)
}

let styles = StyleSheet.create({
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

export default Login;