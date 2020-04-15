const SET_FRIENDS = 'SET_FRIENDS';

let initialState = {
	friends: []
}

const nameReducer = (state = initialState, action) => {
	// debugger
	switch (action.type) {
		case SET_FRIENDS: {
			return {...state, friends: action.friends};
		}

		default:
			return state;
	}
}

export const setFriendsAC = (friends) => ({type: SET_FRIENDS, friends});

export default nameReducer;