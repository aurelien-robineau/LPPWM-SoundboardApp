import { createStore } from 'redux'

import initialState from './default'

const reducer = (state = initialState, action) => {
	return state
}

const store = createStore(reducer)

store.subscribe(() => {
	console.log(store.getState())
})

export default store