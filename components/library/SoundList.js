import React, { useState } from 'react'
import { SafeAreaView, FlatList } from 'react-native'

import SoundCard from './SoundCard'

const SoundList = ({ sounds, selectedItem, onChange }) => {
	const [selectedSound, setSelectedSound] = useState(selectedItem)

	const renderSound = ({ item }) => {
		return (
			<SoundCard
				sound={item}
				selected={item.id === selectedSound}
				onChange={checked => {
					if (checked) {
						setSelectedSound(item.id)
						if (onChange) onChange(item.id)
					}
				}}
			/>
		)
	}

	return (
		<SafeAreaView style={{ height: 500 }}>
			<FlatList
				data={sounds}
				renderItem={renderSound}
				keyExtractor={item => item.id}
			/>
		</SafeAreaView>
	)
}

export default SoundList