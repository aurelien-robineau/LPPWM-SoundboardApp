import { configureStore } from '@reduxjs/toolkit'

import samplersReducer from './samplersSlice'

const store = configureStore({
	reducer: {
		samplers: samplersReducer
	}
})

export default store