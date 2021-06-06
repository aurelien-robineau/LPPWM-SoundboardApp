import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import soundboardsReducer from './soundboardsSlice'
import libraryReducer from './librarySlice'

const libraryPersistConfig = {
	key: 'library',
	version: 1,
	storage: AsyncStorage,
	stateReconciler: hardSet,
}


const soundboardsPersistConfig = {
	key: 'soundboards',
	version: 1,
	storage: AsyncStorage,
	stateReconciler: hardSet,
}

const persistedLibraryReducer = persistReducer(libraryPersistConfig, libraryReducer)
const persistedSoundboardsReducer = persistReducer(soundboardsPersistConfig, soundboardsReducer)

const store = configureStore({
	reducer: {
		library: persistedLibraryReducer,
		soundboards: persistedSoundboardsReducer
	},
	middleware: getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		},
	}),
})

export const persistor = persistStore(store)

export default store