import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react';
import {Provider} from 'react-redux';
import {name as appName} from './app.json';
import store from './src/redux/reduxStore';


const rerender = () => {
    return (
    <Provider store={store}>
		<App/>
	</Provider>
    )
}

AppRegistry.registerComponent(appName, () => rerender);
