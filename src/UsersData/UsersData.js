import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator, TouchableHighlight, Image, ScrollView } from 'react-native';

const UsersData = (props) => {
    var secret = props.is_closed === true ? "Закрытый профиль" : "";
      return (
      <ScrollView vertical>
        <TouchableHighlight onPress={() => {props.user_data(props.id, props.name)}}>
            <View style={!props.theme ? stylesBlack.userView : stylesWhite.userView}>
                <Text style={!props.theme ? stylesBlack.user : stylesWhite.user}>{props.name}</Text>
                <Text style={!props.theme ? stylesBlack.closed : stylesWhite.closed}>{secret}</Text>
                <View style={{position: 'relative'}}>
                    <Image style={!props.theme ? stylesBlack.img : stylesWhite.img} source={{uri: props.photo}}/>
                    {props.online ? <View style={!props.theme ? stylesBlack.online : stylesWhite.online}></View> : null}
                </View>
                <View>
                    <Text style={!props.theme ? stylesBlack.user : stylesWhite.user} id={props.id}>Город: {props.city}</Text>
                </View>
            </View>
        </TouchableHighlight>
      </ScrollView>
          )
  }

  const stylesBlack = StyleSheet.create({
    user: {
        color: '#fff',
        fontSize: 20,
        margin: 0
    },
    userView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        margin: 20,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 5
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 20,
        marginBottom: 25
    },
    hr: {
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        marginTop: 30
    },
    closed: {
        color: '#69E563'
    },
    online: {
        borderRadius: 10,
        backgroundColor: '#D0FF00',
        width: 15,
        height: 15,
        position: 'absolute',
        top: 100,
        left: 100
    }
})

const stylesWhite = StyleSheet.create({
    user: {
        color: '#000',
        fontSize: 20,
        margin: 0
    },
    userView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        margin: 20,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 5
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 50,
        margin: 20,
        marginBottom: 25
    },
    hr: {
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        marginTop: 30
    },
    closed: {
        color: '#CD9BFF'
    },
    online: {
        borderRadius: 10,
        backgroundColor: '#D0FF00',
        width: 15,
        height: 15,
        position: 'absolute',
        top: 100,
        left: 100
    }
})

export default UsersData