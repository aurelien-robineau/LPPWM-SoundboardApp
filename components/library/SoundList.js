import React from 'react'
import { View, FlatList } from 'react-native'

import SoundCard from './SoundCard'

/**
 * 
 * @param {Array} sounds - sounds of the list
 * @param {'local'|'freesound'} loadFrom - from where the sound is loaded
 * @param {boolean} isInput - is the list an input
 * @param {string} selectedItem - currently selected sound id
 * @param {Function} onChange - function to execute when the selected sound changes
 * @param {Function} onEndReached - function to execute when scrolling at the
 * bottom of the list
 * @param {boolean} refreshing - is the sound list refreshing
 * @param {{}} style - style of the list
 */
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