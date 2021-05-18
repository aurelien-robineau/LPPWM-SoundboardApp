import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import TabNavigator from './TabNavigator'

import config from '../config';

const Stack = createStackNavigator()

const MainNavigator = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={TabNavigator} options={{
				title: 'Soundboard App',
				headerStyle: {
            		backgroundColor: config.colors.main,
          		},
				headerTintColor: config.colors.text
			}}/>
		</Stack.Navigator>
	)
}

export default MainNavigator