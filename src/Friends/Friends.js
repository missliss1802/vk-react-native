import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import getQuery from './../../api';
import UsersData from './../UsersData/UsersData';
import ThemeContainer from './../ThemeContainer/ThemeContainer';
import {getToken} from '../helpers/loginHelpers';

const Friends = ({navigation, setFriends, friends, theme}) => {
  const token = getToken();
  const [load, setLoad] = useState(false);
  const [onl, setOnl] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState('');
  const {navigate} = navigation;
  useEffect(() => {
    const params_id = navigation.state.params;
    const method = 'friends.get';
    const params = `user_id=${
      params_id.user_id
    }&fields=photo_100,first_name,last_name,city,country,online`;
    getQuery(method, params, token).then(data => {
      setFriends(data.response.items);
      setData(data.response.items);
      setLoad(true);
    });
  }, [data.count]);
  const getOnline = () => {
    setOnl(true);
    console.log(onl);
  };

  const getAll = () => {
    setOnl(false);
    console.log(onl);
  };

  const navigateToUser = _id => {
    setId(_id);
    navigate('Друг', {user_id: _id});
  };
  return (
    <View style={!theme.theme ? stylesBlack.body : stylesWhite.body}>
      <ThemeContainer />
      <View style={!theme.theme ? stylesBlack.buttons : stylesWhite.buttons}>
        <TouchableHighlight onPress={getAll}>
          <Text style={!theme.theme ? stylesBlack.friend : stylesWhite.friend}>
            Все
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={getOnline}>
          <Text style={!theme.theme ? stylesBlack.friend : stylesWhite.friend}>
            Онлайн
          </Text>
        </TouchableHighlight>
      </View>
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
        ) : !onl ? (
          friends.friends.map(item => {
            return (
              <UsersData
                key={item.id}
                name={item.first_name + ' ' + item.last_name}
                id={item.id}
                online={item.online}
                photo={item.photo_100}
                is_closed={item.is_closed}
                navigateToUser={navigateToUser}
                theme={theme.theme}
                city={'city' in item ? item.city.title : 'не указан'}
              />
            );
          })
        ) : (
          friends.friends
            .filter(el => el.online == 1)
            .map(item => {
              return (
                <UsersData
                  key={item.id}
                  name={item.first_name + ' ' + item.last_name}
                  id={item.id}
                  online={item.online}
                  photo={item.photo_100}
                  is_closed={item.is_closed}
                  navigateToUser={navigateToUser}
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
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  friend: {
    color: '#fff',
    backgroundColor: '#000',
    padding: 8,
    margin: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const stylesWhite = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  friend: {
    color: '#000',
    backgroundColor: '#fff',
    padding: 8,
    margin: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Friends;
