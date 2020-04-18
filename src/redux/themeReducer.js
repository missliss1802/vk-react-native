const SET_THEME = 'SET_THEME';

let initialState = {
	theme: false
}

const themeReducer = (state = initialState, action) => {
	// debugger
	switch (action.type) {
		case SET_THEME: {
			return {...state, theme: action.theme};
		}

		default:
			return state;
	}
}

export const setThemeAC = (theme) => ({type: SET_THEME, theme});

export default themeReducer;