import React, {useState, useEffect, useDebugValue, Children} from 'react';
import getQuery from './../../api.js'
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator, TouchableHighlight, Image, ScrollView, AsyncStorage } from 'react-native';
import {country_data} from './../redux/state'
import UsersData from './../UsersData/UsersData'

const Search = (props) => {
  let [load, setLoad] = useState(false);
  let [data, setData] = useState([]);
  let [hide, setHide] = useState(false);
  let [hideCity, setHideCity] = useState(false);
  let [cityName, setCityname] = useState('');
  let [id_c, setCid] = useState('');
  let [id, setId] = useState('')
  let [username, setUsername] = useState('')
  let [data_user, setDataUser] = useState([]);
	let showMenu = () => {
		hide == false ? setHide(true) : setHide(false);
    }
  let searchName = (e) => {
    props.setName(e);
  }
    useEffect(() => {
			let method = 'users.search';
      let params = `q=${props.name.name}&country=${id_c}&city=${props.city_id.city_id}&count=50&fields=photo_100,first_name,last_name,city,country`;
      let token = props.token.token;
			getQuery(method, params, token).then(data => {
				props.setUsers(data.response.items);
        setData(data.response.items);
        setLoad(true);
      })
	}, [data.count])

  let userSearch = () => {
    let method = 'users.search';
    let params = `q=${props.name.name}&country=${id_c}&city=${props.city_id.city_id}&count=50&fields=photo_100,first_name,last_name,city,country`;
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

  return (
    <View style={styles.body} >
      <FormInput {...props} userSearch={userSearch} searchName={searchName} />
      <Menu cityName={cityName} showMenu={showMenu} hide={hide} getCountry={getCountry} getCountryId={getCountryId} getCity={getCity}/>
      <Data userSearch={userSearch} setHideCity={setHideCity} hideCity={hideCity} setCityname={setCityname} cityName={cityName} {...props}/>
      <ScrollView>{!load
                      ? <View style={[styles.container, styles.horizontal]}><ActivityIndicator size="large" color="#0000ff" /></View>
                      : props.users.users.map((item) => { return <UsersData key={item.id} name = {item.first_name + " " + item.last_name}
                                    user_data={user_data}
                                    id = {item.id}
                                    online = {item.online}
                                    photo = {item.photo_100}
                                    is_closed = {item.is_closed}
                                    city = {'city' in item ? item.city.title : 'не указан'}/> }) }</ScrollView>
    </View>
  );
};

const FormInput = (props) => {
	return (
		<View>
			<TextInput style={styles.input1} placeholderTextColor={'#aaa'} onChangeText={props.searchName} onBlur={props.userSearch} value={props.name.name} placeholder ="Введите имя"/>
		</View>
		)
}

const Menu = (props) => {
	return (
		<View>
			<View style={props.display}>
				<TouchableHighlight onPress={props.showMenu} style={styles.button}>
					<Text style={styles.butText}>Поиск по городу &#9660;</Text>
				</TouchableHighlight>
			</View>
			{props.hide && <View>
				<TextInput style={styles.input} placeholderTextColor={'#aaa'} onChangeText={props.getCountry} onBlur={props.getCountryId} id="input" placeholder ="Страна" type="text" name=""/>
				<TextInput style={styles.input} placeholderTextColor={'#aaa'} onChangeText={props.getCity} value={props.cityName} placeholder ="Город" type="text" name=""/>
			</View>}
		</View>
		)
}

const Data = (props) => {
  let [data, setData] = useState([]);
  let cityLoad = (city, id) => {
    props.setCityname(city);
    props.setHideCity(false);
    props.setCityId(id);
    userSearch(id);
  }

  let userSearch = (id) => {
    let method = 'users.search';
    let params = `q=${props.name.name}&country=${props.country_id.country_id}&city=${id}&count=50&fields=photo_100,first_name,last_name,city,country`;
    let token = props.token.token;
		getQuery(method, params, token).then(data => {
			props.setUsers(data.response.items);
			setData(data.response.items);
		})
  }

  useEffect(() => {
		let method = 'database.getCities';
    let params = `q=${props.city.city}&country_id=${props.country_id.country_id}`;
    let token = props.token.token;
		getQuery(method, params, token).then(data => {
      props.setCities(data.response.items);
			setData(data.response.items);
		})
  }, [data.count, props.city.city]);
  return (
    <ScrollView style={{height: props.hideCity ? '70%' : 0}}>
      {props.hideCity && props.cities.cities.map((item) => {return <City cityLoad={cityLoad} key={item.id} id={item.id} city={item.title} />})}
    </ScrollView>
  )
}

const City = (props) => {
	return (
    <View>
      <TouchableHighlight >
				<Text title={props.city} id={props.id} onPress={() => {props.cityLoad(props.city, props.id)}} type='button' style={styles.city}>{props.city}</Text>
      </TouchableHighlight>
			</View>)
}



const styles = StyleSheet.create({
	input1: {
		backgroundColor: '#000',
    fontSize: 25,
    color: '#fff',
    paddingLeft: 10,
    borderColor: '#aaa',
    borderBottomWidth: 1
	},
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 20,
    marginBottom: 25
  },
  closed: {
    color: '#69E563'
  },
  body: {
		display: 'flex',
    alignContent: 'center'
	},
	text: {
		backgroundColor: '#5F92DD',
		textAlign: 'center',
		marginRight: 50,
		marginLeft: 50,
		marginTop: 25,
		padding: 5,
		fontSize: 20,
		color: '#fff'
	},
	input: {
		backgroundColor: '#000',
    marginBottom: 10,
    color: '#fff',
    paddingLeft: 10,
    borderColor: '#aaa',
    borderBottomWidth: 1,
    marginHorizontal: 15

	},
	button: {
		backgroundColor: '#000',
		marginLeft: 50,
		marginRight: 50,
		marginTop: 20,
		height: 30,
    marginBottom: 20,
    borderColor: '#aaa',
    borderWidth: 1,
    paddingBottom: 40,
    borderRadius: 5,
    alignItems: 'center'
  },
  butText: {
    color: '#fff',
    paddingTop: 5,
    fontSize: 18
  },
  city: {
    backgroundColor: '#000',
		marginLeft: 80,
		marginRight: 80,
		marginTop: 5,
		height: 30,
    marginBottom: 5,
    textAlign: 'center', 
    color: '#fff', 
    fontSize: 17,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#aaa'
  },
  body: {
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

export default Search;
