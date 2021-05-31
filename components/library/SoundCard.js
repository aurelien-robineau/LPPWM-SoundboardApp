import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Pressable, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements'
import { Audio } from 'expo-av'

import config from '../../config'
import { formatAudioDuration } from '../../utils'

const SoundCard = ({ sound, isSelectable, selected, onChange }) => {
	const [playback, setPlayback] = useState(null)
	const [playbackStatus, setPlaybackStatus] = useState(null)
	
	useEffect(() => {
		loadSound()
	}, [])

	useEffect(() => {
		unloadSound()
	})

	const toggleSound = () => {
		if (playback) {
			if (playbackStatus.isPlaying)
				playback.replayAsync()
			else
				playback.pauseAsync()
		}
	}

	const loadSound = async () => {
		
		try {
			await unloadSound()

			const { sound: playback, status: playbackStatus} = await Audio.Sound.createAsync(
				{ uri: sound.uri },
				{ isLooping: false },
				onPlaybackStatusUpdate
			)

			setPlayback(playback)
			setPlaybackStatus(playbackStatus)
		} catch(e) {
			setLoadingStatus('error')
		}
	}

	const unloadSound = async () => {
		if (playback)
			await playback.unloadAsync()
	}

	const onPlaybackStatusUpdate = (status) => {
		setPlaybackStatus(status)
	}

	return playback && playbackStatus && (
		<Pressable onPress={() => onChange(!selected)}>
			<View style={styles.card}>
				{ isSelectable &&
					<View style={[
						styles.selectorIndicator,
						selected ? styles.indicatorOn : styles.indicatorOff
					]}>
						{ selected &&
							<Icon
								name="done"
								size={18}
								color="#ffffff"
							/>
						}
					</View>
				}
				<View style={[styles.infosContainer, { marginLeft: isSelectable ? 20 : 0 }]}>
					<Text style={styles.name}>{ sound.name }</Text>
					{ playbackStatus.isLoaded &&
						<Text style={styles.duration}>{ formatAudioDuration(playbackStatus.durationMillis) }</Text>
					}
				</View>
				{ playbackStatus === null &&
					<ActivityIndicator size="small" color="#ffffff" />
				}

				{ playbackStatus && playbackStatus.isLoaded &&
					<Pressable onPress={toggleSound}>
						<Icon
							name={playbackStatus.isPlaying ? 'pause' : 'play-arrow'}
							size={34}
							color="white"
						/>
					</Pressable>
				}

				{ playbackStatus && !playbackStatus.isLoaded &&
					<Icon
						name="error"
						size={34}
						color="white"
					/>
				}
			</View>
      </Pressable>
	)
}

const styles = StyleSheet.create({
	card: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 20,
		backgroundColor: '#454545',
		marginBottom: 5,
		borderRadius: 2
	},

	selectorIndicator: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 24,
		height: 24,
		borderRadius: 12
	},

	indicatorOff: {
		borderWidth: 2,
		borderColor: 'white',
	},

	indicatorOn: {
		backgroundColor: config.colors.primary
	},

	infosContainer: {
		flex: 1
	},

	name: {
		color: 'white',
		fontSize: 16,
	},

	duration: {
		color: '#dddddd',
		fontSize: 14,
	}
})

export default SoundCard