import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { Icon } from 'react-native-elements'
import { Audio } from 'expo-av'

const SoundCard = ({ sound, selected, onChange }) => {
	const [playback, setPlayback] = useState(null)
	const [playbackStatus, setPlaybackStatus] = useState(null)
	const [playing, setPlaying] = useState(false)
	
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
		const playback = new Audio.Sound()
		const playbackStatus = await playback.loadAsync(sound.file)
		
		setPlayback(playback)
		setPlaybackStatus(playbackStatus)
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
				<View style={styles.infosContainer}>
					<Text style={styles.name}>{ sound.name }</Text>
					<Text style={styles.duration}>{ formatDuration(playbackStatus.durationMillis) }</Text>
				</View>
				<Pressable onPress={toggleSound}>
					<Icon
						name={playing ? 'pause' : 'play-arrow'}
						size={34}
						color="white"
					/>
				</Pressable>
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
		backgroundColor: '#1ca4ff'
	},

	infosContainer: {
		marginLeft: 20,
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