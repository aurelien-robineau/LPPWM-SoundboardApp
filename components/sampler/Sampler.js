import React, { useEffect, useState } from 'react'
import { View, useWindowDimensions, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import SamplerPad from './SamplerPad'

const Sampler = ({ sampler, index, onPadEdit, show = true }) => {
	const [pads, setPads] = useState(pads)
	const [visible, setVisible] = useState(show)

	const sounds = useSelector(state => state.library.sounds)

	const screenWidth = useWindowDimensions().width

	useEffect(() => {
		generatePads()
	}, [sampler])

	useEffect(() => {
		setVisible(show)
	}, [show])

	const getPadSize = () => {
		return (screenWidth - 20) / sampler.numberOfColumns - ((sampler.numberOfColumns - 1) * 5) / sampler.numberOfColumns 
	}

	const getSoundById = (id) => {
		return sounds.find(sound => sound.id === id) ?? null
	}

	const generatePads = async () => {
		const pads = []
		const numberOfPads = sampler.numberOfRows * sampler.numberOfColumns
		for (let i = 0; i < numberOfPads; i++) {
			const pad = sampler.pads[i]
			pads.push({
				id: Date.now() + i,
				size: getPadSize(),
				index: i,
				samplerIndex: index,
				color: pad.color,
				soundUri: getSoundById(pad.sound).uri,
				sound: pad.sound
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