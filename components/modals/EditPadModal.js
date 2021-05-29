import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, Dimensions, StatusBar } from 'react-native'
import { useSelector } from 'react-redux'

import ColorInput from '../inputs/ColorInput'
import SoundList from '../library/SoundList'

import config from '../../config'
import { colors } from '../../constants/pads'
import ModalTemplate from './ModalTemplate'

const EditPadModal = ({ visible, pad, onClose, onSave }) => {
	const availableColors = {...colors}
	delete availableColors.off

	const [color, setColor] = useState(pad?.color)
	const [sound, setSound] = useState(pad?.sound)

	const sounds = useSelector(state => state.library.sounds)

	const soundListHeight =
		Dimensions.get('window').height
		- (StatusBar.currentHeight)
		- 295

	useEffect(() => {
		setColor(pad?.color)
		setSound(pad?.sound)
	}, [pad])

	const savePad = () => {
		if (typeof onSave === 'function')
			onSave({ color, sound })
		
		if (typeof onClose === 'function')
			onClose()
	}

    return (
		<ModalTemplate
			title="Modifier le pad"
			visible={visible}
			onClose={onClose}
			onSave={savePad}
		>
			<Text style={styles.inputLabel}>Couleur</Text>
			<ColorInput
				items={availableColors}
				value={color}
				onChange={setColor}
			/>

			<Text style={styles.inputLabel}>Son</Text>
			<SoundList
				sounds={sounds}
				selectedItem={pad ? pad.sound : null}
				onChange={setSound}
				style={{ height: soundListHeight }}
			/>
		</ModalTemplate>
    )
}

const styles = StyleSheet.create({
	inputLabel: {
		fontSize: 20,
		color: config.colors.text,
		marginBottom: 5
	}
})

export default EditPadModal