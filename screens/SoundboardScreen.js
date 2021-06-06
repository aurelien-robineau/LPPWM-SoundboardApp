import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Soundboard from '../components/soundboard/Soundboard'
import SoundboardCard from '../components/soundboard/SoundboardCard'
import EditPadModal from '../components/modals/EditPadModal'

import config from '../config'
import { soundboardsActions } from '../store/soundboardsSlice'
import EditSoundboardModal from '../components/modals/EditSoundboardModal'

/**
 * Sreen to display the soundboards
 */
const SoundboardScreen = () => {
	const [selectedSoundboardIndex, setSelectedSoundboardIndex] = useState(0)
	const [selectedPad, setSelectedPad] = useState(null)
	const [padModalVisible, setPadModalVisible] = useState(false)
	const [soundboardModalVisible, setSoundboardModalVisible] = useState(false)

	const dispatch = useDispatch()
	const soundboards = useSelector(state => state.soundboards.soundboards)

	/**
	 * Open the modal to edit the pad
	 * @param {{}} pad - pad to edit
	 */
	const _openEditPadModal = (pad) => {
		setSelectedPad(pad)
		setPadModalVisible(true)
	}

	/**
	 * Open the modal to edit the soundboard
	 * @param {number} soundboardIndex - index in the store of the soundboard to edit
	 */
	const _openEditSoundboardModal = (soundboardIndex) => {
		setSelectedSoundboardIndex(soundboardIndex)
		setSoundboardModalVisible(true)
	}

	/**
	 * Dispatch an action to update a pad
	 * @param {{}} pad - pad to update
	 * @param {{}} newPad - new pad data
	 */
	const _updatePad = (pad, newPad) => {
		dispatch(soundboardsActions.updatePad({
			soundboardIndex: pad.soundboardIndex,
			padIndex: pad.index,
			newValue: newPad
		}))
	}

	/**
	 * Dispatch an action to update a soundboard
	 * @param {number} soundboardIndex - index in the store of the soundboard to update
	 * @param {{}} newSoundboard - new soundboard data
	 */
	const _updateSoundboard = (soundboardIndex, newSoundboard) => {
		dispatch(soundboardsActions.updateSoundboardSize({
			soundboardIndex: soundboardIndex,
			numberOfRows: newSoundboard.numberOfRows,
			numberOfColumns: newSoundboard.numberOfColumns
		}))
	}

	return (
		<>
			<View style={styles.container}>
				{/* Soundboard selector */}
				<View style={styles.soundboardSelectorContainer}>
					{ soundboards.map((soundboard, index) => (
						<SoundboardCard
							key={index}
							name={soundboard.name}
							selected={selectedSoundboardIndex === index}
							onPress={() => setSelectedSoundboardIndex(index)}
							onLongPress={() => _openEditSoundboardModal(index)}
						/>
					))}
				</View>

				{/* Soundboards */}
				<View style={styles.soundboardContainer}>
					{ soundboards.map((soundboard, index) => (
						<Soundboard
							key={index}
							soundboard={soundboard}
							index={index}
							show={index === selectedSoundboardIndex}
							onPadEdit={pad => _openEditPadModal(pad)}
						/>
					))}
				</View>
			</View>
			
			{/* Edit pad modal */}
			<EditPadModal
				pad={selectedPad}
				visible={padModalVisible}
				onClose={() => setPadModalVisible(false)}
				onSave={newPad => _updatePad(selectedPad, newPad)}
			/>

			{/* Edit soundboard modal */}
			<EditSoundboardModal
				soundboard={soundboards[selectedSoundboardIndex]}
				visible={soundboardModalVisible}
				onClose={() => setSoundboardModalVisible(false)}
				onSave={newSoundboard => _updateSoundboard(selectedSoundboardIndex, newSoundboard)}
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

	soundboardSelectorContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 30
	},

	soundboardContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		marginBottom: 10
	}
})

export default SoundboardScreen