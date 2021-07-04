import React, {useState, useEffect} from 'react';
import getQuery from './../../api.js';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import {country_data} from './../redux/state';
import UsersData from './../UsersData/UsersData';
import FormInput from './../FormInput/FormInput';
import Menu from './../Menu/Menu';
import Data from './../Data/Data';
import ThemeContainer from './../ThemeContainer/ThemeContainer';
import FavoritesMenu from '../FavoritesMenu/FavoritesMenu';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getToken} from '../helpers/loginHelpers.js';

const Search = ({
  setName,
  city_id,
  setUsers,
  name,
  setCountry,
  setCountryId,
  setCity,
  theme,
  country,
  navigation,
  users,
}) => {
  const token = getToken();
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const [hide, setHide] = useState(false);
  const [hideCity, setHideCity] = useState(false);
  const [cityName, setCityname] = useState('');
  const [id_c, setCid] = useState('');
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [menu, setMenu] = useState(false);
  const showMenu = () => {
    hide === false ? setHide(true) : setHide(false);
  };
  const searchName = e => {
    setName(e);
  };
  useEffect(() => {
    const method = 'users.search';
    const params = `q=${name.name}&country=${id_c}&city=${
      city_id.city_id
    }&count=50&fields=photo_100,first_name,last_name,city,country,online`;
    getQuery(method, params, token.token).then(data => {
      setUsers(data.response.items);
      setData(data.response.items);
      setLoad(true);
    });
  }, [data.count]);

  const userSearch = () => {
    const method = 'users.search';
    const params = `q=${name.name}&country=${id_c}&city=${
      city_id.city_id
    }&count=50&fields=photo_100,first_name,last_name,city,country,online`;
    getQuery(method, params, token.token).then(data => {
      setUsers(data.response.items);
      setData(data.response.items);
      setLoad(true);
    });
  };

  const getCountry = e => {
    setCountry(e);
  };

  const getCountryId = () => {
    country_data.forEach(item => {
      if (country.country.toLowerCase() === item.title.toLowerCase()) {
        setCountryId(item.id);
        setCid(item.id);
      }
    });
  };

  const getCity = e => {
    setCity(e);
    setCityname(e);
    setHideCity(true);
  };

  const {navigate} = navigation;

  const navigateToUser = (id, name) => {
    setId(id);
    setUsername(name);
    setId(id);
    navigate('Пользователь', {user_id: id});
  };

  const getMenu = () => {
    menu ? setMenu(false) : setMenu(true);
  };

  return (
    <View style={!theme.theme ? stylesBlack.body : stylesWhite.body}>
      <View style={{position: 'relative'}}>
        <TouchableOpacity onPress={getMenu}>
          <Image
            style={{width: 50, height: 50}}
            source={
              !theme.theme
                ? require('./reorder_white.png')
                : require('./reorder_black.png')
            }
          />
        </TouchableOpacity>
        {menu && <FavoritesMenu navigate={navigate} theme={theme.theme} />}
      </View>
      {<ThemeContainer />}
      <FormInput
        userSearch={userSearch}
        searchName={searchName}
        theme={theme.theme}
      />
      <Menu
        cityName={cityName}
        showMenu={showMenu}
        hide={hide}
        getCountry={getCountry}
        getCountryId={getCountryId}
        getCity={getCity}
        theme={theme.theme}
      />
      <Data
        userSearch={userSearch}
        setHideCity={setHideCity}
        hideCity={hideCity}
        setCityname={setCityname}
        cityName={cityName}
        theme={theme.theme}
      />
      <ScrollView>
        {!load ? (
          <View
            style={
              !theme.theme
                ? [stylesBlack.container, stylesBlack.horizontal]
                : [stylesWhite.container, stylesWhite.horizontal]
            }>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          users.users.map(item => {
            return (
              <UsersData
                key={item.id}
                name={item.first_name + ' ' + item.last_name}
                navigateToUser={navigateToUser}
                id={item.id}
                online={item.online}
                photo={item.photo_100}
                is_closed={item.is_closed}
                theme={theme.theme}
                city={'city' in item ? item.city.title : 'не указан'}
              />
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

const stylesBlack = StyleSheet.create({
  body: {
    alignContent: 'center',
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    alignItems: 'center',
  },
});

const stylesWhite = StyleSheet.create({
  body: {
    alignContent: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    alignItems: 'center',
  },
});

export default Search;
