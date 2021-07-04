import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import moment from 'moment';
import 'moment/locale/ru';
import {
  TouchableOpacity,
} from 'react-native-gesture-handler';

const Users = ({theme, user, }) => {
  const b_date = {
    '1': 'января',
    '2': 'февраля',
    '3': 'марта',
    '4': 'апреля',
    '5': 'мая',
    '6': 'июня',
    '7': 'июля',
    '8': 'августа',
    '9': 'сентября',
    '10': 'октября',
    '11': 'ноября',
    '12': 'декабря',
  };
  const name = user.first_name + ' ' + user.last_name;
  const online = user.online ? 'онлайн' : 'не в сети';
  const ava = user.photo_max_orig;
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  };
  const now = Date.now() / 1000;
  const where = !user.last_seen ? 0 : now - user.last_seen.time;
  const UnixTime = !user.last_seen ? 0 : user.last_seen.time;
  const date_now = where / 60;
  const time = new Date(UnixTime * 1000);
  const lastseen = moment(time).format('DD MMMM YYYY, HH:mm:ss');
  moment.locale('ru');
  lastseen = moment(time).format('DD MMMM YYYY, HH:mm:ss');
  const status = !user.status ? '' : user.status;
  const str = !user.bdate ? 'Не указана' : user.bdate.split('');
  const let = '';
  if (str[2] === '.') {
    if (str[4] === '.' || !str[4]) {
      bir_date = str[3];
    } else {
      bir_date = str[3] + str[4];
    }
  } else if (str[1] === '.') {
    if (str[3] === '.') {
      bir_date = str[2];
    } else {
      bir_date = str[2] + str[3];
    }
  }
  const date_1 = b_date[bir_date];
  if (str[1] === '.') {
    var bdate = str[0] + ' ' + date_1;
  } else {
    var bdate = str[0] + str[1] + ' ' + date_1;
  }
  const sex = user.sex === 2 ? 'Мужской' : 'Женский';
  const country = !user.country ? 'Не указана' : user.country.title;
  const city = !user.city ? 'Не указан' : user.city.title;
  const tele = user.mobile_phone;
  if (!user.counters) {
    var friends = 0;
    var photo = 0;
    var video = 0;
    var pages = 0;
    var followers = 0;
  } else {
    var friends = user.counters.friends;
    var photo = user.counters.photos;
    var video = user.counters.videos;
    var pages = user.counters.pages;
    var followers = user.counters.followers;
  }
  const style = {
    height: 20,
    width: 20,
    marginRight: 0,
    float: 'none',
    marginLeft: 10,
  };
  let minCount = '';
  const last_time = null;
  const last_time_string = Math.ceil(date_now).toString();
  if (
    last_time_string[last_time_string.length - 1] == '1' &&
    Math.ceil(date_now) < 120
  ) {
    minCount = ' минуту назад';
  } else if (
    last_time_string[last_time_string.length - 1] +
      last_time_string[last_time_string.length - 2] ==
      '11' ||
    last_time_string[last_time_string.length - 1] +
      last_time_string[last_time_string.length - 2] ==
      '12' ||
    last_time_string[last_time_string.length - 1] +
      last_time_string[last_time_string.length - 2] ==
      '13' ||
    last_time_string[last_time_string.length - 1] +
      last_time_string[last_time_string.length - 2] ==
      '14'
  ) {
  } else if (
    (last_time_string[last_time_string.length - 1] == '2' ||
      last_time_string[last_time_string.length - 1] == '3' ||
      last_time_string[last_time_string.length - 1] == '4') &&
    Math.ceil(date_now) < 120
  ) {
    minCount = ' минуты назад';
  } else if (date_now < 120) {
    minCount = ' минут назад';
  }
  if (!user.online) {
    if (date_now < 60) {
      last_time = Math.ceil(date_now) + minCount;
    } else if (date_now >= 60 && date_now < 120) {
      last_time = 'час назад';
    } else if (date_now >= 120 && date_now < 180) {
      last_time = '2 часа назад';
    } else if (date_now >= 180 && date_now < 240) {
      last_time = '3 часа назад';
    } else if (date_now >= 240 && date_now < 300) {
      last_time = '4 часа назад';
    } else if (date_now >= 300 && date_now < 360) {
      last_time = '5 часов назад';
    } else if (date_now >= 360 && date_now < 420) {
      last_time = '6 часов назад';
    } else if (date_now >= 420 && date_now < 480) {
      last_time = '7 часов назад';
    } else if (date_now >= 480 && date_now < 540) {
      last_time = '8 часов назад';
    } else if (date_now >= 540 && date_now < 600) {
      last_time = '9 часов назад';
    } else if (date_now >= 600 && date_now < 660) {
      last_time = '10 часов назад';
    } else if (date_now >= 660) {
      last_time = 'более 10 часов назад';
    }
  } else {
    last_time = null;
  }
  return (
    <ScrollView vertical>
      <View style={!theme ? stylesBlack.body : stylesWhite.body}>
        <Text style={!theme ? stylesBlack.name : stylesWhite.name}>
          {name}
        </Text>
        <Text style={!theme ? stylesBlack.text1 : stylesWhite.text1}>
          {online}
        </Text>
        <Text style={!theme ? stylesBlack.text : stylesWhite.text}>
          Последний раз был(а) в сети:
        </Text>
        <Text style={!theme ? stylesBlack.text1 : stylesWhite.text1}>
          {lastseen}
        </Text>
        <Text style={!theme ? stylesBlack.text1 : stylesWhite.text1}>
          {last_time}
        </Text>
        <Text style={!theme ? stylesBlack.text : stylesWhite.text}>
          Статус: {status}
        </Text>
        <View>
          <Image
            style={!theme ? stylesBlack.img : stylesWhite.img}
            source={{uri: ava}}
            alt=""
          />
        </View>
        <View style={!theme ? stylesBlack.info : stylesWhite.info}>
          <Text style={!theme ? stylesBlack.text : stylesWhite.text}>
            Дата рождения:{' '}
          </Text>
          <Text style={!theme ? stylesBlack.text2 : stylesWhite.text2}>
            {bdate}
          </Text>
        </View>
        <View style={!theme ? stylesBlack.info : stylesWhite.info}>
          <Text style={!theme ? stylesBlack.text : stylesWhite.text}>
            Пол:{' '}
          </Text>
          <Text style={!theme ? stylesBlack.text2 : stylesWhite.text2}>
            {sex}
          </Text>
        </View>
        <View style={!theme ? stylesBlack.info : stylesWhite.info}>
          <Text style={!theme ? stylesBlack.text : stylesWhite.text}>
            Страна:{' '}
          </Text>
          <Text style={!theme ? stylesBlack.text2 : stylesWhite.text2}>
            {country}
          </Text>
        </View>
        <View style={!theme ? stylesBlack.info : stylesWhite.info}>
          <Text style={!theme ? stylesBlack.text : stylesWhite.text}>
            Город:{' '}
          </Text>
          <Text style={!theme ? stylesBlack.text2 : stylesWhite.text2}>
            {city}
          </Text>
        </View>
        <TouchableOpacity onPress={() => get_friends(user.id)}>
          <View style={!theme ? stylesBlack.info : stylesWhite.info}>
            <Text style={!theme ? stylesBlack.text : stylesWhite.text}>
              Друзья:{' '}
            </Text>
            <Text style={!theme ? stylesBlack.text2 : stylesWhite.text2}>
              {friends}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={!theme ? stylesBlack.info : stylesWhite.info}>
          <Text style={!theme ? stylesBlack.text : stylesWhite.text}>
            Телефон:{' '}
          </Text>
          <Text style={!theme ? stylesBlack.text2 : stylesWhite.text2}>
            {tele}
          </Text>
        </View>
        <View style={!theme ? stylesBlack.info : stylesWhite.info}>
          <Text style={!theme ? stylesBlack.text : stylesWhite.text}>
            Фото:{' '}
          </Text>
          <Text style={!theme ? stylesBlack.text2 : stylesWhite.text2}>
            {photo}
          </Text>
        </View>
        <View style={!theme ? stylesBlack.info : stylesWhite.info}>
          <Text style={!theme ? stylesBlack.text : stylesWhite.text}>
            Видео:{' '}
          </Text>
          <Text style={!theme ? stylesBlack.text2 : stylesWhite.text2}>
            {video}
          </Text>
        </View>
        <View style={!theme ? stylesBlack.info : stylesWhite.info}>
          <Text style={!theme ? stylesBlack.text : stylesWhite.text}>
            Подписок:{' '}
          </Text>
          <Text style={!theme ? stylesBlack.text2 : stylesWhite.text2}>
            {pages}
          </Text>
        </View>
        <View style={!theme ? stylesBlack.info : stylesWhite.info}>
          <Text style={!theme ? stylesBlack.text : stylesWhite.text}>
            Подписчиков:{' '}
          </Text>
          <Text style={!theme ? stylesBlack.text2 : stylesWhite.text2}>
            {followers}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const stylesBlack = StyleSheet.create({
  name: {
    color: '#fff',
    marginBottom: 5,
    fontSize: 30,
    textAlign: 'center',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  text: {
    color: '#fff',
    marginBottom: 5,
    fontSize: 20,
    marginLeft: 10,
  },
  text2: {
    fontSize: 20,
    color: '#69E563',
    marginRight: 10,
  },
  img: {
    width: 300,
    height: 300,
    marginBottom: 30,
    marginTop: 30,
    marginLeft: '8%',
  },
  body: {
    display: 'flex',
    marginTop: 30,
  },
  text1: {
    color: '#69E563',
    marginBottom: 5,
    fontSize: 20,
    textAlign: 'center',
  },
  image: {
    width: 10,
    height: 10,
  },
});

const stylesWhite = StyleSheet.create({
  name: {
    color: '#000',
    marginBottom: 5,
    fontSize: 30,
    textAlign: 'center',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  text: {
    color: '#000',
    marginBottom: 5,
    fontSize: 20,
    marginLeft: 10,
  },
  text2: {
    fontSize: 20,
    color: '#CD9BFF',
    marginRight: 10,
  },
  img: {
    width: 300,
    height: 300,
    marginBottom: 30,
    marginTop: 30,
    marginLeft: '8%',
  },
  body: {
    display: 'flex',
    marginTop: 30,
  },
  text1: {
    color: '#CD9BFF',
    marginBottom: 5,
    fontSize: 20,
    textAlign: 'center',
  },
  image: {
    width: 10,
    height: 10,
  },
});

export default Users;
