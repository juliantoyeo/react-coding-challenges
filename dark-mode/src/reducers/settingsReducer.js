export const SETTING_ACTIONS = {
	CHANGE_THEME: 'change_theme'
}

export const settingsInitialState = {
	darkMode: false,
}

const reducer = (state, action) => {
	switch(action.type){
	case SETTING_ACTIONS.CHANGE_THEME:
		return { ...state, darkMode: action.darkMode }
	default:
		return state
	}
}

export default reducer