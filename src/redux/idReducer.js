const SET_ID = 'SET_ID';

let initialState = {
	id: ''
}

const idReducer = (state = initialState, action) => {
	// debugger
	switch (action.type) {
		case SET_ID: {
			return {...state, id: action.id};
		}

		default:
			return state;
	}
}

export const setIdAC = (id) => ({type: SET_ID, id});

export default idReducer;