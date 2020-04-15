import {connect} from 'react-redux';
import Search from './../Search/Search';
import {setNameAC} from './../redux/nameReducer'
import {setUsersAC} from './../redux/usersReducer'
import {setCountryAC} from './../redux/countryReducer'
import {setCountryIdAC} from './../redux/countryIdReducer'
import {setCityAC} from './../redux/cityReducer'
import {setCityIdAC} from './../redux/cityIdReducer'
import {setIdAC} from './../redux/idReducer'
import {setCitiesAC} from './../redux/citiesReducer'
import {setUserInfoAC} from './../redux/userInfoReducer'

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    setName: (name) => {
    	dispatch(setNameAC(name));
    },
    setUsers: (users) => {
    	dispatch(setUsersAC(users));
    },
    setCountry: (country) => {
    	dispatch(setCountryAC(country));
    },
    setCountryId: (country_id) => {
    	dispatch(setCountryIdAC(country_id));
    },
    setCity: (city) => {
    	dispatch(setCityAC(city));
    },
    setCities: (cities) => {
    	dispatch(setCitiesAC(cities));
    },
    setCityId: (city_id) => {
    	dispatch(setCityIdAC(city_id));
    },
    setId: (city_id) => {
    	dispatch(setIdAC(city_id));
    },
    setUserInfo: (user_info) => {
    	dispatch(setUserInfoAC(user_info));
    }
  }
}

const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(Search);

export default SearchContainer;