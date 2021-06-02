import React, { useState, useEffect } from 'react'
import { StyleSheet, Modal, View, Dimensions, Pressable, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { Audio } from 'expo-av'

import config from '../../config'
import { types } from '../../constants/sounds'
import { formatAudioDuration } from '../../utils'

const SoundInfoModal = ({ isVisible, soundId, loadFrom, onClose }) => {
	const [sound, setSound] = useState(null)
	const [playback, setPlayback] = useState(null)
	const [playbackStatus, setPlaybackStatus] = useState(null)

	const sounds = useSelector(state => state.library.sounds)

	useEffect(() => {
		loadSound()
		return () => {
			unloadSound()
		}
	}, [soundId, loadFrom])

	const loadSound = async () => {
		let sound = null
		if (loadFrom === 'local')
			sound = sounds.find(s => s.id === soundId)

		setSound(sound)

		if (sound) {
			try {
				const { sound: playback, status: playbackStatus } = await Audio.Sound.createAsync({
					uri: sound.uri
				}, {}, _onPlaybackStatusUpdate)
				setPlayback(playback)
				setPlaybackStatus(playbackStatus)
			} catch (e) {
				console.warn(e)
				setPlayback(null)
				setPlaybackStatus(null)
			}
		}
	}

	const unloadSound = () => {
		if (playback) {
			playback.unloadAsync()
		}
	}

	const toggleSound = async () => {
		if (playback) {
			if (playbackStatus?.isPlaying) {
				playback.pauseAsync()
			} else {
				playback.replayAsync()
			}
		}
	}

	const _onPlaybackStatusUpdate = (status) => {
		setPlaybackStatus(status)
	}

	return sound && (
		<Modal
			animationType="fade"
			visible={isVisible}
			onRequestClose={onClose ? onClose : null}
			transparent={true}
		>
			<Pressable style={styles.backdrop} onPress={onClose}></Pressable>
			<View style={styles.container}>
				<View style={styles.body}>
					<View style={styles.header}>
						<TouchableOpacity onPress={onClose}>
							<Icon name="close" size={30} color="white" />
						</TouchableOpacity>
					</View>
					<Text style={styles.title}>{ sound.name }</Text>
					<Text style={styles.type}>{ loadFrom === 'local' ? types[sound.type] : types.freesound }</Text>

					{ playback && playbackStatus &&
						<>
							<TouchableOpacity onPress={toggleSound} style={styles.audioPlayer}>
								<Icon name={playbackStatus.isPlaying ? 'stop' : 'play-arrow' } size={56} color="white" />
							</TouchableOpacity>
							<Text style={styles.duration}>{ formatAudioDuration(playbackStatus.durationMillis) }</Text>
						</>
					}
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	backdrop: {
		position: 'absolute',
		backgroundColor: 'black',
		opacity: 0.25,
		height: '100%',
		width: '100%'
	},

	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%'
	}, 

	body: {
		backgroundColor: config.colors.main,
		height: Dimensions.get('window').height * 0.4,
		width: Dimensions.get('window').width * 0.85,
		borderRadius: 5,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		padding: 20
	},

	header: {
		display: 'flex',
		alignItems:'flex-end'
	},

	title: {
		fontSize: 20,
		color: 'white',
		textAlign: 'center'
	},

	type: {
		fontSize: 16,
		color: '#dddddd',
		textAlign: 'center'
	},

	audioPlayer: {
		marginTop: 20
	},

	duration: {
		fontSize: 16,
		color: '#dddddd',
		textAlign: 'center'
	}
})

export default SoundInfoModal