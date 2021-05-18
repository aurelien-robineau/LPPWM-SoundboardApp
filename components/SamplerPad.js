import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Audio } from 'expo-av'

import { colors } from '../constants/pads';

const padLightImage = require('../assets/img/pad_light.png')

const SamplerPad = ({ size, color, soundFile, onEdit }) => {
	const [sound, setSound] = useState(null)

	useEffect(() => {
		loadSound()
	}, [soundFile])

	useEffect(() => unloadSound, [sound])

	const loadSound = async () => {
		unloadSound()
		if (soundFile) {
			const { sound } = await Audio.Sound.createAsync(soundFile)
			setSound(sound)
		}
	}

	const unloadSound = () => {
		if (sound) {
			sound.unloadAsync()
		}
	}

	const playSound = async () => {
		if (sound) {
			sound.replayAsync()
		}
	}

	return (
		<TouchableOpacity
			onPress={playSound}
			onLongPress={() => onEdit ? onEdit() : null}
			activeOpacity={sound ? 0.5 : 1}
		>
			<View style={[styles.pad, { width: size, height: size, backgroundColor: sound ? colors[color] : colors.off }]}>
				<Image source={padLightImage} style={styles.lightImage} />
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	pad: {
		borderRadius: 5,
		borderColor: 'black',
		borderWidth: 1
	},

	lightImage: {
		width: '100%',
		height: '100%',
		opacity: 0.2,
		borderRadius: 5
	}
})

export default SamplerPad