import React, { useState, useEffect } from 'react'
import { StyleSheet, Modal, View, Dimensions, Pressable, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux'
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system'
import uuid from 'react-native-uuid'

import config from '../../config'
import { types } from '../../constants/sounds'
import { formatAudioDuration, getFileExtension } from '../../utils'
import { libraryActions } from '../../store/librarySlice'
import { isLoading } from 'expo-font'
import { ActivityIndicator } from 'react-native'

const SoundInfoModal = ({ isVisible, soundId, loadFrom, onClose }) => {
	const dispatch = useDispatch()
	const sounds = useSelector(state => state.library.sounds)

	const [sound, setSound] = useState(null)
	const [playback, setPlayback] = useState(null)
	const [playbackStatus, setPlaybackStatus] = useState(null)

	const [isDownloading, setIsDownloading] = useState(false)
	const [isDownloaded, setIsDownloaded] = useState(false)

	useEffect(() => {
		loadSoundInfos()
	}, [soundId, loadFrom])

	useEffect(() => {
		if (isVisible) {
			loadPlayback()
		} else if (playbackStatus?.isPlaying) {
			playback.pauseAsync()
		}

		return () => {
			unloadPlayback()
		}
	}, [isVisible])

	const loadSoundInfos = async () => {
		if (loadFrom === 'local') {
			setSound(sounds.find(s => s.id === soundId))
		}
		else if (loadFrom === 'freesound') {
			FreeSoundApi.getSoundInfos(soundId)
			.then(async (response) => {
				const data = await response.json()
				setSound({
					name: data.name,
					uri: data.previews['preview-hq-mp3']
				})
			})
			.catch(error => {})
		}
	}

	const loadPlayback = async () => {
		if (sound) {
			try {
				const { sound: playback, status: playbackStatus } = await Audio.Sound.createAsync({
					uri: sound.uri
				}, {}, _onPlaybackStatusUpdate)

				setPlayback(playback)
				setPlaybackStatus(playbackStatus)
			} catch (e) {
				setPlayback(null)
				setPlaybackStatus(null)
			}
		}
	}

	const unloadPlayback = () => {
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

	const _deleteSound = () => {
		if (sound) {
			dispatch(libraryActions.removeSound({
				id: soundId
			}))

			FileSystem.deleteAsync(sound.uri, {
				idempotent: true
			})

			if (onClose) onClose()
		}
	}

	const _downloadSound = () => {
		if (sound) {
			const soundId = uuid.v4()
			const soundUri = `${FileSystem.documentDirectory}${soundId}.${getFileExtension(sound.uri)}`
			setIsDownloading(true)
			FileSystem.downloadAsync(sound.uri, soundUri)
				.then(({ uri }) => {
					dispatch(libraryActions.addSound({
						id: soundId,
						type: 'downloaded',
						name: sound.name,
						uri: uri
					}))

					setIsDownloading(false)
					setIsDownloaded(true)
				})
				.catch(error => {
					setIsDownloading(false)
					setIsDownloaded(false)
				});
		}
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
						<View style={styles.audioPlayer}>
							<TouchableOpacity onPress={toggleSound}>
								<Icon name={playbackStatus.isPlaying ? 'stop' : 'play-arrow' } size={56} color="white" />
							</TouchableOpacity>
							<Text style={styles.duration}>{ formatAudioDuration(playbackStatus.durationMillis) }</Text>
						</View>
					}

					<View style={styles.controlsContainer}>
						{ loadFrom === 'local' && sound.type !== 'default' &&
							<TouchableOpacity
								style={[styles.button, { backgroundColor: '#ff4747' }]}
								onPress={_deleteSound}
							>
								<Icon name="delete" size={26} color="white" />
								<Text style={styles.buttonText}>Supprimer</Text>
							</TouchableOpacity>
						}

						{ loadFrom === 'freesound' &&
							<TouchableOpacity
								style={[styles.button, { backgroundColor: config.colors.primary }]}
								onPress={() => isDownloaded ? null : _downloadSound()}
								activeOpacity={isDownloaded ? 1 : 0.2}
							>
								{ isDownloading
									? <ActivityIndicator size="small" color="white" />
									: isDownloaded
										? <Icon name="check" size={26} color="white" />
										: <Icon name="file-download" size={26} color="white" />
								}
								<Text style={styles.buttonText}>{ isDownloaded ? 'Téléchargé' : 'Télécharger' }</Text>
							</TouchableOpacity>
						}
					</View>
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
		marginTop: 20,
		flex: 1
	},

	duration: {
		fontSize: 16,
		color: '#dddddd',
		textAlign: 'center'
	},

	controlsContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},

	button: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 50,
		width: '100%',
		marginTop: 10
	},

	buttonText: {
		color: 'white',
		fontSize: 16,
		marginLeft: 10
	}
})

export default SoundInfoModal