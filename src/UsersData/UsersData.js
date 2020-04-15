import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator, TouchableHighlight, Image, ScrollView } from 'react-native';

const UsersData = (props) => {
    var secret = props.is_closed === true ? "Закрытый профиль" : "";
    console.log(secret)
      return (
      <ScrollView vertical>
          <View style={styles.userView}>
            <Text onPress={() => {props.user_data(props.id, props.name)}} style={styles.user}>{props.name}</Text>
            <Text style={styles.closed}>{secret}</Text>
        <View>
            <Image style={styles.img} source={{uri: props.photo}}/>
        </View>
                {/* {!props.online ? null : <div className='online'></div>} */}
            <View>
                <Text style={styles.user} id={props.id}>Город: {props.city}</Text>
            </View>
        </View>
      <View style={styles.hr}></View>
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
        marginTop: 20, 
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
    }
})

export default UsersData