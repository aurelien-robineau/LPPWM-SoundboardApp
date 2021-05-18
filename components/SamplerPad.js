import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Audio } from 'expo-av'

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
		const { sound } = await Audio.Sound.createAsync(soundFile)
		setSound(sound)
		sound.playAsync()
	}

	return (
		<TouchableOpacity onPress={playSound}>
			<View style={[styles.pad, { width: size, height: size, backgroundColor: color }]}>
				<Image source={padLightImage} style={styles.lightImage} />
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	pad: {
		borderRadius: 5,
		shadowColor: 'black',
		shadowOpacity: 100,
		elevation: 10,
	},

	lightImage: {
		width: '100%',
		height: '100%',
		opacity: 0.3,
		borderRadius: 5
	}
})

export default SamplerPad