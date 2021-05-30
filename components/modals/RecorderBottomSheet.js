import React, { useState, useEffect, forwardRef } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Audio } from 'expo-av'

import Recorder from '../../components/library/Recorder'

import config from '../../config'
import { formatAudioDuration } from '../../utils'

const component = forwardRef((props, ref) => {
	const [record, setRecord] = useState(null)
	const [sound, setSound] = useState(null)
	const [isPlaying, setIsPlaying] = useState(false)

	useEffect(() => unloadSound, [sound])

	const loadRecord = async (record) => {
		setRecord(record)

		await unloadSound()

		try {
			const { sound: playback } = await Audio.Sound.createAsync(
				{ uri: record.uri },
				{},
				onPlaybackStatusUpdate
			)

			setSound(playback)
		} catch (e) {
			setSound(null)
		}
	}

	const unloadSound = async () => {
		if (sound)
			await sound.unloadAsync()
	}

	const toggleSound = async () => {
		if (isPlaying) {
			sound.pauseAsync()
		} else {
			sound.replayAsync()
		}
	}

	const onPlaybackStatusUpdate = (status) => {
		setIsPlaying(status.isPlaying)
	}

	return (
		<RBSheet
			ref={ref}
			height={Dimensions.get('window').height * 0.3}
			closeOnDragDown={true}
			closeOnPressMask={true}
			openDuration={250}
			customStyles={{
				container: {
					backgroundColor: config.colors.main,
				}
			}}
		>
			<View style={styles.bottomSheetContainer}>
				{ record ?
					<View style={styles.recordPlayer}>
						<TouchableOpacity onPress={toggleSound}>
							<Icon name={isPlaying ? 'stop' : 'play-arrow'} size={42} color="white" />
						</TouchableOpacity>
						<Text style={styles.recordPlayerText}>{ formatAudioDuration(record.durationMillis) }</Text>
					</View>
				:
					<Recorder onRecordEnd={loadRecord} />
				}
			</View>
		</RBSheet>
	)
})

const styles = StyleSheet.create({
	bottomSheetContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 20,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		height: '85%'
	},

	recordPlayer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},

	recordPlayerText: {
		fontSize: 18,
		color: "white",
		marginLeft: 10
	}
})

export default component