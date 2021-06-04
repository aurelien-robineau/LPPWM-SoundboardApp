import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Dimensions, StatusBar, TouchableOpacity, Text } from 'react-native'
import { useSelector } from 'react-redux'
import RBSheet from 'react-native-raw-bottom-sheet'

import SoundList from '../library/SoundList'

import config from '../../config'

const soundListHeight =
	Dimensions.get('window').height
	- (StatusBar.currentHeight)
	- 150

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
					backgroundColor: config.colors.main,
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
		color: 'white',
		fontSize: 18,
		marginLeft: 10
	},
})

export default SelectSoundBottomSheet