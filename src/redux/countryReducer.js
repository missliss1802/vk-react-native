const SET_COUNTRY = 'SET_COUNTRY';

let initialState = {
	country: ''
}

const countryReducer = (state = initialState, action) => {
	// debugger
	switch (action.type) {
		case SET_COUNTRY: {
			return {...state, country: action.country};
		}

		default:
			return state;
	}
}

export const setCountryAC = (country) => ({type: SET_COUNTRY, country});

export default countryReducer;