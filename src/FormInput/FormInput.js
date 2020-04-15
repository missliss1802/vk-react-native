import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native'

const FormInput = (props) => {
	return (
		<View>
			<TextInput style={styles.input} placeholderTextColor={'#aaa'} 
					onChangeText={props.searchName} onBlur={props.userSearch} 
					value={props.name.name} placeholder ="Введите имя"/>
		</View>
		)
}

const styles = StyleSheet.create({
    input: {
	backgroundColor: '#000',
    fontSize: 25,
    color: '#fff',
    paddingLeft: 10,
    borderColor: '#aaa',
    borderBottomWidth: 1
	}
})

export default FormInput