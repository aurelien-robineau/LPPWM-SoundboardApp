import React from 'react'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'

import MainNavigator from './navigators/MainNavigator'

import config from './config'
import store from './store/index'

export default function App() {
	return (
		<Provider store={store}>
			<StatusBar backgroundColor={config.colors.main} barStyle='light-content' />
			<NavigationContainer>
				<MainNavigator />
			</NavigationContainer>
		</Provider>
	)
}