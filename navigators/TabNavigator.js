import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import SamplerScreen from '../screens/SamplerScreen'
import LibraryScreen from '../screens/LibraryScreen'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused }) => {
					let iconName;

					if (route.name === 'Sampler') {
						iconName = 'play-arrow'
					}
					else if (route.name === 'Library') {
						iconName = 'library-music'
					}

					return <Icon name={iconName} size={30} color={focused ? 'black' : 'gray'} />;
				}
			})}
			tabBarOptions={{
				activeTintColor: 'black',
				inactiveTintColor: 'gray'
			}}
		>
			<Tab.Screen name="Sampler" component={SamplerScreen} options={{ title : 'Sampler' }} />
			<Tab.Screen name="Library" component={LibraryScreen} options={{ title : 'Bibliothèque' }} />
		</Tab.Navigator>
	)
}

export default TabNavigator