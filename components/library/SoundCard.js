import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Pressable, TouchableOpacity} from 'react-native'
import { useSelector } from 'react-redux'
import { Icon } from 'react-native-elements'

import SoundInfoModal from '../modals/SoundInfoModal'
import config from '../../config'
import { types } from '../../constants/sounds'
import FreeSoundApi from '../../apis/FreeSoundApi'

/**
 * Card to display a sound
 * @param {*} soundId - id of the sound ton display
 * @param {*} loadFrom - from where is the sound loaded
 * @param {*} isSelectable - is the card selectable
 * @param {*} selected - is the card selected
 * @param {*} onChange - function to call when the card selection status changes
 */
const SoundCard = ({ soundId, loadFrom, isSelectable, selected, onChange }) => {
	const [sound, setSound] = useState(null)
	const [infoModalVisible, setInfoModalVisible] = useState(false)

	const sounds = useSelector(state => state.library.sounds)
	
	useEffect(() => {
		if (loadFrom === 'local') {
			setSound(sounds.find(s => s.id === soundId))
		}
		else if (loadFrom === 'freesound') {
			FreeSoundApi.getSoundInfos(soundId)
			.then(async (response) => {
				const data = await response.json()
				setSound({ name: data.name})
			})
			.catch(error => {})
		}
	}, [soundId, loadFrom])

	/**
	 * Function to execute when the pad is pressed
	 */
	const _onCardPressed = () => {
		if (isSelectable && onChange)
			onChange(!selected)
	}

	return sound && (
		<>
			<Pressable
				onPress={_onCardPressed}
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
						<Text style={styles.type}>{ loadFrom === 'local' ? types[sound.type]: types.freesound }</Text>
					</View>

					<TouchableOpacity onPress={() => setInfoModalVisible(true)}>
						<Icon name="more-vert" size={30} color={config.colors.text} />
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
		borderColor: config.colors.text,
	},

	indicatorOn: {
		backgroundColor: config.colors.primary
	},

	infosContainer: {
		flex: 1
	},

	name: {
		color: config.colors.text,
		fontSize: 16,
	},

	type: {
		color: '#dddddd',
		fontSize: 14,
	}
})

export default SoundCard