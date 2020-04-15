import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator, TouchableHighlight, Image, ScrollView } from 'react-native';

const UsersData = (props) => {
    var secret = props.is_closed === true ? "Закрытый профиль" : "";
    console.log(props)
      return (
      <ScrollView vertical>
        <TouchableHighlight onPress={() => {props.user_data(props.id, props.name)}}>
            <View style={styles.userView}>
                <Text style={styles.user}>{props.name}</Text>
                <Text style={styles.closed}>{secret}</Text>
                <View style={{position: 'relative'}}>
                    <Image style={styles.img} source={{uri: props.photo}}/>
                    {props.online ? <View style={styles.online}></View> : null}
                </View>
                <View>
                    <Text style={styles.user} id={props.id}>Город: {props.city}</Text>
                </View>
            </View>
        </TouchableHighlight>
      </ScrollView>
          )
  }

  const styles = StyleSheet.create({
    user: {
        color: 'white',
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
        borderBottomColor: 'white',
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

export default UsersData