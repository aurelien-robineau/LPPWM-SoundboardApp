import React, { useState } from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'

import config from '../../config'

const samplerSizes = [{
		name: '3x3',
		numberOfRows: 3,
		numberOfColumns: 3,
		image: require('../../assets/img/sampler_3x3.png')
	}, {
		name: '3x4',
		numberOfRows: 4,
		numberOfColumns: 3,
		image: require('../../assets/img/sampler_3x4.png')
	}, {
		name: '2x2',
		numberOfRows: 2,
		numberOfColumns: 2,
		image: require('../../assets/img/sampler_2x2.png')
	}, {
		name: '1x1',
		numberOfRows: 1,
		numberOfColumns: 1,
		image: require('../../assets/img/sampler_1x1.png')
	}
]

const findSizeFromDimensions = (dimensions) => {
	return samplerSizes.find(size => 
		size.numberOfRows === dimensions.numberOfRows && size.numberOfColumns === dimensions.numberOfColumns
	)
}

const SamplerSizeInput = ({ dimensions, onChange }) => {
	const [selected, setSelected] = useState(findSizeFromDimensions(dimensions))

	const onSizePress = (size) => {
		setSelected(size)
		if (onChange) onChange(size)
	}

	return (
		<View style={styles.sizeContainer}>
			{ samplerSizes.map(size => (
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

export default SamplerSizeInput