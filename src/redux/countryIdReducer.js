const SET_COUNTRY_ID = 'SET_COUNTRY_ID';

let initialState = {
	country_id: 1
}

const countryIdReducer = (state = initialState, action) => {
	// debugger
	switch (action.type) {
		case SET_COUNTRY_ID: {
			return {...state, country_id: action.country_id};
		}

		default:
			return state;
	}
}

export const setCountryIdAC = (country_id) => ({type: SET_COUNTRY_ID, country_id});

export default countryIdReducer;