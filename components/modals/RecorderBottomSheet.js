import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, TextInput } from 'react-native'
import { Icon } from 'react-native-elements'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Audio } from 'expo-av'

import Recorder from '../../components/library/Recorder'

import config from '../../config'
import { formatAudioDuration } from '../../utils'

/**
 * Bottom sheet to record sounds
 * @param {boolean} isOpen - is the bottom sheet openned
 * @param {Fuction} onSave - function to execute when the record is saved
 * @param {Fuction} onClose - function to execute when the bottom sheet closes
 * @param {Fuction} onOpen - function to execute when the bottom sheet opens
 */
const RecorderBottomSheet = ({ isOpen, onSave, onClose, onOpen }) => {
	const [record, setRecord] = useState(null)
	const [sound, setSound] = useState(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [recordName, setRecordName] = useState('Titre')

	const refRBSheet = useRef()

	useEffect(() => _unloadSound, [sound])

	useEffect(() => {
		if (isOpen) {
			refRBSheet.current.open()
		} else {
			refRBSheet.current.close()
		}
	}, [isOpen])

	/**
	 * Load the sound of the record so it is ready to play
	 * @param {{}} record - infos on the record
	 */
	const _loadRecord = async (record) => {
		setRecord(record)

		await _unloadSound()

		try {
			const { sound: playback } = await Audio.Sound.createAsync(
				{ uri: record.uri },
				{},
				_onPlaybackStatusUpdate
			)

			setSound(playback)
		} catch (e) {
			setSound(null)
		}
	}

	/**
	 * Unload the sound of the record
	 */
	const _unloadSound = async () => {
		if (sound)
			await sound.unloadAsync()
	}

	/**
	 * Play the record if it is stopped, stop if it is playing
	 */
	const _toggleSound = async () => {
		if (isPlaying) {
			sound.stopAsync()
		} else {
			sound.replayAsync()
		}
	}

	/**
	 * Function to execute when the playback status changes
	 * @param {{}} status - new playback status
	 */
	const _onPlaybackStatusUpdate = (status) => {
		setIsPlaying(status.isPlaying)
	}

	/**
	 * Reset the bottom sheet
	 */
	const _resetModal = async () => {
		setRecord(null)
		setSound(null)
		setIsPlaying(false)
		setRecordName('Titre')
		await _unloadSound()
	}

	/**
	 * Funtion to execute when the save button is pressed
	 */
	const _onSavePressed = () => {
		if (onSave)
			onSave(record.uri, recordName)

		_resetModal()
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
					backgroundColor: config.colors.dark,
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
							<TouchableOpacity onPress={_toggleSound}>
								<Icon name={isPlaying ? 'stop' : 'play-arrow'} size={42} color={config.colors.text} />
							</TouchableOpacity>
							<Text style={styles.recordPlayerText}>{ formatAudioDuration(record.durationMillis) }</Text>
						</View>
						<View style={styles.actionsContainer}>
							<TouchableOpacity style={styles.actionButton} onPress={_resetModal}>
								<Icon name="delete" size={26} color={config.colors.text} />
								<Text style={styles.actionButtonText}>Supprimer</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.actionButton} onPress={_onSavePressed}>
								<Icon name="save" size={26} color={config.colors.text} />
								<Text style={styles.actionButtonText}>Enregistrer</Text>
							</TouchableOpacity>
						</View>
					</>
				:
					<Recorder onRecordEnd={_loadRecord} />
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
		color: config.colors.text,
		marginLeft: 10
	},

	recordNameInput: {
		color: config.colors.text,
		fontSize: 26,
		textAlign: 'center',
		borderBottomColor: config.colors.text,
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
		color: config.colors.text,
		fontSize: 16,
		marginLeft: 5
	}
})

export default RecorderBottomSheet