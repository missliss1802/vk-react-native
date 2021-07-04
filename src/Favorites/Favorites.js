import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Favorites = ({navigate, theme}) => {
  const [keys, setKeys] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getAllKeysAsyncData();
  }, [keys.count]);

  const getAllKeysAsyncData = async () => {
    await AsyncStorage.getAllKeys((err, res) => {
      if (err) {
        Alert.alert(err);
        return;
      }
      setKeys(res.filter(el => el !== 'myId'));
      setLoad(true);
    });
  };

  const getKey = async key => {
    await AsyncStorage.getItem(key, (err, res) => {
      if (err) {
        throw err;
      }
      const id = JSON.parse(res);
      navigate('Пользователь', {user_id: id.id});
    });
  };

  const deleteKey = key => {
    Alert.alert('', 'Удалить?', [
      {text: 'Отмена', onPress: () => console.log('отмена')},
      {
        text: 'Ок',
        onPress: () => {
          AsyncStorage.removeItem(key),
            err => {
              if (err) {
                throw err;
              }
            };
          getAllKeysAsyncData();
        },
      },
    ]);
  };

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={true}
        style={!theme ? stylesBlack.wrap : stylesWhite.wrap}>
        {load &&
          keys.map((elem, ind) => {
            return (
              <TouchableOpacity
                key={ind}
                onLongPress={() => deleteKey(elem)}
                onPress={() => getKey(elem)}>
                <Text style={!theme ? stylesBlack.name : stylesWhite.name}>
                  {elem}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};
export default Favorites;

const stylesBlack = StyleSheet.create({
  name: {
    padding: 8,
    fontSize: 15,
    backgroundColor: '#000',
    marginTop: 5,
    marginLeft: 30,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 5,
    color: '#fff',
    width: Dimensions.get('window').width / 2,
    zIndex: 1,
  },
  wrap: {
    position: 'absolute',
    zIndex: 1,
    height: Dimensions.get('window').height / 3.8,
    width: Dimensions.get('window').width / 1.5,
  },
});

const stylesWhite = StyleSheet.create({
  name: {
    padding: 8,
    fontSize: 15,
    backgroundColor: '#fff',
    marginTop: 5,
    marginLeft: 30,
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 5,
    color: '#000',
    width: Dimensions.get('window').width / 2,
    zIndex: 1,
  },
  wrap: {
    position: 'absolute',
    zIndex: 1,
    height: Dimensions.get('window').height / 3.8,
    width: Dimensions.get('window').width / 1.5,
  },
});
