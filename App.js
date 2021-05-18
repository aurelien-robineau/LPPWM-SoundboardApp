import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import MainNavigator from './navigators/MainNavigator'

import config from './config'

export default function App() {
	return (
		<>
		<StatusBar backgroundColor={config.colors.main} barStyle='light-content' />
		<NavigationContainer>
			<MainNavigator />
		</NavigationContainer>
		</>
	)
}