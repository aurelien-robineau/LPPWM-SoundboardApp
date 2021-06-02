import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Pressable, TouchableOpacity} from 'react-native'
import { useSelector } from 'react-redux'
import { Icon } from 'react-native-elements'

import SoundInfoModal from '../modals/SoundInfoModal'
import config from '../../config'
import { types } from '../../constants/sounds'

const SoundCard = ({ soundId, loadFrom, isSelectable, selected, onChange }) => {
	const [sound, setSound] = useState(null)
	const [infoModalVisible, setInfoModalVisible] = useState(false)

	const sounds = useSelector(state => state.library.sounds)
	
	useEffect(() => {
		if (loadFrom === 'local')
			setSound(sounds.find(s => s.id === soundId))
	}, [soundId, loadFrom])

	const _onPadPressed = () => {
		if (isSelectable && onChange)
			onChange(!selected)
	}

	return sound && (
		<>
			<Pressable
				onPress={_onPadPressed}
			>
				<View style={styles.card}>
					{ isSelectable &&
						<View style={[
							styles.selectorIndicator,
							selected ? styles.indicatorOn : styles.indicatorOff
						]}>
							{ selected &&
								<Icon
									name="done"
									size={18}
									color="#ffffff"
								/>
							}
						</View>
					}
					<View style={[styles.infosContainer, { marginLeft: isSelectable ? 20 : 0 }]}>
						<Text style={styles.name}>{ sound.name }</Text>
						<Text style={styles.type}>{ loadFrom === 'local' ? types[sound.type ]: types.freesound }</Text>
					</View>

					<TouchableOpacity onPress={() => setInfoModalVisible(true)}>
						<Icon name="more-vert" size={30} color="white" />
					</TouchableOpacity>
				</View>
		</Pressable>

		<SoundInfoModal
			soundId={soundId}
			loadFrom={loadFrom}
			isVisible={infoModalVisible}
			onClose={() => setInfoModalVisible(false)}
		/>
	  </>
	)
}

const styles = StyleSheet.create({
	card: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 20,
		backgroundColor: '#454545',
		marginBottom: 5,
		borderRadius: 2
	},

	selectorIndicator: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 24,
		height: 24,
		borderRadius: 12
	},

	indicatorOff: {
		borderWidth: 2,
		borderColor: 'white',
	},

	indicatorOn: {
		backgroundColor: config.colors.primary
	},

	infosContainer: {
		flex: 1
	},

	name: {
		color: 'white',
		fontSize: 16,
	},

	type: {
		color: '#dddddd',
		fontSize: 14,
	}
})

export default SoundCard