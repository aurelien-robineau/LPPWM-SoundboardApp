import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { useSelector } from 'react-redux'
import RBSheet from 'react-native-raw-bottom-sheet'

import SoundList from '../library/SoundList'

import config from '../../config'

const soundListHeight =
	Dimensions.get('window').height
	- getStatusBarHeight()
	- 150

/**
 * Bottom sheet to select a sound from a list
 * @param {string} initialSoundId - id if the selected sound
 * @param {*} isOpen - is the bottom sheet openned
 * @param {*} onOpen - function the execute when the bottom sheet opens
 * @param {*} onClose - function the execute when the bottom sheet closes
 * @param {*} onSoundChange  - function the execute when the selected sound changes
 */
const SelectSoundBottomSheet = ({ initialSoundId, isOpen, onOpen, onClose, onSoundChange }) => {
	const refRBSheet = useRef()

	const [selectedSoundId, setSelectedSoundId] = useState(initialSoundId)

	const sounds = useSelector(state => state.library.sounds)

	useEffect(() => {
		if (isOpen) {
			refRBSheet.current.open()
		} else {
			refRBSheet.current.close()
		}
	}, [isOpen])

	return (
		<RBSheet
			ref={refRBSheet}
			height={Dimensions.get('window').height * 0.9}
			closeOnDragDown={true}
			closeOnPressMask={true}
			onClose={onClose}
			onOpen={onOpen}
			openDuration={250}
			customStyles={{
				container: {
					backgroundColor: config.colors.dark,
				}
			}}
		>
			<View style={styles.bottomSheetContainer}>
				<SoundList
					sounds={sounds}
					loadFrom="local"
					isInput
					selectedItem={selectedSoundId}
					onChange={setSelectedSoundId}
					style={{ height: soundListHeight }}
				/>

				<TouchableOpacity style={styles.button} onPress={() => onSoundChange(selectedSoundId)}>
					<Text style={styles.buttonText}>Valider</Text>
				</TouchableOpacity>
			</View>
		</RBSheet>
	)
}

const styles = StyleSheet.create({
	bottomSheetContainer: {
		paddingHorizontal: 20,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10
	},

	button: {
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
})

export default SelectSoundBottomSheet