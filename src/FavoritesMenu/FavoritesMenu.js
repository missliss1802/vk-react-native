import React, {useState} from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import Favorites from '../Favorites/Favorites';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

const FavoritesMenu = (props) => {
    let [favorites, setFavorites] = useState(false)

    const getFavorites = () => {
        favorites ? setFavorites(false) : setFavorites(true);
    }

    const goMyProfile = async () => {
        await AsyncStorage.getItem('myId', (err, res) => {
            if (err) throw err;
            props.navigate('Пользователь', {user_id: res})
        })
    }

    return (
        <View style={!props.theme ? stylesBlack.wrap : stylesWhite.wrap}>
            <TouchableOpacity onPress={goMyProfile} style={!props.theme ? stylesBlack.name : stylesWhite.name}>
                <Text style={!props.theme ? stylesBlack.text : stylesWhite.text}>Моя страница</Text>
            </TouchableOpacity>
            <TouchableOpacity style={!props.theme ? stylesBlack.name : stylesWhite.name}>
                <Text style={!props.theme ? stylesBlack.text : stylesWhite.text} onPress={getFavorites}>Избранное</Text>
            </TouchableOpacity>
            {favorites && <Favorites navigate={props.navigate} theme={props.theme} />}
        </View>
    )
}

export default FavoritesMenu

const stylesBlack = StyleSheet.create({
    name: {
        padding: 10,
        fontSize: 19,
        backgroundColor: '#000',
        marginTop: 10,
        marginLeft: 10,
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 5,
        color: '#fff'
    },
    wrap: {
        position: 'absolute', 
        zIndex: 1,
        top: 50,
        height: Dimensions.get('window').height/2.3,
        width: Dimensions.get('window').width / 1.5,
    },
    text: {
        color: '#fff',
        fontSize: 18
    }
})

const stylesWhite = StyleSheet.create({
    name: {
        padding: 10,
        fontSize: 19,
        backgroundColor: '#fff',
        marginTop: 10,
        marginLeft: 10,
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 5,
        color: '#000'
    },
    wrap: {
        position: 'absolute', 
        zIndex: 1,
        top: 50,
        height: Dimensions.get('window').height/2.3,
        width: Dimensions.get('window').width / 1.5,
    },
    text: {
        color: '#000',
        fontSize: 18
    }
})