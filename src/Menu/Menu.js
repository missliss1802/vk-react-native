import React, {useState} from 'react';
import { TextInput, Text, View, StyleSheet, TouchableHighlight, Button } from 'react-native';

const Menu = (props) => {
	debugger
	let [hide, setHide] = useState(false)
	let showMenu = () => {
		hide == false ? setHide(true) : setHide(false);
    }
	return (
		<View>
			<View style={props.display}>
				<TouchableHighlight style={styles.button}>
					<Button onPress={showMenu} color='#5F92DD' title='Поиск по городу &#9660;'></Button>
				</TouchableHighlight>
			</View>
			{hide && <View>
				<TextInput style={styles.input} id="input" placeholder ="Страна" type="text" name=""/>
				<TextInput style={styles.input} id="input" placeholder ="Город" type="text" name=""/>
			</View>}
		</View>
		)
}

const styles = StyleSheet.create({
	body: {
		display: 'flex',
		alignContent: 'center'
	},
	text: {
		backgroundColor: '#5F92DD',
		textAlign: 'center',
		marginRight: 50,
		marginLeft: 50,
		marginTop: 25,
		padding: 5,
		fontSize: 20,
		color: '#fff'
	},
	input: {
		backgroundColor: '#fff',
		marginBottom: 10
	},
	button: {
		backgroundColor: '#5F92DD',
		marginLeft: 30,
		marginRight: 30,
		marginTop: 20,
		height: 30,
		marginBottom: 20
	}
})

export default Menu;