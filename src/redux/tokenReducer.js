const SET_TOKEN = 'SET_TOKEN';

let initialState = {
	token: ''
}

const tokenReducer = (state = initialState, action) => {
	// debugger
	switch (action.type) {
		case SET_TOKEN: {
			return {...state, token: action.token};
		}

		default:
			return state;
	}
}

export const setTokenAC = (token) => ({type: SET_TOKEN, token});

export default tokenReducer;