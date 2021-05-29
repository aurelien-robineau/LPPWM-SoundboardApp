import React, { useState, useEffect } from 'react'
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions, StatusBar } from 'react-native'
import { useSelector } from 'react-redux'
import { Icon } from 'react-native-elements'

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
	content: {
		backgroundColor: config.colors.background,
		width: '100%',
		height: '100%'
	},

	header: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 15,
		backgroundColor: config.colors.main
	},

	title: {
		color: config.colors.text,
		fontSize: 20,
		fontWeight: 'bold',
		marginLeft: 10,
		flex: 1
	},

	body: {
		paddingHorizontal: 20,
		paddingVertical: 20
	},

	inputLabel: {
		fontSize: 20,
		color: config.colors.text,
		marginBottom: 5
	},

	actionButtonText: {
		color: '#1ca4ff',
		fontSize: 18,
		fontWeight: 'bold',
		marginRight: 10
	}
})

export default EditPadModal