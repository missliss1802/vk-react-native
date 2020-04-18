import React, {useState, useEffect, useDebugValue} from 'react';
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator, TouchableHighlight, Image, ScrollView } from 'react-native';
import getQuery from './../../api'
import UsersData from './../UsersData/UsersData'
import ThemeContainer from './../ThemeContainer/ThemeContainer'

const Friends = (props) => {
    let [load, setLoad] = useState(false);
    let [onl, setOnl] = useState(false);
    let [data, setData] = useState([]);
    let [id, setId] = useState('')
    const {navigate} = props.navigation;
    useEffect(() => {
        let params_id = props.navigation.state.params;
        let method = 'friends.get';
        let params = `user_id=${params_id.user_id}&fields=photo_100,first_name,last_name,city,country,online`;
        let token = props.token.token;
        getQuery(method, params, token).then(data => {
            props.setFriends(data.response.items);
            setData(data.response.items)
			setLoad(true);
		})
    }, [data.count])
    let get_onl = () => {
        setOnl(true);
        console.log(onl)
    }

    let get_all = () => {
        setOnl(false);
        console.log(onl)
    }

    let user_data = (id, name) => {
        setId(id);
        navigate('Друг', {user_id: id});
      }
    return (
        <View style={!props.theme.theme ? stylesBlack.body : stylesWhite.body}>
            <ThemeContainer />
            <View style = {!props.theme.theme ? stylesBlack.buttons : stylesWhite.buttons}>
                <TouchableHighlight onPress={get_all}>
                    <Text style={!props.theme.theme ? stylesBlack.friend : stylesWhite.friend}>Все</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={get_onl}>
                    <Text style={!props.theme.theme ? stylesBlack.friend : stylesWhite.friend}>Онлайн</Text>
                </TouchableHighlight>
            </View>
            <ScrollView>{!load
                      ? <View style={!props.theme.theme ? [stylesBlack.container, stylesBlack.horizontal] : [stylesWhite.container, stylesWhite.horizontal]}><ActivityIndicator size="large" color="#0000ff" /></View>
                      : !onl ? props.friends.friends.map((item) => { return <UsersData key={item.id} name = {item.first_name + " " + item.last_name}
																		id = {item.id}
																		online = {item.online}
																		photo = {item.photo_100}
                                                                        is_closed = {item.is_closed}
                                                                        user_data = {user_data}
                                                                        theme={props.theme.theme}
                                                                        city = {'city' in item ? item.city.title : 'не указан'}/> })
                        : props.friends.friends.filter(el => el.online == 1).map((item) => { return <UsersData key={item.id} name = {item.first_name + " " + item.last_name}
                                                                        id = {item.id}
                                                                        online = {item.online}
                                                                        photo = {item.photo_100}
                                                                        is_closed = {item.is_closed}
                                                                        user_data = {user_data}
                                                                        theme={props.theme.theme}
                                                                        city = {'city' in item ? item.city.title : 'не указан'}/> }) }
            </ScrollView>
        </View>
    )
}

  const stylesBlack = StyleSheet.create({
    body: {
        backgroundColor: '#000',
        width: '100%',
        height: '100%'
      },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    friend: {
        color: '#fff',
        backgroundColor: '#000',
        padding: 8,
        margin: 10,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 5
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row'
    }
})

const stylesWhite = StyleSheet.create({
    body: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%'
      },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    friend: {
        color: '#000',
        backgroundColor: '#fff',
        padding: 8,
        margin: 10,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 5
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row'
    }
})

export default Friends