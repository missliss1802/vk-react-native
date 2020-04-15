import React from 'react'
import {View, TouchableHighlight, Text, StyleSheet} from 'react-native'

const City = (props) => {
	return (
    <View>
      <TouchableHighlight >
        <Text title={props.city} id={props.id} 
            onPress={() => {props.cityLoad(props.city, props.id)}} 
            type='button' style={styles.city}>{props.city}
        </Text>
      </TouchableHighlight>
	</View>)
}

const styles = StyleSheet.create({
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
        borderColor: '#aaa'
      },
})

export default City