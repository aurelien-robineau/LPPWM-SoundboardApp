import React from 'react'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { PersistGate } from 'redux-persist/integration/react'

import MainNavigator from './navigators/MainNavigator'

import config from './config'
import store, { persistor } from './store/index'

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<StatusBar backgroundColor={config.colors.dark} barStyle='light-content' />
				<NavigationContainer>
					<MainNavigator />
				</NavigationContainer>
			</PersistGate>
		</Provider>
	)
}