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
import { ActivityIndicator } from 'react-native'

/**
 * Modal to display a sound infos and to play it
 * @param {boolean} isVisible - is the modal oppened
 * @param {string} soundId - id of the sound to show
 * @param {'local'|'freesound'} loadFrom - from where to load data (phone
 * storage or freesound api)
 * @param {Function} onClose - function to execute when the modal is closed
 */
const SoundInfoModal = ({ isVisible, soundId, loadFrom, onClose }) => {
	const dispatch = useDispatch()
	const sounds = useSelector(state => state.library.sounds)

	const [sound, setSound] = useState(null)
	const [playback, setPlayback] = useState(null)
	const [playbackStatus, setPlaybackStatus] = useState(null)

	const [isDownloading, setIsDownloading] = useState(false)
	const [isDownloaded, setIsDownloaded] = useState(false)

	useEffect(() => {
		_loadSoundInfos()
	}, [soundId, loadFrom])

	useEffect(() => {
		if (isVisible) {
			_loadPlayback()
		} else if (playbackStatus?.isPlaying) {
			playback.stopAsync()
		}

		return () => {
			_unloadPlayback()
		}
	}, [isVisible])

	/**
	 * Load the sound infos from the sound id.
	 * Sound is loaded from redux if loadFrom is 'local', or from the freesound
	 * api if loadFrom is 'freesound'
	 */
	const _loadSoundInfos = async () => {
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

	/**
	 * Load the sound to get it ready to play
	 */
	const _loadPlayback = async () => {
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

	/**
	 * Unload the sound
	 */
	const _unloadPlayback = () => {
		if (playback) {
			playback.unloadAsync()
		}
	}

	/**
	 * Play the sound if not playing, stop if playing
	 */
	const _toggleSound = async () => {
		if (playback) {
			if (playbackStatus?.isPlaying) {
				playback.stopAsync()
			} else {
				playback.replayAsync()
			}
		}
	}

	/**
	 * Function to execute when the playback status updates
	 * @param {{}} status - new playback status
	 */
	const _onPlaybackStatusUpdate = (status) => {
		setPlaybackStatus(status)
	}

	/**
	 * Delete a sound from the library and delete the file from the phone.
	 */
	const _deleteSound = () => {
		if (sound) {
			dispatch(libraryActions.removeSound({
				id: soundId
			}))

			FileSystem.deleteAsync(sound.uri, {
				idempotent: true
			})

			// Close the modal after sound is deleted
			if (onClose) onClose()
		}
	}

	/**
	 * Download a sound from freesound api
	 */
	const _downloadSound = () => {
		if (sound) {
			// Get a unnique id for the sound
			const soundId = uuid.v4()

			// Build the uri where to store the file
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
							<Icon name="close" size={30} color={config.colors.text} />
						</TouchableOpacity>
					</View>
					<Text style={styles.title}>{ sound.name }</Text>
					<Text style={styles.type}>{ loadFrom === 'local' ? types[sound.type] : types.freesound }</Text>

					{ playback && playbackStatus &&
						<View style={styles.audioPlayer}>
							<TouchableOpacity onPress={_toggleSound}>
								<Icon name={playbackStatus.isPlaying ? 'stop' : 'play-arrow' } size={56} color={config.colors.text} />
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
								<Icon name="delete" size={26} color={config.colors.text} />
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
									? <ActivityIndicator size="small" color={config.colors.text} />
									: isDownloaded
										? <Icon name="check" size={26} color={config.colors.text} />
										: <Icon name="file-download" size={26} color={config.colors.text} />
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
		backgroundColor: config.colors.dark,
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
		color: config.colors.text,
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
		color: config.colors.text,
		fontSize: 16,
		marginLeft: 10
	}
})

export default SoundInfoModal