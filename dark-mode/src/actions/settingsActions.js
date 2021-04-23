import { SETTING_ACTIONS } from '../reducers/settingsReducer'

export const changeTheme = (darkMode) => {
	if (darkMode)
		document.body.classList.add('dark-mode');
	else
		document.body.classList.remove('dark-mode');
	return {
		type: SETTING_ACTIONS.CHANGE_THEME,
		darkMode
	}
}