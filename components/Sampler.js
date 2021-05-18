import React, { useEffect, useState } from 'react'
import { View, useWindowDimensions, StyleSheet } from 'react-native'

import SamplerPad from './SamplerPad'

import { defaultColor } from '../constants/colors'

const Sampler = ({ numberOfRows, numberOfColumns}) => {
	const [pads, setPads] = useState(null)

	const screenWidth = useWindowDimensions().width

	useEffect(() => {
		generatePads()
	}, [numberOfRows, numberOfColumns])

	const generatePads = () => {
		const pads = []
		const numberOfPads = numberOfRows * numberOfColumns
		for (let i = 0; i < numberOfPads; i++) {
			pads.push({
				size: screenWidth / numberOfColumns - 10,
				color: defaultColor
			})
		}
		console.log(pads)
		setPads(pads)
	}

	return (
		<View style={styles.sampler}>
			{ pads && pads.map(pad => (
				<View style={styles.padWrapper}>
					<SamplerPad {...pad} />
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

	padWrapper: {
		marginTop: 5
	}
})

export default Sampler