import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, TextInput } from 'react-native'

import config from '../../config'
import ModalTemplate from './ModalTemplate'

const EditSamplerModal = ({ visible, sampler, onClose, onSave }) => {
	const [numberOfRows, setNumberOfRows] = useState(sampler?.numberOfRows)
	const [numberOfColumns, setNumberOfColumns] = useState(sampler?.numberOfColumns)

	useEffect(() => {
		setNumberOfRows(sampler?.numberOfRows)
		setNumberOfColumns(sampler?.numberOfColumns)
	}, [sampler])

	const saveSampler = () => {
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
			title="Modifier le pad"
			visible={visible}
			onClose={onClose}
			onSave={saveSampler}
		>
			<Text style={styles.inputLabel}>Nombre de lignes</Text>
			<TextInput
				style={styles.numberInput}
				value={numberOfRows.toString()}
				onChangeText={setNumberOfRows}
				keyboardType="number-pad"
			/>

			<Text style={styles.inputLabel}>Nombre de colonnes</Text>
			<TextInput
				style={styles.numberInput}
				value={numberOfColumns.toString()}
				onChangeText={setNumberOfColumns}
				keyboardType="number-pad"
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
		color: 'white',
		fontSize: 20,
		backgroundColor: config.colors.main,
		paddingVertical: 10,
		paddingHorizontal: 20
	}
})

export default EditSamplerModal