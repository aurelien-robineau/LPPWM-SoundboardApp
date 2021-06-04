import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, TextInput } from 'react-native'
import { Icon } from 'react-native-elements'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Audio } from 'expo-av'

import Recorder from '../../components/library/Recorder'

import config from '../../config'
import { formatAudioDuration } from '../../utils'

const RecorderBottomSheet = ({ isOpen, onSave, onClose, onOpen }) => {
	const [record, setRecord] = useState(null)
	const [sound, setSound] = useState(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [recordName, setRecordName] = useState('Titre')

	const refRBSheet = useRef()

	useEffect(() => unloadSound, [sound])

	useEffect(() => {
		if (isOpen) {
			refRBSheet.current.open()
		} else {
			refRBSheet.current.close()
		}
	}, [isOpen])

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
			sound.stopAsync()
		} else {
			sound.replayAsync()
		}
	}

	const onPlaybackStatusUpdate = (status) => {
		setIsPlaying(status.isPlaying)
	}

	const resetModal = async () => {
		setRecord(null)
		setSound(null)
		setIsPlaying(false)
		setRecordName('Titre')
		await unloadSound()
	}

	const onSavePressed = () => {
		if (onSave)
			onSave(record.uri, recordName)

		resetModal()
	}

	return (
		<RBSheet
			ref={refRBSheet}
			height={Dimensions.get('window').height * 0.3}
			closeOnDragDown={true}
			closeOnPressMask={true}
			openDuration={250}
			onClose={onClose}
			onOpen={onOpen}
			customStyles={{
				container: {
					backgroundColor: config.colors.main,
				}
			}}
		>
			<View style={styles.bottomSheetContainer}>
				{ record ?
					<>
						<TextInput
							value={recordName}
							onChangeText={setRecordName}
							style={styles.recordNameInput}
						/>
						<View style={styles.recordPlayer}>
							<TouchableOpacity onPress={toggleSound}>
								<Icon name={isPlaying ? 'stop' : 'play-arrow'} size={42} color="white" />
							</TouchableOpacity>
							<Text style={styles.recordPlayerText}>{ formatAudioDuration(record.durationMillis) }</Text>
						</View>
						<View style={styles.actionsContainer}>
							<TouchableOpacity style={styles.actionButton} onPress={resetModal}>
								<Icon name="delete" size={26} color="white" />
								<Text style={styles.actionButtonText}>Supprimer</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.actionButton} onPress={onSavePressed}>
								<Icon name="save" size={26} color="white" />
								<Text style={styles.actionButtonText}>Enregistrer</Text>
							</TouchableOpacity>
						</View>
					</>
				:
					<Recorder onRecordEnd={loadRecord} />
				}
			</View>
		</RBSheet>
	)
}

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
		alignItems: 'center',
		marginLeft: -15
	},

	recordPlayerText: {
		fontSize: 18,
		color: "white",
		marginLeft: 10
	},

	recordNameInput: {
		color: 'white',
		fontSize: 26,
		textAlign: 'center',
		borderBottomColor: 'white',
		borderBottomWidth: 2,
		marginBottom: 10
	},

	actionsContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 5
	},

	actionButton: {
		backgroundColor: config.colors.primary,
		borderRadius: 50,
		paddingVertical: 10,
		paddingHorizontal: 20,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: 5
	},

	actionButtonText: {
		color: 'white',
		fontSize: 16,
		marginLeft: 5
	}
})

export default RecorderBottomSheet