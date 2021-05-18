import React, { useEffect, useState } from 'react'
import { View, useWindowDimensions, StyleSheet } from 'react-native'

import SamplerPad from './SamplerPad'
import EditPadModal from './modals/EditPadModal'

import { defaultConfig } from '../constants/sampler'

const Sampler = ({ numberOfRows, numberOfColumns }) => {
	const [pads, setPads] = useState(null)
	const [selectedPad, setSelectedPad] = useState(null)
	const [modalVisible, setModalVisible] = useState(false)

	const screenWidth = useWindowDimensions().width

	useEffect(() => {
		generatePads()
	}, [numberOfRows, numberOfColumns])

	const generatePads = async () => {
		const pads = []
		const numberOfPads = numberOfRows * numberOfColumns

		for (let i = 0; i < numberOfPads; i++) {
			pads.push({
				id: Date.now() + i,
				size: screenWidth / numberOfColumns - 10,
				...defaultConfig.pads[i]
			})
		}

		setPads(pads)
	}

	return (
		<>
			<View style={styles.sampler}>
				{ pads && pads.map(pad => (
					<View style={styles.padWrapper} key={pad.id}>
						<SamplerPad {...pad} onEdit={() => {
							setSelectedPad(pad)
							setModalVisible(true)
						}} />
					</View>
				)) }
			</View>

			<EditPadModal pad={selectedPad} visible={modalVisible} onClose={() => setModalVisible(false)} />
		</>
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