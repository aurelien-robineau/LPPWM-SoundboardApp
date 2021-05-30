import React, { useState, useEffect } from 'react'
import { StyleSheet, Text } from 'react-native'

import config from '../../config'
import SamplerSizeInput from '../inputs/SamplerSizeInput'
import ModalTemplate from './ModalTemplate'

const EditSamplerModal = ({ visible, sampler, onClose, onSave }) => {
	const [numberOfRows, setNumberOfRows] = useState(sampler?.numberOfRows)
	const [numberOfColumns, setNumberOfColumns] = useState(sampler?.numberOfColumns)

	useEffect(() => {
		setNumberOfRows(sampler?.numberOfRows)
		setNumberOfColumns(sampler?.numberOfColumns)
	}, [sampler])

	const updateValues = (dimensions) => {
		setNumberOfRows(dimensions.numberOfRows)
		setNumberOfColumns(dimensions.numberOfColumns)
	}

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
			title="Modifier le sampler"
			visible={visible}
			onClose={onClose}
			onSave={saveSampler}
		>
			<Text style={styles.inputLabel}>Format</Text>
			<SamplerSizeInput
				dimensions={{
					numberOfRows: sampler.numberOfRows,
					numberOfColumns: sampler.numberOfColumns
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
		color: 'white',
		fontSize: 20,
		backgroundColor: config.colors.main,
		paddingVertical: 10,
		paddingHorizontal: 20
	}
})

export default EditSamplerModal