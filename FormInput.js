import React from 'react';
import { View, TextInput, StyleSheet, Button, TouchableHighlight } from 'react-native';

const FormInput = (props) => {
	return (
		<View>
			<TextInput style={styles.input1} onChangeText={props.searchName} value={props.name.name} placeholder ="Введите имя"/>
			<TouchableHighlight onClick={props.userSearch} style={styles.input2}>
				<Button color='#5F92DD' title='Найти'></Button>
			</TouchableHighlight>
		</View>
		)
}

const styles = StyleSheet.create({
	input1: {
		backgroundColor: 'white',
		fontSize: 30,
		marginTop: 20
	},
	input2: {
		backgroundColor: '#5F92DD',
		marginLeft: 30,
		marginRight: 30,
		marginTop: 20,
		height: 30
	}
})

export default FormInput;