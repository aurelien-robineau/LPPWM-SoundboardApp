import { configureStore } from '@reduxjs/toolkit'

import samplersReducer from './samplersSlice'
import libraryReducer from './librarySlice'

const store = configureStore({
	reducer: {
		samplers: samplersReducer,
		library: libraryReducer
	}
})

export default store