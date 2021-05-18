import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Audio } from 'expo-av'

import { colors } from '../constants/pads';

const padLightImage = require('../assets/img/pad_light.png')

const SamplerPad = ({ size, color, soundFile }) => {
	const [sound, setSound] = useState(null)

	useEffect(() => {
		return () => {
			if (sound) {
				sound.unloadAsync()
			}
		};
	}, [sound])

	const playSound = async () => {
		if (soundFile) {
			const { sound } = await Audio.Sound.createAsync(soundFile)
			setSound(sound)
			sound.playAsync()
		}
	}

	return (
		<TouchableOpacity onPress={playSound} activeOpacity={soundFile ? 0.8 : 1}>
			<View style={[styles.pad, { width: size, height: size, backgroundColor: soundFile ? color : colors.off }]}>
				<Image source={padLightImage} style={styles.lightImage} />
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	pad: {
		borderRadius: 5,
		elevation: 5,
	},

	lightImage: {
		width: '100%',
		height: '100%',
		opacity: 0.2,
		borderRadius: 5
	}
})

export default SamplerPad