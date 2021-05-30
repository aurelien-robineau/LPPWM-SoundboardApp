import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Pressable, ActivityIndicator } from 'react-native'
import { Icon } from 'react-native-elements'
import { Audio } from 'expo-av'

import config from '../../config'

const SoundCard = ({ sound, isSelectable, selected, onChange }) => {
	const [playback, setPlayback] = useState(null)
	const [playbackStatus, setPlaybackStatus] = useState(null)
	const [playing, setPlaying] = useState(false)
	const [loadingStatus, setLoadingStatus] = useState('loading')
	
	useEffect(() => {
		loadSound()
	}, [])

	useEffect(() => {
		if (playback) {
			playback.unloadAsync()
		}
	})

	const toggleSound = () => {
		if (playback) {
			if (playing)
				playback.replayAsync()
			else
				playback.pauseAsync()

			setPlaying(!playing)
		}
	}

	const loadSound = async () => {
		console.log('load sound ' + sound.id)
		try {
			const { sound: playback, status: playbackStatus} = await Audio.Sound.createAsync(sound.file, {
				isLooping: false
			}, onPlaybackStatusUpdate)
			setPlayback(playback)
			setPlaybackStatus(playbackStatus)
		} catch(e) {
			setLoadingStatus('error')
		}
	}

	const onPlaybackStatusUpdate = (status) => {
		// console.log(sound.id, status)
		console.log(sound.id + " status updated, " + (status.isLoaded ? "loaded" : 'not loaded'))
		if (status.isLoaded)
			setLoadingStatus('loaded')
		else
			setLoadingStatus('error')
	}

	const formatDuration = (durationInMillis) => {
		let durationInSeconds = durationInMillis / 1000
		let seconds = Math.floor(durationInSeconds)
		let millis = (durationInSeconds - seconds) * 1000

		if (seconds < 60)
			return `${seconds}sec ${millis.toFixed(0)}ms`
		
		let minutes = Math.floor(seconds / 60)
		seconds = seconds - minutes * 60

		return `${minutes}min ${seconds}sec ${millis.toFixed(0)}ms` 

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
					<Text style={styles.duration}>{ formatDuration(playbackStatus.durationMillis) }</Text>
				</View>
				{ loadingStatus === 'loading' &&
					<ActivityIndicator size="small" color="#ffffff" />
				}

				{ loadingStatus === 'loaded' &&
					<Pressable onPress={toggleSound}>
						<Icon
							name={playing ? 'pause' : 'play-arrow'}
							size={34}
							color="white"
						/>
					</Pressable>
				}

				{ loadingStatus === 'error' &&
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