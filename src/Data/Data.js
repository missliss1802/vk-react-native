import React, {useState, useEffect} from 'react'
import {ScrollView} from 'react-native'
import City from './../City/City'
import getQuery from './../../api'

const Data = (props) => {
    let [data, setData] = useState([]);
    let cityLoad = (city, id) => {
      props.setCityname(city);
      props.setHideCity(false);
      props.setCityId(id);
      userSearch(id);
    }
  
    let userSearch = (id) => {
      let method = 'users.search';
      let params = `q=${props.name.name}&country=${props.country_id.country_id}&city=${id}&count=50&fields=photo_100,first_name,last_name,city,country`;
      let token = props.token.token;
          getQuery(method, params, token).then(data => {
              props.setUsers(data.response.items);
              setData(data.response.items);
          })
    }
  
    useEffect(() => {
        let method = 'database.getCities';
        let params = `q=${props.city.city}&country_id=${props.country_id.country_id}`;
        let token = props.token.token;
          getQuery(method, params, token).then(data => {
            props.setCities(data.response.items);
            setData(data.response.items);
          })
    }, [data.count, props.city.city]);
    return (
      <ScrollView style={{height: props.hideCity ? '70%' : 0}}>
        {props.hideCity && props.cities.cities.map((item) => {
          return <City theme={props.theme} cityLoad={cityLoad} key={item.id} id={item.id} city={item.title} />
        })}
      </ScrollView>
    )
  }

export default Data