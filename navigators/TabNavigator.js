import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { Icon } from 'react-native-elements'

import SoundboardScreen from '../screens/SoundboardScreen'
import LibraryScreen from '../screens/LibraryScreen'

import config from '../config';

const Tab = createMaterialBottomTabNavigator()

const TabNavigator = () => {
  return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused }) => {
					let iconName;

					if (route.name === 'Soundboard') {
						iconName = 'apps'
					}
					else if (route.name === 'Library') {
						iconName = 'library-music'
					}

					return (
						<Icon
							name={iconName}
							size={25}
							color={focused ? config.colors.text : 'gray'}
						/>
					)
				}
			})}
			barStyle={{ backgroundColor: config.colors.dark }}
			activeColor={config.colors.text}
  			inactiveColor="gray"
		>
			<Tab.Screen name="Soundboard" component={SoundboardScreen} options={{ title : 'Pad' }} />
			<Tab.Screen name="Library" component={LibraryScreen} options={{ title : 'Bibliothèque' }} />
		</Tab.Navigator>
	)
}

export default TabNavigator