import React, { useEffect, useState } from 'react'
import { View, useWindowDimensions, StyleSheet } from 'react-native'

import SamplerPad from './SamplerPad'
import EditPadModal from './modals/EditPadModal'

const Sampler = ({ numberOfRows, numberOfColumns, padsConfig, show = true }) => {
	const [pads, setPads] = useState(pads)
	const [visible, setVisible] = useState(show)
	const [selectedPad, setSelectedPad] = useState(null)
	const [modalVisible, setModalVisible] = useState(false)

	const screenWidth = useWindowDimensions().width

	useEffect(() => {
		generatePads()
	}, [numberOfRows, numberOfColumns])

	useEffect(() => {
		setVisible(show)
	}, [show])

	const getPadSize = () => {
		return (screenWidth - 20) / numberOfColumns - ((numberOfColumns - 1) * 5) / numberOfColumns 
	}

	const generatePads = async () => {
		const pads = []
		const numberOfPads = numberOfRows * numberOfColumns

		for (let i = 0; i < numberOfPads; i++) {
			pads.push({
				id: Date.now() + i,
				size: getPadSize(),
				...padsConfig[i]
			})
		}

		setPads(pads)
	}

	return (
		<>
			<View style={[styles.sampler, visible ? null : styles.hidden]}>
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

	hidden: {
		display: 'none'
	},

	padWrapper: {
		marginTop: 5
	}
})

export default Sampler