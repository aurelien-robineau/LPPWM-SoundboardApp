import React, { useState } from 'react'
import { View, FlatList } from 'react-native'

import SoundCard from './SoundCard'

const SoundList = ({ sounds, selectedItem, onChange, style }) => {
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
		<View style={style}>
			<FlatList
				data={sounds}
				renderItem={renderSound}
				keyExtractor={item => item.id}
			/>
		</View>
	)
}

export default SoundList