import React, {useState, useEffect, useDebugValue, Children} from 'react';
import getQuery from './../../api.js'
import { View, StyleSheet, ActivityIndicator, ScrollView, Image} from 'react-native';
import {country_data} from './../redux/state'
import UsersData from './../UsersData/UsersData'
import FormInput from './../FormInput/FormInput'
import Menu from './../Menu/Menu'
import Data from './../Data/Data'
import ThemeContainer from './../ThemeContainer/ThemeContainer'
import FavoritesMenu from '../FavoritesMenu/FavoritesMenu';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Search = (props) => {
  let [load, setLoad] = useState(false);
  let [data, setData] = useState([]);
  let [hide, setHide] = useState(false);
  let [hideCity, setHideCity] = useState(false);
  let [cityName, setCityname] = useState('');
  let [id_c, setCid] = useState('');
  let [id, setId] = useState('')
  let [username, setUsername] = useState('')
  let [menu, setMenu] = useState(false)
	let showMenu = () => {
		hide == false ? setHide(true) : setHide(false);
    }
  let searchName = (e) => {
    props.setName(e);
  }
    useEffect(() => {
			let method = 'users.search';
      let params = `q=${props.name.name}&country=${id_c}&city=${props.city_id.city_id}&count=50&fields=photo_100,first_name,last_name,city,country,online`;
      let token = props.token.token;
			getQuery(method, params, token).then(data => {
				props.setUsers(data.response.items);
        setData(data.response.items);
        setLoad(true);
      })
	}, [data.count])

  let userSearch = () => {
    let method = 'users.search';
    let params = `q=${props.name.name}&country=${id_c}&city=${props.city_id.city_id}&count=50&fields=photo_100,first_name,last_name,city,country,online`;
    let token = props.token.token;
		getQuery(method, params, token).then(data => {
			props.setUsers(data.response.items);
      setData(data.response.items);
      setLoad(true);
		})
  }


  let getCountry = (e) => {
    props.setCountry(e);
  }

  let getCountryId = () => {
    for (let i = 0; i < country_data.length; i++) {
      if (props.country.country.toLowerCase() === country_data[i].title.toLowerCase()) {
        props.setCountryId(country_data[i].id);
        setCid(country_data[i].id);
      }
    }
  }

  let getCity = (e) => {
    props.setCity(e);
    setCityname(e);
    setHideCity(true);
  }

  const {navigate} = props.navigation;

  let user_data = (id, name) => {
    props.setId(id);
    setUsername(name);
    setId(id);
    navigate('Пользователь', {user_id: id});
  }

  const getMenu = () => {
    menu ? setMenu(false) : setMenu(true)
  }

  return (
    <View style={!props.theme.theme ? stylesBlack.body : stylesWhite.body} >
      <View style={{position: 'relative'}}>
        <TouchableOpacity onPress={getMenu}>
          <Image style={{width: 50, height: 50}} source={!props.theme.theme ? require('./reorder_white.png') : require('./reorder_black.png')} />
        </TouchableOpacity>
        {menu && <FavoritesMenu navigate={navigate} theme={props.theme.theme} />}
      </View>
      {<ThemeContainer />}
      <FormInput {...props} userSearch={userSearch} searchName={searchName} theme={props.theme.theme}/>
      <Menu cityName={cityName} showMenu={showMenu} 
        hide={hide} getCountry={getCountry} 
        getCountryId={getCountryId} 
        getCity={getCity}
        theme={props.theme.theme}/>
      <Data userSearch={userSearch} setHideCity={setHideCity} 
        hideCity={hideCity} setCityname={setCityname} 
        cityName={cityName}
        theme={props.theme.theme} {...props}/>
      <ScrollView>{!load
                      ? <View style={!props.theme.theme ? [stylesBlack.container, stylesBlack.horizontal] : [stylesWhite.container, stylesWhite.horizontal]}>
                          <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                      : props.users.users.map((item) => { 
                          return <UsersData key={item.id} name = {item.first_name + " " + item.last_name}
                                            user_data={user_data}
                                            id = {item.id}
                                            online = {item.online}
                                            photo = {item.photo_100}
                                            is_closed = {item.is_closed}
                                            theme={props.theme.theme}
                                            city = {'city' in item ? item.city.title : 'не указан'}/> 
                        }) }
      </ScrollView>
    </View>
  );
};

const stylesBlack = StyleSheet.create({
  body: {
    alignContent: 'center',
    backgroundColor: 'black',
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    alignItems: 'center'
  }
})

const stylesWhite = StyleSheet.create({
  body: {
    alignContent: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  horizontal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    alignItems: 'center'
  }
})

export default Search;
