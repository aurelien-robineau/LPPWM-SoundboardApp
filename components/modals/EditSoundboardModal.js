import React, { useState, useEffect } from 'react'
import { StyleSheet, Text } from 'react-native'

import config from '../../config'
import SoundboardSizeInput from '../inputs/SoundboardSizeInput'
import ModalTemplate from './ModalTemplate'

/**
 * 
 * @param {*} visible
 * @param {*} soundboard
 * @param {*} onClose
 * @param {*} onSave
 */
const EditSoundboardModal = ({ visible, soundboard, onClose, onSave }) => {
	const [numberOfRows, setNumberOfRows] = useState(soundboard?.numberOfRows)
	const [numberOfColumns, setNumberOfColumns] = useState(soundboard?.numberOfColumns)

	useEffect(() => {
		setNumberOfRows(soundboard?.numberOfRows)
		setNumberOfColumns(soundboard?.numberOfColumns)
	}, [soundboard])

	const updateValues = (dimensions) => {
		setNumberOfRows(dimensions.numberOfRows)
		setNumberOfColumns(dimensions.numberOfColumns)
	}

	const saveSoundboard = () => {
		if (typeof onSave === 'function')
			onSave({
				numberOfRows: parseInt(numberOfRows),
				numberOfColumns: parseInt(numberOfColumns)
			})
		
		if (typeof onClose === 'function')
			onClose()
	}

    return (
		<ModalTemplate
			title="Modifier la soundboard"
			visible={visible}
			onClose={onClose}
			onSave={saveSoundboard}
		>
			<Text style={styles.inputLabel}>Format</Text>
			<SoundboardSizeInput
				dimensions={{
					numberOfRows: soundboard.numberOfRows,
					numberOfColumns: soundboard.numberOfColumns
				}}
				onChange={dimensions => updateValues(dimensions)}
			/>
		</ModalTemplate>
    )
}

const styles = StyleSheet.create({
	inputLabel: {
		fontSize: 20,
		color: config.colors.text,
		marginBottom: 5
	},

	numberInput: {
		color: config.colors.text,
		fontSize: 20,
		backgroundColor: config.colors.dark,
		paddingVertical: 10,
		paddingHorizontal: 20
	}
})

export default EditSoundboardModal