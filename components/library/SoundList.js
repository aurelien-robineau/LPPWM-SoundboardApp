import React from 'react'
import { View, FlatList } from 'react-native'

import SoundCard from './SoundCard'

const SoundList = ({ sounds, loadFrom, isInput, selectedItem, onChange, onEndReached, refreshing, style }) => {
	const renderSound = ({ item }) => {
		return (
			<SoundCard
				soundId={item.id.toString()}
				loadFrom={loadFrom}
				isSelectable={isInput}
				selected={item.id === selectedItem}
				onChange={checked => {
					if (checked) {
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
				keyExtractor={item => item.id.toString()}
				onEndReached={onEndReached}
				onEndReachedThreshold={0.3}
				refreshing={refreshing}
			/>
		</View>
	)
}

export default SoundList