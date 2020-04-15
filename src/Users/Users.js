import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import moment from 'moment';
import 'moment/locale/ru'
import { TouchableHighlight } from 'react-native-gesture-handler';

const Users = (props) => {
	//debugger;
	let b_date = {"1": "января",
	"2": "февраля",
	"3": "марта",
	"4": "апреля",
	"5": "мая",
	"6": "июня",
	"7": "июля",
	"8": "августа",
	"9": "сентября",
	"10": "октября",
	"11": "ноября",
	"12": "декабря",}
	let name = props.user.first_name + " " + props.user.last_name;
	let online = props.user.online ? 'онлайн' : 'не в сети';
	let ava = props.user.photo_max_orig;
	const options = {
			 year: 'numeric',
			 month: 'long',
			 day: 'numeric',
			 hour: 'numeric',
			 minute: 'numeric',
			 second: 'numeric',
			 hour12: false
			}
	let now = Date.now() / 1000;
	let where = !props.user.last_seen ? 0 : (now - props.user.last_seen.time);
	let UnixTime = !props.user.last_seen ? 0 :props.user.last_seen.time;
	let date_now = where / 60;
	let time = new Date(UnixTime*1000);
	let lastseen = moment(time).format('DD MMMM YYYY, HH:mm:ss');
	moment.locale('ru');
	lastseen = moment(time).format('DD MMMM YYYY, HH:mm:ss');
	let status = !props.user.status ? '' : props.user.status;
	let str = !props.user.bdate ? "Не указана" : props.user.bdate.split("");
	let bir_date = "";
	if (str[2] === ".") {
		if ((str[4] === ".") || !str[4]) {
			bir_date =  str[3];
		} else {
			bir_date = str[3] + str[4];
		}
	} else if (str[1] === ".") {
		if (str[3] === ".") {
			bir_date =  str[2];
		} else {
			bir_date = str[2] + str[3];
		}
	}
	let date_1 = b_date[bir_date];
	if (str[1] === ".") {
		var bdate = str[0] + " " + date_1;
	} else {
		var bdate = str[0] + str[1] + " " + date_1;
	}
	let sex = props.user.sex === 2 ? 'Мужской' : 'Женский';
	let country = !props.user.country ? "Не указана" : props.user.country.title;
	let city = !props.user.city ? "Не указан" : props.user.city.title;
	let tele = props.user.mobile_phone;
	if(!props.user.counters) {
		var friends = 0;
		var photo = 0;
		var video = 0;
		var pages = 0;
		var followers = 0;
	} else {
		var friends = props.user.counters.friends;
		var photo = props.user.counters.photos;
		var video = props.user.counters.videos;
		var pages = props.user.counters.pages;
		var followers = props.user.counters.followers;
	}
	let style = {
		height: 20,
		width: 20,
		marginRight: 0,
		float: 'none',
		marginLeft: 10
	}
	let minCount = '';
	let last_time = null;
	let last_time_string = Math.ceil(date_now).toString();
	if ((last_time_string[last_time_string.length - 1] == '1') && (Math.ceil(date_now) < 120)) {
		minCount = ' минуту назад'
	} else if ((last_time_string[last_time_string.length - 1] == '2'
			|| last_time_string[last_time_string.length - 1] == '3'
			|| last_time_string[last_time_string.length - 1] == '4') && (Math.ceil(date_now) < 120)) {
		minCount = ' минуты назад'
	} else if (date_now < 120) {
		minCount = ' минут назад'
	}
	if (!props.user.online) {
		if (date_now < 60) {
			last_time = Math.ceil(date_now) + minCount;
		} else if ((date_now >= 60) && (date_now < 120)){
			last_time = 'час назад';
		} else if ((date_now >= 120) && (date_now < 180)){
			last_time = '2 часа назад';
		} else if ((date_now >= 180) && (date_now < 240)){
			last_time = '3 часа назад';
		} else if ((date_now >= 240) && (date_now < 300)){
			last_time = '4 часа назад';
		} else if ((date_now >= 300) && (date_now < 360)){
			last_time = '5 часов назад';
		} else if ((date_now >= 360) && (date_now < 420)){
			last_time = '6 часов назад';
		} else if ((date_now >= 420) && (date_now < 480)){
			last_time = '7 часов назад';
		} else if ((date_now >= 480) && (date_now < 540)){
			last_time = '8 часов назад';
		} else if ((date_now >= 540) && (date_now < 600)){
			last_time = '9 часов назад';
		} else if ((date_now >= 600) && (date_now < 660)){
			last_time = '10 часов назад';
		} else if (date_now >= 660){
			last_time = 'более 10 часов назад';
		}
	} else {
		last_time = null;
	}
	return (
		<ScrollView vertical>
			<View style={styles.body}>
				<Text style={styles.name}>{ name }</Text>
				<Text style={styles.text1}>{ online }</Text>
				<Text style={styles.text}>Последний раз был(а) в сети:</Text>
				<Text style={styles.text1}>{lastseen}</Text>
				<Text style={styles.text1}>{last_time}</Text>
				<Text style={styles.text}>Статус: { status }</Text>
				<View >
					<Image style={styles.img} source={{uri: ava}} alt=""/>
				</View>
				<View style={styles.info}>
					<Text style={styles.text}>Дата рождения: </Text>
					<Text style={styles.text2}>{ bdate }</Text>
				</View>
				<View style={styles.info}>
					<Text style={styles.text}>Пол: </Text>
					<Text style={styles.text2}>{ sex }</Text>
				</View>
				<View style={styles.info}>
					<Text style={styles.text}>Страна: </Text>
					<Text style={styles.text2}>{ country }</Text>
				</View>
				<View style={styles.info}>
					<Text style={styles.text}>Город: </Text>
					<Text style={styles.text2}>{ city }</Text></View>
				<TouchableHighlight onPress={() => props.get_friends(props.user.id)}>
					<View style={styles.info}>
						<Text style={styles.text}>Друзья: </Text>
						<Text style={styles.text2}>{ friends }</Text>
					</View>
				</TouchableHighlight>
				<View style={styles.info}>
					<Text style={styles.text}>Телефон: </Text>
					<Text style={styles.text2}>{ tele }</Text>
				</View>
				<View style={styles.info}>
					<Text style={styles.text}>Фото: </Text>
					<Text style={styles.text2}>{ photo }</Text>
				</View>
				<View style={styles.info}>
					<Text style={styles.text}>Видео: </Text>
					<Text style={styles.text2}>{ video }</Text>
				</View>
				<View style={styles.info}>
					<Text style={styles.text}>Подписок: </Text>
					<Text style={styles.text2}>{ pages }</Text>
				</View>
				<View style={styles.info}>
					<Text style={styles.text}>Подписчиков: </Text>
					<Text style={styles.text2}>{ followers }</Text>
				</View>
			</View>
		</ScrollView>
		)
}

const styles = StyleSheet.create({
	name: {
		color: 'white',
		marginBottom: 5,
		fontSize: 30,
		textAlign: 'center'
	},
	info: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 10
	},
	text: {
		color: 'white',
		marginBottom: 5,
		fontSize: 20,
		marginLeft: 10,
	},
	text2: {
		fontSize: 20,
		color: '#69E563',
		marginRight: 10
	},
	img: {
		width: 300,
		height: 300,
		marginBottom: 30,
		marginTop: 30,
		marginLeft: '8%'
	},
	body: {
		display: "flex",
		marginTop: 30
	},
	text1: {
		color: '#69E563',
		marginBottom: 5,
		fontSize: 20,
		textAlign: 'center'
	},
	image: {
		width: 10,
		height: 10
	}
})

export default Users;