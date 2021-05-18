import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import TabNavigator from './TabNavigator'

const Stack = createStackNavigator()

const MainNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={TabNavigator} options={{ title: 'Soundboard App' }}/>
		</Stack.Navigator>
	)
}

export default MainNavigator