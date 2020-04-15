const SET_CITY = 'SET_CITY';

let initialState = {
	city: ''
}

const cityReducer = (state = initialState, action) => {
	// debugger
	switch (action.type) {
		case SET_CITY: {
			return {...state, city: action.city};
		}

		default:
			return state;
	}
}

export const setCityAC = (city) => ({type: SET_CITY, city});

export default cityReducer;