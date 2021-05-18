import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import MainNavigator from './navigators/MainNavigator';

const Stack = createStackNavigator()

export default function App() {
	return (
		<NavigationContainer>
			<MainNavigator />
		</NavigationContainer>
	)
}