import { useReducer } from 'react'
import settingsReducer, { settingsInitialState } from './settingsReducer'

const useCombinedReducers = () => {

	const combinedReducers = {
		settings: useReducer(settingsReducer, settingsInitialState),
	}

	// Global State
	const state = Object.keys(combinedReducers).reduce(
		(acc, key) => ({ ...acc, [`${key}`]: combinedReducers[`${key}`][0] }), {});

	// Global Dispatch Function
	const dispatch = action =>
		Object.keys(combinedReducers)
			.map(key => combinedReducers[`${key}`][1])
			.forEach(fn => fn(action));

	return [state, dispatch];
}

export default useCombinedReducers;