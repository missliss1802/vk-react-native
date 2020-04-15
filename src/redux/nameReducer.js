const SET_NAME = 'SET_NAME';

let initialState = {
	name: ''
}

const nameReducer = (state = initialState, action) => {
	// debugger
	switch (action.type) {
		case SET_NAME: {
			return {...state, name: action.name};
		}

		default:
			return state;
	}
}

export const setNameAC = (name) => ({type: SET_NAME, name});

export default nameReducer;