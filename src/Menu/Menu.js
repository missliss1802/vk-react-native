import React from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

const Menu = ({
  display,
  showMenu,
  theme,
  hide,
  getCountry,
  getCountryId,
  cityName,
  getCity,
}) => {
  return (
    <View>
      <View style={display}>
        <TouchableHighlight
          onPress={showMenu}
          style={!theme ? stylesBlack.button : stylesWhite.button}>
          <Text style={!theme ? stylesBlack.butText : stylesWhite.butText}>
            Поиск по городу &#9660;
          </Text>
        </TouchableHighlight>
      </View>
      {hide && (
        <View>
          <TextInput
            style={!theme ? stylesBlack.input : stylesWhite.input}
            placeholderTextColor={'#aaa'}
            onChangeText={getCountry}
            onBlur={getCountryId}
            id="input"
            placeholder="Страна"
            type="text"
            name=""
          />
          <TextInput
            style={!theme ? stylesBlack.input : stylesWhite.input}
            placeholderTextColor={'#aaa'}
            onChangeText={getCity}
            value={cityName}
            placeholder="Город"
            type="text"
            name=""
          />
        </View>
      )}
    </View>
  );
};

const stylesBlack = StyleSheet.create({
  input: {
    backgroundColor: '#000',
    marginBottom: 10,
    color: '#fff',
    paddingLeft: 10,
    borderColor: '#aaa',
    borderBottomWidth: 1,
    marginHorizontal: 15,
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
    alignItems: 'center',
  },
  butText: {
    color: '#fff',
    paddingTop: 5,
    fontSize: 18,
  },
});

const stylesWhite = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    marginBottom: 10,
    color: '#000',
    paddingLeft: 10,
    borderColor: '#aaa',
    borderBottomWidth: 1,
    marginHorizontal: 15,
  },
  button: {
    backgroundColor: '#fff',
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    height: 30,
    marginBottom: 20,
    borderColor: '#aaa',
    borderWidth: 1,
    paddingBottom: 40,
    borderRadius: 5,
    alignItems: 'center',
  },
  butText: {
    color: '#000',
    paddingTop: 5,
    fontSize: 18,
  },
});

export default Menu;
