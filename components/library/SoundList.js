import React from 'react'
import { SafeAreaView, FlatList, View, Text } from 'react-native'

import SoundCard from './SoundCard'

const SoundList = ({ sounds }) => {
	const renderSound = ({ item }) => {
		return (
			<SoundCard sound={item} />
		)
	}

	return (
		<SafeAreaView>
			<FlatList
				data={sounds}
				renderItem={renderSound}
				keyExtractor={item => item.id}
			/>
		</SafeAreaView>
	)
}

export default SoundList