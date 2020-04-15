const SET_CITIES = 'SET_CITIES';

let initialState = {
	cities: []
}

const citiesReducer = (state = initialState, action) => {
	// debugger
	switch (action.type) {
		case SET_CITIES: {
			return {...state, cities: action.cities};
		}

		default:
			return state;
	}
}

export const setCitiesAC = (cities) => ({type: SET_CITIES, cities});

export default citiesReducer;