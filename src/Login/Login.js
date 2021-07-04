import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import VKLogin from 'react-native-vkontakte-login';
import ThemeContainer from './../ThemeContainer/ThemeContainer';
import AsyncStorage from '@react-native-community/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {setToken} from '../helpers/loginHelpers';

const Login = ({navigation, theme}) => {
  const {navigate} = navigation;
  let loginApi = async () => {
    try {
      const auth = await VKLogin.login(['friends', 'photos', 'stories']);
      await setToken(auth.access_token);
      auth.user_id &&
        AsyncStorage.setItem('myId', auth.user_id, err => {
          if (err) {
            throw err;
          }
        });
      navigate('Поиск');
    } catch (err) {
      Alert.alert(err);
    }
  };
  return (
    <View style={!theme.theme ? stylesBlack.body : stylesWhite.body}>
      <ThemeContainer />
      <Text style={!theme.theme ? stylesBlack.text : stylesWhite.text}>
        Для пользования приложением необходимо авторизоваться
      </Text>
      <TouchableOpacity
        onPress={loginApi}
        style={!theme.theme ? stylesBlack.button : stylesWhite.button}>
        <Text style={!theme.theme ? stylesBlack.log : stylesWhite.log}>
          Войти
        </Text>
      </TouchableOpacity>
    </View>
  );
};

let stylesBlack = StyleSheet.create({
  body: {
    backgroundColor: 'black',
    height: '100%',
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
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20,
  },
  log: {
    color: '#fff',
    fontSize: 18,
    paddingTop: 5,
  },
});

let stylesWhite = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    height: '100%',
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
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20,
  },
  log: {
    color: '#000',
    fontSize: 18,
    paddingTop: 5,
  },
});

export default Login;
