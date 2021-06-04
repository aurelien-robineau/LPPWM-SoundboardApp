import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, Dimensions, View, TouchableOpacity} from 'react-native'
import { useSelector } from 'react-redux'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { Audio } from 'expo-av'
import { Icon } from 'react-native-elements'

import ColorInput from '../inputs/ColorInput'
import ModalTemplate from './ModalTemplate'
import SoundCard from '../library/SoundCard'

import config from '../../config'
import { colors } from '../../constants/pads'
import { formatAudioDuration } from '../../utils'

const EditPadModal = ({ visible, pad, onClose, onSave }) => {
	const availableColors = {...colors}
	delete availableColors.off

	const [color, setColor] = useState(null)
	const [sound, setSound] = useState(null)
	const [crop, setCrop] = useState(null)

	const [playback, setPlayback] = useState(null)
	const [playbackStatus, setPlaybackStatus] = useState(null)

	const sounds = useSelector(state => state.library.sounds)

	useEffect(() => {
		if (pad) {
			setColor(pad.color)
			setSound(sounds.find(s => s.id === pad.sound))
			setCrop(pad.crop)
			loadPlayback()
		} else {
			unloadPlayback()
		}

		return () => unloadPlayback()
	}, [pad, visible])
	
	const loadPlayback = async () => {
		const sound = sounds.find(s => s.id === pad.sound)
		if (sound) {
			try {
				const { sound: playback, status: playbackStatus } = await Audio.Sound.createAsync({
					uri: sound.uri
				}, {}, _onPlaybackStatusUpdate)

				playback.setProgressUpdateIntervalAsync(100)

				setPlayback(playback)
				setPlaybackStatus(playbackStatus)
			} catch (e) {
				setPlayback(null)
				setPlaybackStatus(null)
			}
		}
	}

	const unloadPlayback = () => {
		if (playback) {
			playback.unloadAsync()
		}
	}

	const toggleSound = async () => {
		if (playback) {
			if (playbackStatus?.isPlaying) {
				playback.pauseAsync()
			} else {
				if (crop) {
					playback.setPositionAsync(crop[0])
					playback.playAsync()
				}
				else {
					playback.replayAsync()
				}
			}
		}
	}

	const _onPlaybackStatusUpdate = (status) => {
		if (crop && status.positionMillis >= crop[1]) {
			try {
				playback.pauseAsync()
			} catch (e) {}
		}

		setPlaybackStatus(status)
	}

	const savePad = () => {
		if (typeof onSave === 'function')
			onSave({ color, sound: sound.id, crop })
		
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

			{ sound &&
			<>
				<Text style={styles.inputLabel}>Son</Text>
				<SoundCard
					soundId={sound.id}
					loadFrom="local"
				/>

				{ playback &&
					<>
						<Text style={styles.inputLabel}>Rogner</Text>
						<View style={styles.sliderWrapper}>
							<MultiSlider
								min={0}
								max={playbackStatus.durationMillis}
								step={1}
								values={crop ? [crop[0], crop[1]] : [0, playbackStatus.durationMillis]}
								sliderLength={Dimensions.get('window').width - 80}
								selectedStyle={{ backgroundColor: config.colors.primary }}
								markerStyle={{ backgroundColor: config.colors.primary, height: 25, width: 25 }}
								pressedMarkerStyle={{ backgroundColor: config.colors.primary, height: 30, width: 30 }}
								onValuesChangeFinish={values => {
										setCrop(
											values[0] !== 0 || values[1] !== playbackStatus.durationMillis
												? values
												: null
										)
								}}
							/>
						</View>

						<Text style={styles.inputLabel}>Écouter</Text>
						<TouchableOpacity onPress={toggleSound}>
							<Icon
								name={playbackStatus.isPlaying ? 'stop' : 'play-arrow'}
								size={46}
								color="white"
							/>
							<Text style={styles.audioDuration}>
								{ formatAudioDuration(crop ? crop[1] - crop[0] : playbackStatus.durationMillis) }
							</Text>
						</TouchableOpacity>
					</>
				}
			</>
			}
		</ModalTemplate>
    )
}

const styles = StyleSheet.create({
	inputLabel: {
		fontSize: 20,
		color: config.colors.text,
		marginBottom: 5
	},

	sliderWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},

	audioDuration: {
		fontSize: 16,
		textAlign: 'center',
		color: '#dddddd'
	}
})

export default EditPadModal