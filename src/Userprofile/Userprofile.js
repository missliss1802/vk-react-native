import React, {useState, useEffect} from 'react';
import Users from './../Users/Users';
import getQuery from './../../api'
import {Modal, View, StyleSheet, ActivityIndicator, Image, ScrollView, Text, Button, Alert} from 'react-native';
import { TouchableHighlight } from 'react-native';

const Userprofile = (props) => {
		let [data, setData] = useState([]);
		let [load, setLoad] = useState(false);
		let [photos, setPhotos] = useState([]);
		let [modal, setModal] = useState(false);
		let [stories, setStories] = useState([]);
		let [count, setCount] = useState(20);
		let [x, setX] = useState(4000);
		const {navigate} = props.navigation;

		useEffect(() => {
			let params_id = props.navigation.state.params;
			let method = 'users.get';
			let params = `user_ids=${params_id.user_id}&fields=is_closed,photo_max_orig,online,bdate,city,contacts,counters,country,last_seen,sex,status`;
			let token = props.token.token;
			getQuery(method, params, token).then(data => {
					// props.setUserInfo(data.response[0]);
					setData(data.response[0]);
					setLoad(true);
					console.log(data.response[0])
				})

		}, [data.id]);

		let get_friends = (id) => {
			data.is_closed ? Alert.alert('Упс!', 'У пользователя закрыт профиль, поэтому друзья скрыты.') : navigate('Друзья', {user_id: id});
		}

		useEffect(() => {
			let params_id = props.navigation.state.params;
			let method = 'photos.getAll';
			let params = `owner_id=${params_id.user_id}&count=${count}&extended=1`;
			let token = props.token.token;
			getQuery(method, params, token).then(data => {
				setPhotos(data);
				setLoad(true);
			});
			console.log(count, x)
		}, [count])

		useEffect(() => {
			let params_id = props.navigation.state.params;
			let method = 'stories.get';
			let params = `owner_id=${params_id.user_id}&count=200&extended=1`;
			let token = props.token.token;
			getQuery(method, params, token).then(data => {
				setStories(data);
				setLoad(true);
			});
		}, [data.id])
		let getPhoto = (img) => {
			!modal ? setModal(true) : setModal(false);
		}
		

		if(!props.userInfo.user_info) return <View style={[styles.container, styles.horizontal]}><ActivityIndicator size="large" color="#0000ff" /></View>;

		
	return(
		<ScrollView vertical>
		<View style={styles.body}>
			{!load 
			? <View style={[styles.container, styles.horizontal]}><ActivityIndicator size="large" color="#0000ff" /></View>
			: <View>
				<Users get_friends={get_friends} user = {data}/>
				<Text style={styles.name}>Фотографии:</Text>
				<ScrollView horizontal 
				onScroll={(e) => {
					console.log(e.nativeEvent.contentOffset.x)
					if (e.nativeEvent.contentOffset.x > x) {
						setCount(count + 20);
						setX(x + 5000);
					}
				}}>
			  		<View style={styles.gallery}>
						{!photos.response 
							? <Text style={styles.name1}>скрыты</Text> 
							: photos.response.items.map((item) => {if (item.sizes[4]) { 
																		return <View key={item.id} >
																				<Image style={styles.photo} source={{uri: item.sizes[4].url}}/>
																			</View>}})}
			  		</View>
				</ScrollView>
			</View>}
		</View>
		</ScrollView>
			
)
}

const styles = StyleSheet.create({
	modal: {
		backgroundColor: 'black',
		justifyContent: 'center',
		width: '100%',
		height: '100%'
	},
	gallery: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 30,
		marginBottom: 50,
	},
  body: {
	  backgroundColor: 'black',
	  width: '100%',
	  height: '100%'
  },
  photo: {
	  width: 300,
	  height: 400,
	  marginRight: 5,
	  marginLeft: 5
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  name: {
	color: '#69E563',
	marginBottom: 5,
	fontSize: 30,
	textAlign: 'center',
	marginTop: 20
},
name1: {
	color: '#69E563',
	fontSize: 20,
	textAlign: 'center'
}
})

export default Userprofile;