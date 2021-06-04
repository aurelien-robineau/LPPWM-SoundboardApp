import React, { useEffect, useState } from 'react'
import { View, useWindowDimensions, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import SamplerPad from './SamplerPad'

/**
 * Sampler view
 * @param {{}} sampler - sampler to display
 * @param {number} index - index of the sampler in the redux store
 * @param {Function} onPadEdit - function to execute when a pad is edited
 * @param {boolean} show - is the sampler displayed
 */
const Sampler = ({ sampler, index, onPadEdit, show = true }) => {
	const [pads, setPads] = useState(pads)
	const [visible, setVisible] = useState(show)

	const sounds = useSelector(state => state.library.sounds)

	const screenWidth = useWindowDimensions().width

	useEffect(() => {
		_generatePads()
	}, [sampler])

	useEffect(() => {
		setVisible(show)
	}, [show])

	/**
	 * Compute the pad size so sampler takes all screen width
	 * @returns {number} - the pad size in px
	 */
	const _getPadSize = () => {
		return (screenWidth - 20) / sampler.numberOfColumns - ((sampler.numberOfColumns - 1) * 5) / sampler.numberOfColumns 
	}

	/**
	 * Generate the pad for the SamplerPad component from the pad object
	 */
	const _generatePads = async () => {
		const pads = []
		const numberOfPads = sampler.numberOfRows * sampler.numberOfColumns

		// For all pads of the sampler, generate the pad
		for (let i = 0; i < numberOfPads; i++) {
			const pad = sampler.pads[i]
			pads.push({
				id: Date.now() + i,
				size: _getPadSize(),
				index: i,
				samplerIndex: index,
				color: pad.color,
				soundInfos: sounds.find(sound => sound.id === pad.sound) ?? null,
				sound: pad.sound,
				crop: pad.crop
			})
		}

		setPads(pads)
	}

	return (
		<View style={[styles.sampler, visible ? null : styles.hidden]}>
			{ pads && pads.map(pad => (
				<View style={styles.padWrapper} key={pad.id}>
					<SamplerPad {...pad} onEdit={() => typeof onPadEdit === 'function' ? onPadEdit(pad) : null} />
				</View>
			)) }
		</View>
	)
}

const styles = StyleSheet.create({
	sampler: {
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

export default Sampler