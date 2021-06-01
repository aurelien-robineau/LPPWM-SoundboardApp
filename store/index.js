import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import samplersReducer from './samplersSlice'
import libraryReducer from './librarySlice'

const libraryPersistConfig = {
	key: 'library',
	version: 1,
	storage: AsyncStorage,
	stateReconciler: hardSet,
}


const samplersPersistConfig = {
	key: 'samplers',
	version: 1,
	storage: AsyncStorage,
	stateReconciler: hardSet,
}

const persistedLibraryReducer = persistReducer(libraryPersistConfig, libraryReducer)
const persistedSamplersReducer = persistReducer(samplersPersistConfig, samplersReducer)

const store = configureStore({
	reducer: {
		library: persistedLibraryReducer,
		samplers: persistedSamplersReducer
	},
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
})

export const persistor = persistStore(store)

export default store