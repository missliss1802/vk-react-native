import {combineReducers, createStore} from 'redux';
import nameReducer from './nameReducer'
import usersReducer from './usersReducer'
import countryReducer from './countryReducer'
import countryIdReducer from './countryIdReducer'
import cityReducer from './cityReducer'
import citiesReducer from './citiesReducer'
import cityIdReducer from './cityIdReducer'
import idReducer from './idReducer'
import userInfoReducer from './userInfoReducer'
import tokenReducer from './tokenReducer'
import themeReducer from './themeReducer'
import friendsReducer from './friendsReducer'

let reducers = combineReducers({
	name: nameReducer,
	users: usersReducer,
	country: countryReducer,
	country_id: countryIdReducer,
	city: cityReducer,
	cities: citiesReducer,
	city_id: cityIdReducer,
	userInfo: userInfoReducer,
	id: idReducer,
	token: tokenReducer,
	friends: friendsReducer,
	theme: themeReducer,
});

let store = createStore(reducers);

export default store;