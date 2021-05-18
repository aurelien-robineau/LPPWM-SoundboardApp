import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Image, useWindowDimensions, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

import config from '../../config'

const padLightImage = require('../../assets/img/pad_light.png')

const ColorInput = ({ items, value, onChange }) => {
	const screenWidth = useWindowDimensions().width

	const [color, setColor] = useState(value)
	const [colors, setColors] = useState(colors)

	useEffect(() => {
		setColor(value)
	}, [value])

	useEffect(() => {
		setColors(items)
	}, [items])

	const getSquareDimensions = () => {
		const size = screenWidth / 4 - 15
		const space = ((screenWidth - size * 4) - 40) / 3

		return { size, space }
	}

	const onColorPress = (color) => {
		setColor(color)
		if (typeof onChange === 'function')
			onChange(color)
	}

	return (
		<View style={styles.colorsContainer}>
			{ colors && Object.keys(colors).map(key => (
				<TouchableOpacity key={key} activeOpacity={1} onPress={() => onColorPress(key)}>
					<View
						style={[
							styles.colorSquare, {
								height: getSquareDimensions().size,
								width: getSquareDimensions().size,
								marginBottom: getSquareDimensions().space,
								borderWidth: color === key ? 3 : 0,
								backgroundColor: colors[key]
							}
						]}
					>
						{ color === key &&
							<Icon name="done" size={15} color={config.colors.main} style={styles.selectedIcon}/>
						}
						<Image source={padLightImage} style={styles.lightImage} />
					</View>
				</TouchableOpacity>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	colorsContainer: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between'
	},

	selectedIcon: {
		backgroundColor: 'white',
		padding: 5,
		borderRadius: 15
	},

	colorSquare: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: 'white',
		borderRadius: 3,
		width: '100%',
		height: '100%'
	},

	lightImage: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		opacity: 0.2,
		borderRadius: 3
	}
})

export default ColorInput