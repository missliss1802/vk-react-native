const SET_USER_INFO = 'SET_USER_INFO';

let initialState = {
	user_info: []
}

const userInfoReducer = (state = initialState, action) => {
	// debugger
	switch (action.type) {
		case SET_USER_INFO: {
			return {...state, user_info: action.user_info};
		}

		default:
			return state;
	}
}

export const setUserInfoAC = (user_info) => ({type: SET_USER_INFO, user_info});

export default userInfoReducer;