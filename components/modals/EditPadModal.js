import React, { useState, useEffect } from 'react'
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

import ColorInput from '../inputs/ColorInput'

import config from '../../config'
import { colors } from '../../constants/pads'

const EditPadModal = ({ visible, pad, onClose }) => {
	const availableColors = {...colors}
	delete availableColors.off

	const [isVisible, setIsVisible] = useState(false)
	const [currentPad, setCurrentPad] = useState(null)

	useEffect(() => {
		setIsVisible(visible)
	}, [visible])

	useEffect(() => {
		setCurrentPad(pad)
	}, [pad])

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
				</View>
				<View style={styles.body}>
					<Text style={styles.inputLabel}>Couleur</Text>
					<ColorInput
						items={availableColors}
						value={currentPad?.color}
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