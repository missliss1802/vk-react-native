import SearchContainer from './src/SearchContainer/SearchContainer';
import LoginContainer from './src/LoginContainer/LoginContainer';
import UserProfileContainer from './src/UserProfileContainer/UserProfileContainer';
import FriendsContainer from './src/FriendsContainer/FriendsContainer';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

const App = createStackNavigator({
  Авторизация: {screen: LoginContainer},
  Поиск: {screen: SearchContainer},
  Пользователь: {screen: UserProfileContainer},
  Друзья: {screen: FriendsContainer},
  Друг: {screen: UserProfileContainer},
});

export default createAppContainer(App);
