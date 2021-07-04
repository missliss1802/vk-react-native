import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import City from './../City/City';
import getQuery from './../../api';
import {getToken} from '../helpers/loginHelpers';

const Data = ({
  setUsers,
  setCityname,
  setCityId,
  setHideCity,
  name,
  country_id,
  city,
  setCities,
  hideCity,
  theme,
  cities,
}) => {
  const token = getToken();
  const [data, setData] = useState([]);
  const cityLoad = (city, id) => {
    setCityname(city);
    setHideCity(false);
    setCityId(id);
    userSearch(id);
  };

  const userSearch = id => {
    const method = 'users.search';
    const params = `q=${name.name}&country=${
      country_id.country_id
    }&city=${id}&count=50&fields=photo_100,first_name,last_name,city,country`;
    getQuery(method, params, token).then(_data => {
      setUsers(_data.response.items);
      setData(_data.response.items);
    });
  };

  useEffect(() => {
    const method = 'database.getCities';
    const params = `q=${city.city}&country_id=${country_id.country_id}`;
    getQuery(method, params, token).then(_data => {
      setCities(_data.response.items);
      setData(_data.response.items);
    });
  }, [data.count, city.city]);
  return (
    <ScrollView style={{height: hideCity ? '70%' : 0}}>
      {hideCity &&
        cities.cities.map(item => {
          return (
            <City
              theme={theme}
              cityLoad={cityLoad}
              key={item.id}
              id={item.id}
              city={item.title}
            />
          );
        })}
    </ScrollView>
  );
};

export default Data;
