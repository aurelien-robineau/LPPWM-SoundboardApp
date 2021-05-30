import React, { useState } from 'react'
import { StyleSheet, View, Text, Pressable, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { Audio } from 'expo-av'

import config from '../../config'

const audioWaves = require('../../assets/img/audio-waves.gif')

const Recorder = ({ onRecordEnd }) => {
	const [recording, setRecording] = useState(false)
	const [record, setRecord] = useState(null)

	async function startRecording() {
		try {
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true,
			})

			const recording = new Audio.Recording()
			await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
			await recording.startAsync()

			setRecord(recording)
			setRecording(true)
		} catch (err) {}
	}

	async function stopRecording() {
		setRecord(null)
		setRecording(false)

		await record.stopAndUnloadAsync()
		const status = await record.getStatusAsync()
		const uri = record.getURI()

		if (onRecordEnd) onRecordEnd({ durationMillis: status.durationMillis, uri })
	}

	return (
		<View style={[styles.container, recording && styles.recordingContainer]}>
			<Pressable
				style={styles.iconWrapper}
				onPressIn={startRecording}
				onPressOut={stopRecording}
			>
				<Icon name="mic" size={32} color="white" />
			</Pressable>
			<Text style={styles.text}>
				{ recording ? 'Relâcher pour arrêter' : 'Maintenir pour enregistrer' }
			</Text>
			{ recording &&
				<Image
					source={audioWaves}
					style={styles.audioGif}
					resizeMode="contain"
				/>
			}
		</View>
	)
}

const styles =  StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10
	},

	recordingContainer: {
		backgroundColor: config.colors.primary,
		borderRadius: 50
	},

	iconWrapper: {
		padding: 5,
		borderColor: 'white',
		borderWidth: 2,
		borderRadius: 40
	},

	text: {
		fontSize: 18,
		color: 'white',
		marginLeft: 10,
		flex: 2
	},

	audioGif: {
		height: 30,
		flex: 1
	}
})

export default Recorder