import React, { useState, useEffect } from 'react'
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

import config from '../../config'

const ModalTemplate = ({ title, visible, onClose, onSave, children }) => {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		setIsVisible(visible)
	}, [visible])

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
					<Text style={styles.title}>{ title }</Text>
					<TouchableOpacity onPress={onSave}>
						<Text style={styles.actionButtonText}>Enregistrer</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.body}>
					{ children }
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
		backgroundColor: config.colors.dark
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

	actionButtonText: {
		color: config.colors.primary,
		fontSize: 18,
		fontWeight: 'bold',
		marginRight: 10
	}
})

export default ModalTemplate