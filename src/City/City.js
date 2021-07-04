import React from 'react';
import {View, TouchableHighlight, Text, StyleSheet} from 'react-native';

const City = ({city, id, theme, cityLoad}) => {
  return (
    <View>
      <TouchableHighlight>
        <Text
          title={city}
          id={id}
          onPress={() => {
            cityLoad(city, id);
          }}
          type="button"
          style={!theme ? stylesBlack.city : stylesWhite.city}>
          {city}
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const stylesBlack = StyleSheet.create({
  city: {
    backgroundColor: '#000',
    marginLeft: 80,
    marginRight: 80,
    marginTop: 5,
    height: 30,
    marginBottom: 5,
    textAlign: 'center',
    color: '#fff',
    fontSize: 17,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#aaa',
  },
});

const stylesWhite = StyleSheet.create({
  city: {
    backgroundColor: '#fff',
    marginLeft: 80,
    marginRight: 80,
    marginTop: 5,
    height: 30,
    marginBottom: 5,
    textAlign: 'center',
    color: '#000',
    fontSize: 17,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#aaa',
  },
});

export default City;
