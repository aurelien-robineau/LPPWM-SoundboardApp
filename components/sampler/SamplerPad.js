import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Audio } from 'expo-av'

import { colors } from '../../constants/pads'

const padLightImage = require('../../assets/img/pad_light.png')

const SamplerPad = ({ size, color, soundInfos, crop, onEdit }) => {
	const [playback, setPlayback] = useState(null)

	useEffect(() => {
		loadSound()
	}, [soundInfos])

	useEffect(() => unloadSound, [playback])

	const loadSound = async () => {
		unloadSound()
		try {
			if (soundInfos) {
				const { sound: playback } = await Audio.Sound.createAsync({
					uri: soundInfos.uri },
					null,
					_onPlaybackStatusUpdate
				)
				setPlayback(playback)
			}
		} catch (e) {
			setPlayback(null)
		}
	}

	const unloadSound = () => {
		if (playback) {
			playback.unloadAsync()
		}
	}

	const playSound = async () => {
		if (playback) {
			if (crop) {
				playback.setPositionAsync(crop[0])
				playback.playAsync()
			}
			else {
				playback.replayAsync()
			}
		}
	}

	const _onPlaybackStatusUpdate = (status) => {
		if (crop && status.positionMillis >= crop[1]) {
			try {
				playback.pauseAsync()
			} catch (e) {}
		}
	}

	return (
		<TouchableOpacity
			onPress={playSound}
			onLongPress={() => onEdit ? onEdit() : null}
			activeOpacity={playback ? 0.5 : 1}
		>
			<View style={[styles.pad, { width: size, height: size, backgroundColor: playback ? colors[color] : colors.off }]}>
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