import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from 'react-native-elements'
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system'
import uuid from 'react-native-uuid'

import SoundList from '../components/library/SoundList'
import RecorderBottomSheet from '../components/modals/RecorderBottomSheet'
import DownloadSoundBottomSheet from '../components/modals/DownloadSoundBottomSheet'

import { libraryActions } from '../store/librarySlice'
import config from '../config'
import { getFileExtension } from '../utils'

const soundListHeight =
	Dimensions.get('window').height
	- getStatusBarHeight()
	- 290

/**
 * Screen to manage library
 */
const LibraryScreen = () => {
	const [isRecorderOpen, setIsRecorderOpen] = useState(false)
	const [isDownloadSheetOpen, setIsDownloadSheetOpen] = useState(false)

	const sounds = useSelector(state => state.library.sounds)

	const dispatch = useDispatch()

	let recordPermissionsGranted = false

	useEffect(() => {
		_initPermissions()
	}, [])

	/**
	 * Get needed permissions status
	 */
	const _initPermissions = async () => {
		const permissions = await Audio.getPermissionsAsync()
		recordPermissionsGranted = permissions.granted
	}

	/**
	 * Open the recording bottom sheet. Ask recording permissions if not granted
	 * yet.
	 */
	const _openRecordBottomSheet = async () => {
		if (!recordPermissionsGranted) {
			const permissions = await Audio.requestPermissionsAsync()
			recordPermissionsGranted = permissions.granted

			if (!permissions.granted) return
		}

		setIsRecorderOpen(true)
	}

	/**
	 * Open the download sound bottom sheet
	 */
	const _openDownloadBottomSheet = async () => {
		setIsDownloadSheetOpen(true)
	}

	/**
	 * Save a record to the phone storage and into the redux store.
	 * @param {string} uri - temporary uri of the record
	 * @param {string} name - name of the record
	 */
	const _onRecordSave = (uri, name) => {
		setIsRecorderOpen(false)

		const soundId = uuid.v4()
		const soundUri = `${FileSystem.documentDirectory}${soundId}.${getFileExtension(uri)}`

		FileSystem.copyAsync({
			from: uri,
			to: soundUri
		})

		dispatch(libraryActions.addSound({
			id: soundId,
			name: name,
			type: 'record',
			uri: soundUri
		}))
	}

	return (
		<>
			<View style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity style={styles.button} onPress={_openDownloadBottomSheet}>
						<Icon name="search" size={26} color={config.colors.text} />
						<Text style={styles.buttonText}>Rechercher en ligne</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={_openRecordBottomSheet}>
						<Icon name="mic" size={26} color={config.colors.text} />
						<Text style={styles.buttonText}>Enregistrer un son</Text>
					</TouchableOpacity>
				</View>

				<Text style={styles.categoryLabel}>Mes sons</Text>
				<SoundList
					sounds={sounds}
					loadFrom="local"
					style={{ height: soundListHeight }}
				/>
			</View>

			<RecorderBottomSheet
				isOpen={isRecorderOpen}
				onSave={_onRecordSave}
				onClose={() => setIsRecorderOpen(false)}
				onOpen={() => setIsRecorderOpen(true)}
			/>

			<DownloadSoundBottomSheet
				isOpen={isDownloadSheetOpen}
				onClose={() => setIsDownloadSheetOpen(false)}
				onOpen={() => setIsDownloadSheetOpen(true)}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		height: '100%',
		backgroundColor: config.colors.background
	},

	header: {
		marginTop: 20
	},

	button: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 15,
		paddingHorizontal: 20,
		borderRadius: 50,
		backgroundColor: config.colors.primary,
		marginTop: 10
	},

	buttonText: {
		color: config.colors.text,
		fontSize: 18,
		marginLeft: 10
	},

	categoryLabel: {
		fontSize: 20,
		color: config.colors.text,
		marginTop: 20,
		marginBottom: 10
	}
})

export default LibraryScreen