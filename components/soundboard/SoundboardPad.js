import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Audio } from 'expo-av'

import { colors } from '../../constants/pads'

const padLightImage = require('../../assets/img/pad_light.png')

/**
 * Pad of a soundboardard
 * @param {number} size - Size in px of the pad (height and width)
 * @param {string} color - color of the pad
 * @param {{}} soundInfos - infos on the pad sound
 * @param {Array|null} crop - crop sound data
 * @param {Function} onEdit - callback on pad edited
 */
const SoundboardPad = ({ size, color, soundInfos, crop, onEdit }) => {
	const [playback, setPlayback] = useState(null)

	useEffect(() => {
		_loadSound()
	}, [soundInfos])

	useEffect(() => _unloadSound, [playback])

	/**
	 * Load and init the sound file to get ready to play
	 */
	const _loadSound = async () => {
		_unloadSound()
		try {
			if (soundInfos) {
				const { sound: playback } = await Audio.Sound.createAsync({
					uri: soundInfos.uri },
					null,
					(status) => _onPlaybackStatusUpdate(status, playback, crop)
				)

				playback.setProgressUpdateIntervalAsync(100)
				setPlayback(playback)
			}
		} catch (e) {
			setPlayback(null)
		}
	}

	/**
	 * Unload the sound
	 */
	const _unloadSound = () => {
		if (playback) {
			playback.unloadAsync()
		}
	}

	/**
	 * Play the sound with crop
	 */
	const _playSound = async () => {
		if (playback) {
			playback.setPositionAsync(crop ? crop[0] : 0)
			playback.playAsync()
		}
	}

	/**
	 * Callback when playback status updates
	 * @param {{}} status - new playback status
	 * @param {{}} playback - current playback
	 * @param {{}} crop - how to crop the sound
	 */
	const _onPlaybackStatusUpdate = (status, playback, crop) => {
		if (crop && status.positionMillis >= crop[1]) {
			try {
				playback.stopAsync()
			} catch (e) {}
		}
	}

	return (
		<TouchableOpacity
			onPress={_playSound}
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

export default SoundboardPad