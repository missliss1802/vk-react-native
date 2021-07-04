import {AsyncStorage} from 'react-native';

const LOGIN_TOKEN_KEY = 'login_token';

export const getToken = AsyncStorage.getItem(LOGIN_TOKEN_KEY);

export const setToken = async token => {
  await AsyncStorage.setItem(LOGIN_TOKEN_KEY, token);
};
