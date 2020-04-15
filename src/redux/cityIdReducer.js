const SET_CITY_ID = 'SET_CITY_ID';

let initialState = {
	city_id: ''
}

const cityIdReducer = (state = initialState, action) => {
	// debugger
	switch (action.type) {
		case SET_CITY_ID: {
			return {...state, city_id: action.city_id};
		}

		default:
			return state;
	}
}

export const setCityIdAC = (city_id) => ({type: SET_CITY_ID, city_id});

export default cityIdReducer;