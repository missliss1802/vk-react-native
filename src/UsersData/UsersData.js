import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  ScrollView,
} from 'react-native';

const UsersData = ({
  is_closed,
  navigateToUser,
  theme,
  photo,
  id,
  city,
  name,
  online,
}) => {
  const secret = is_closed === true ? 'Закрытый профиль' : '';
  return (
    <ScrollView vertical>
      <TouchableHighlight
        onPress={() => {
          navigateToUser(id, name);
        }}>
        <View style={!theme ? stylesBlack.userView : stylesWhite.userView}>
          <Text style={!theme ? stylesBlack.user : stylesWhite.user}>
            {name}
          </Text>
          <Text style={!theme ? stylesBlack.closed : stylesWhite.closed}>
            {secret}
          </Text>
          <View style={{position: 'relative'}}>
            <Image
              style={!theme ? stylesBlack.img : stylesWhite.img}
              source={{uri: photo}}
            />
            {online ? (
              <View style={!theme ? stylesBlack.online : stylesWhite.online} />
            ) : null}
          </View>
          <View>
            <Text style={!theme ? stylesBlack.user : stylesWhite.user} id={id}>
              Город: {city}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    </ScrollView>
  );
};

const stylesBlack = StyleSheet.create({
  user: {
    color: '#fff',
    fontSize: 20,
    margin: 0,
  },
  userView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    margin: 20,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 20,
    marginBottom: 25,
  },
  hr: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    marginTop: 30,
  },
  closed: {
    color: '#69E563',
  },
  online: {
    borderRadius: 10,
    backgroundColor: '#D0FF00',
    width: 15,
    height: 15,
    position: 'absolute',
    top: 100,
    left: 100,
  },
});

const stylesWhite = StyleSheet.create({
  user: {
    color: '#000',
    fontSize: 20,
    margin: 0,
  },
  userView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    margin: 20,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 20,
    marginBottom: 25,
  },
  hr: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginTop: 30,
  },
  closed: {
    color: '#CD9BFF',
  },
  online: {
    borderRadius: 10,
    backgroundColor: '#D0FF00',
    width: 15,
    height: 15,
    position: 'absolute',
    top: 100,
    left: 100,
  },
});

export default UsersData;
