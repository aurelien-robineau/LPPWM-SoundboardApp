import React, { useState, useEffect } from 'react'
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

import ColorInput from '../inputs/ColorInput'

import config from '../../config'
import { colors } from '../../constants/pads'

const EditPadModal = ({ visible, pad, onClose, onSave }) => {
	const availableColors = {...colors}
	delete availableColors.off

	const [isVisible, setIsVisible] = useState(false)

	const [color, setColor] = useState(pad?.color)
	const [soundFile, setSoundFile] = useState(pad?.soundFile)

	useEffect(() => {
		setIsVisible(visible)
	}, [visible])

	useEffect(() => {
		setColor(pad?.color)
		setSoundFile(pad?.soundFile)
	}, [pad])

	const savePad = () => {
		if (typeof onSave === 'function')
			onSave({ color, soundFile })
		
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
						<Text>Enregistrer</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.body}>
					<Text style={styles.inputLabel}>Couleur</Text>
					<ColorInput
						items={availableColors}
						value={color}
						onChange={setColor}
					/>
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
		paddingVertical: 10,
		backgroundColor: config.colors.main
	},

	title: {
		color: config.colors.text,
		fontSize: 20,
		fontWeight: 'bold',
		marginLeft: 10
	},

	body: {
		paddingHorizontal: 20,
		paddingVertical: 20
	},

	inputLabel: {
		fontSize: 20,
		color: config.colors.text,
		marginBottom: 5
	}
})

export default EditPadModal