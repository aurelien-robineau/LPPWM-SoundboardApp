import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { Audio } from 'expo-av'

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

			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	pad: {

	}
})

export default SamplerPad