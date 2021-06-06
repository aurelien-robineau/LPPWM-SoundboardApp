import React, { useEffect, useState } from 'react'
import { View, useWindowDimensions, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import SoundboardPad from './SoundboardPad'

/**
 * Soundboard view
 * @param {{}} soundboard - soundboard to display
 * @param {number} index - index of the soundboard in the redux store
 * @param {Function} onPadEdit - function to execute when a pad is edited
 * @param {boolean} show - is the soundboard displayed
 */
const Soundboard = ({ soundboard, index, onPadEdit, show = true }) => {
	const [pads, setPads] = useState(pads)
	const [visible, setVisible] = useState(show)

	const sounds = useSelector(state => state.library.sounds)

	const screenWidth = useWindowDimensions().width

	useEffect(() => {
		_generatePads()
	}, [soundboard])

	useEffect(() => {
		setVisible(show)
	}, [show])

	/**
	 * Compute the pad size so soundboard takes all screen width
	 * @returns {number} - the pad size in px
	 */
	const _getPadSize = () => {
		return (screenWidth - 20) / soundboard.numberOfColumns - ((soundboard.numberOfColumns - 1) * 5) / soundboard.numberOfColumns 
	}

	/**
	 * Generate the pad for the SoundboardPad component from the pad object
	 */
	const _generatePads = async () => {
		const pads = []
		const numberOfPads = soundboard.numberOfRows * soundboard.numberOfColumns

		// For all pads of the soundboard, generate the pad
		for (let i = 0; i < numberOfPads; i++) {
			const pad = soundboard.pads[i]
			pads.push({
				id: Date.now() + i,
				size: _getPadSize(),
				index: i,
				soundboardIndex: index,
				color: pad.color,
				soundInfos: sounds.find(sound => sound.id === pad.sound) ?? null,
				sound: pad.sound,
				crop: pad.crop
			})
		}

		setPads(pads)
	}

	return (
		<View style={[styles.soundboard, visible ? null : styles.hidden]}>
			{ pads && pads.map(pad => (
				<View style={styles.padWrapper} key={pad.id}>
					<SoundboardPad {...pad} onEdit={() => typeof onPadEdit === 'function' ? onPadEdit(pad) : null} />
				</View>
			)) }
		</View>
	)
}

const styles = StyleSheet.create({
	soundboard: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		width: '100%'
	},

	hidden: {
		display: 'none'
	},

	padWrapper: {
		marginTop: 5
	}
})

export default Soundboard