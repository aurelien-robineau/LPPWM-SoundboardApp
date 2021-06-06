import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import config from '../../config'

/**
 * Card to select the active soundboard
 * @param {string} name - name if the soundboard
 * @param {boolean} selected - is this soundboard selected
 * @param {Function} onPress - function to execute on press
 * @param {Function} onLongPress - function to execute on long press
 * @returns 
 */
const SoundboardCard = ({ name, selected, onPress, onLongPress }) => {
	return (
		<TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
			<View style={[styles.card, selected ? styles.selected : null]}>
				<Text style={styles.name}>{ name }</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	card: {
		paddingVertical: 30,
		paddingHorizontal: 40,
		backgroundColor: config.colors.dark,
		borderRadius: 5
	},

	selected: {
		backgroundColor: '#616161'
	},

	name: {
		color: config.colors.text,
		fontSize: 32
	}
})

export default SoundboardCard