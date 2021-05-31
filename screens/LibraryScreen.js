import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, StatusBar } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from 'react-native-elements'
import { Audio } from 'expo-av'

import SoundList from '../components/library/SoundList'
import RecorderBottomSheet from '../components/modals/RecorderBottomSheet'

import config from '../config'

const soundListHeight =
	Dimensions.get('window').height
	- (StatusBar.currentHeight)
	- 290

const LibraryScreen = () => {
	const [isRecorderOpen, setIsRecorderOpen] = useState(false)

	const sounds = useSelector(state => state.library.sounds)

	let recordPermissionsGranted = false

	useEffect(() => {
		initPermissions()
	}, [])

	const initPermissions = async () => {
		const permissions = await Audio.getPermissionsAsync()
		recordPermissionsGranted = permissions.granted
	}

	const openRecordBottomSheet = async () => {
		if (!recordPermissionsGranted) {
			const permissions = await Audio.requestPermissionsAsync()
			recordPermissionsGranted = permissions.granted

			if (!permissions.granted) return
		}

		setIsRecorderOpen(true)
	}

	const onRecordSave = (uri, name) => {
		setIsRecorderOpen(false)
		console.log(uri, name)
	}

	return (
		<>
			<View style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity style={styles.button}>
						<Icon name="search" size={26} color="white" />
						<Text style={styles.buttonText}>Rechercher en ligne</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={openRecordBottomSheet}>
						<Icon name="mic" size={26} color="white" />
						<Text style={styles.buttonText}>Enregistrer un son</Text>
					</TouchableOpacity>
				</View>

				<Text style={styles.categoryLabel}>Mes sons</Text>
				<SoundList
					sounds={sounds}
					selectedItem={null}
					// onChange={setSound}
					style={{ height: soundListHeight }}
				/>
			</View>

			<RecorderBottomSheet
				isOpen={isRecorderOpen}
				onSave={onRecordSave}
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
		color: 'white',
		fontSize: 18,
		marginLeft: 10
	},

	categoryLabel: {
		fontSize: 20,
		color: 'white',
		marginTop: 20,
		marginBottom: 10
	}
})

export default LibraryScreen