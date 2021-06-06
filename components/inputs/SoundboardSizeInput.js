import React, { useState } from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'

import config from '../../config'
import { soundboardSizes } from '../../constants/soundboards'

/**
 * Find the current selected size from soundboard dimensions
 * @param {*} dimensions - soundboard dimensions
 * @returns {{}} the current size
 */
const findSizeFromDimensions = (dimensions) => {
	return soundboardSizes.find(size => 
		size.numberOfRows === dimensions.numberOfRows && size.numberOfColumns === dimensions.numberOfColumns
	)
}

/**
 * Input to select a soundboard size
 * @param {{}} dimensions - current soundboard dimensions
 * @param {Function} onChange - function to execute when the selected size changes
 */
const SoundboardSizeInput = ({ dimensions, onChange }) => {
	const [selected, setSelected] = useState(findSizeFromDimensions(dimensions))

	const onSizePress = (size) => {
		setSelected(size)
		if (onChange) onChange(size)
	}

	return (
		<View style={styles.sizeContainer}>
			{ soundboardSizes.map(size => (
				<TouchableOpacity key={size.name} activeOpacity={1} onPress={() => onSizePress(size)}>
					<View
						style={[
							styles.sizeCard, {
								opacity: selected === size ? 1 : 0.5,
								borderWidth: selected === size ? 2 : 0
							}
						]}
					>
						<Image
							source={size.image}
							style={styles.sizeImage}
							resizeMode="contain"
						/>
					</View>
				</TouchableOpacity>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	sizeContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around'
	},

	sizeCard: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: config.colors.text,
		borderRadius: 3,
		height: 130,
		width: 130,
		padding: 20
	},

	sizeImage: {
		height: '100%',
	}
})

export default SoundboardSizeInput