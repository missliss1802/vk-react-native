import React, {useState, useEffect} from 'react';
import Users from './../Users/Users';
import getQuery from './../../api';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  Dimensions,
  Alert,
} from 'react-native';
import ThemeContainer from './../ThemeContainer/ThemeContainer';
import AsyncStorage from '@react-native-community/async-storage';
import {getToken} from '../helpers/loginHelpers';

const Userprofile = ({navigation, theme, userInfo}) => {
  const token = getToken();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [stories, setStories] = useState([]);
  const [count, setCount] = useState(20);
  const [countStories, setCountStories] = useState(false);
  const [x, setX] = useState(4000);
  const {navigate} = navigation;

  useEffect(() => {
    const params_id = navigation.state.params;
    const method = 'users.get';
    const params = `user_ids=${
      params_id.user_id
    }&fields=is_closed,photo_max_orig,online,bdate,city,contacts,counters,country,last_seen,sex,status`;
    getQuery(method, params, token).then(_data => {
      setData(_data.response[0]);
      setLoad(true);
      setAsyncData(_data.response[0]);
    });
  }, [data.id]);
  const setAsyncData = async data => {
    await AsyncStorage.setItem(
      `${data.first_name} ${data.last_name}`,
      JSON.stringify(data),
      err => {
        if (err) throw err;
      },
    );
  };

  const get_friends = id => {
    data.is_closed
      ? Alert.alert(
          'Упс!',
          'У пользователя закрыт профиль, поэтому друзья скрыты.',
        )
      : navigate('Друзья', {user_id: id});
  };

  useEffect(() => {
    const params_id = navigation.state.params;
    const method = 'photos.getAll';
    const params = `owner_id=${params_id.user_id}&count=${count}&extended=1`;
    getQuery(method, params, token).then(data => {
      setPhotos(data);
      setLoad(true);
    });
  }, [count]);

  useEffect(() => {
    const params_id = navigation.state.params;
    const method = 'stories.get';
    const params = `owner_id=${params_id.user_id}&count=200&extended=1`;
    getQuery(method, params, token).then(_data => {
      setStories(_data);
      setLoad(true);
      _data.response.count ? setCountStories(true) : setCountStories(false);
    });
  }, [data.id]);

  if (!userInfo.user_info) {
    return (
      <View style={[stylesBlack.container, stylesBlack.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <ThemeContainer />
      <View />
      <ScrollView vertical>
        <View style={!theme.theme ? stylesBlack.body : stylesWhite.body}>
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
            <View>
              <Users
                theme={theme.theme}
                get_friends={get_friends}
                user={data}
              />
              <Text style={!theme.theme ? stylesBlack.name : stylesWhite.name}>
                Фотографии:
              </Text>
              <ScrollView
                horizontal
                onScroll={e => {
                  if (e.nativeEvent.contentOffset.x > x) {
                    setCount(count + 20);
                    setX(x + 5000);
                  }
                }}>
                <View
                  style={
                    !theme.theme ? stylesBlack.gallery : stylesWhite.gallery
                  }>
                  {!photos.response ? (
                    <Text
                      style={
                        !theme.theme ? stylesBlack.name1 : stylesWhite.name1
                      }>
                      скрыты
                    </Text>
                  ) : (
                    photos.response.items.map(item => {
                      if (item.sizes[4]) {
                        return (
                          <View key={item.id}>
                            <Image
                              style={
                                !theme.theme
                                  ? stylesBlack.photo
                                  : stylesWhite.photo
                              }
                              source={{uri: item.sizes[4].url}}
                            />
                          </View>
                        );
                      }
                    })
                  )}
                </View>
              </ScrollView>
              <Text style={!theme.theme ? stylesBlack.name : stylesWhite.name}>
                Истории:
              </Text>
              <ScrollView
                horizontal
                onScroll={e => {
                  if (e.nativeEvent.contentOffset.x > x) {
                    setCount(count + 20);
                    setX(x + 5000);
                  }
                }}>
                <View
                  style={
                    !theme.theme ? stylesBlack.gallery : stylesWhite.gallery
                  }>
                  {!countStories ? (
                    <Text
                      style={
                        !theme.theme ? stylesBlack.name1 : stylesWhite.name1
                      }>
                      у пользователя нет историй
                    </Text>
                  ) : (
                    stories.response.items.map(item => {
                      if (item[0]) {
                        return (
                          <View
                            style={{
                              alignItems: 'center',
                              width: Dimensions.get('window').width,
                            }}
                            key={item.id}>
                            <Image
                              style={
                                !theme.theme
                                  ? stylesBlack.photo1
                                  : stylesWhite.photo1
                              }
                              source={{uri: item[0].photo.sizes[3].url}}
                            />
                          </View>
                        );
                      }
                    })
                  )}
                </View>
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const stylesBlack = StyleSheet.create({
  gallery: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 50,
  },
  body: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  photo: {
    width: 300,
    height: 400,
    marginRight: 5,
    marginLeft: 5,
  },
  photo1: {
    width: 200,
    height: 400,
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
  name: {
    color: '#69E563',
    marginBottom: 5,
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
  },
  name1: {
    color: '#69E563',
    fontSize: 20,
    textAlign: 'center',
  },
});

const stylesWhite = StyleSheet.create({
  gallery: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 50,
  },
  body: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  photo: {
    width: 300,
    height: 400,
    marginRight: 5,
    marginLeft: 5,
  },
  photo1: {
    width: 200,
    height: 400,
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
  name: {
    color: '#CD9BFF',
    marginBottom: 5,
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
  },
  name1: {
    color: '#CD9BFF',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Userprofile;
