import React, { useState, useEffect } from 'react'
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { Icon } from 'react-native-elements'

import ColorInput from '../inputs/ColorInput'
import SoundList from '../library/SoundList'

import config from '../../config'
import { colors } from '../../constants/pads'

const EditPadModal = ({ visible, pad, onClose, onSave }) => {
	const availableColors = {...colors}
	delete availableColors.off

	const [isVisible, setIsVisible] = useState(false)

	const [color, setColor] = useState(pad?.color)
	const [sound, setSound] = useState(pad?.sound)

	const sounds = useSelector(state => state.library.sounds)

	useEffect(() => {
		setIsVisible(visible)
		setColor(pad?.color)
		setSound(pad?.sound)
	}, [visible])

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
		<Modal
			animationType="slide"
			visible={isVisible}
			onRequestClose={onClose ? onClose : null}
		>
			<View style={styles.content}>
				<View style={styles.header}>
					<TouchableOpacity onPress={onClose}>
						<Icon name="arrow-back" size={30} color={config.colors.text}/>
					</TouchableOpacity>
					<Text style={styles.title}>Modifier le pad</Text>
					<TouchableOpacity onPress={savePad}>
						<Text style={styles.actionButtonText}>Enregistrer</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.body}>
					<Text style={styles.inputLabel}>Couleur</Text>
					<ColorInput
						items={availableColors}
						value={color}
						onChange={setColor}
					/>

					<Text style={styles.inputLabel}>Son</Text>
					<SoundList sounds={sounds} selectedItem={pad.sound} onChange={setSound} />
				</View>
			</View>
		</Modal>
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
		fontWeight: 'bold'
	}
})

export default EditPadModal