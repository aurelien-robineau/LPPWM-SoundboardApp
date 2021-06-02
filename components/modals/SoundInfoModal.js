import React, { useState, useEffect } from 'react'
import { StyleSheet, Modal, View, Dimensions, Pressable, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { useSelector } from 'react-redux'

import config from '../../config'

const SoundInfoModal = ({ isVisible, soundId, loadFrom, onClose }) => {
	const [sound, setSound] = useState(null)

	const sounds = useSelector(state => state.library.sounds)

	useEffect(() => {
		if (loadFrom === 'local')
			setSound(sounds.find(s => s.id === soundId))
	}, [soundId, loadFrom])

	return sound && (
		<Modal
			animationType="fade"
			visible={isVisible}
			onRequestClose={onClose ? onClose : null}
			transparent={true}
		>
			<Pressable style={styles.backdrop} onPress={onClose}></Pressable>
			<View style={styles.container}>
				<View style={styles.body}>
					<View style={styles.header}>
						<TouchableOpacity onPress={onClose}>
							<Icon name="close" size={30} color="white" />
						</TouchableOpacity>
					</View>
					<Text style={styles.title}>{ sound.name }</Text>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	backdrop: {
		position: 'absolute',
		backgroundColor: 'black',
		opacity: 0.25,
		height: '100%',
		width: '100%'
	},

	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%'
	}, 

	body: {
		backgroundColor: config.colors.main,
		height: Dimensions.get('window').height * 0.4,
		width: Dimensions.get('window').width * 0.85,
		borderRadius: 5,
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		padding: 20
	},

	header: {
		display: 'flex',
		alignItems:'flex-end'
	},

	title: {
		fontSize: 20,
		color: 'white',
		textAlign: 'center'
	}
})

export default SoundInfoModal