import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Sampler from '../components/sampler/Sampler'
import SamplerCard from '../components/sampler/SamplerCard'
import EditPadModal from '../components/modals/EditPadModal'

import config from '../config'
import { samplersActions } from '../store/samplersSlice'
import EditSamplerModal from '../components/modals/EditSamplerModal'

const SamplerScreen = () => {
	const [selectedSamplerIndex, setSelectedSamplerIndex] = useState(0)
	const [selectedPad, setSelectedPad] = useState(null)
	const [padModalVisible, setPadModalVisible] = useState(false)
	const [samplerModalVisible, setSamplerModalVisible] = useState(false)

	const dispatch = useDispatch()
	const samplers = useSelector(state => state.samplers.samplers)

	const openEditPadModal = (pad) => {
		setSelectedPad(pad)
		setPadModalVisible(true)
	}

	const openEditSamplerModal = (samplerIndex) => {
		setSelectedSamplerIndex(samplerIndex)
		setSamplerModalVisible(true)
	}

	const updatePad = (pad, newPad) => {
		dispatch(samplersActions.updatePad({
			samplerIndex: pad.samplerIndex,
			padIndex: pad.index,
			newValue: newPad
		}))
	}

	const updateSampler = (samplerIndex, newSampler) => {
		dispatch(samplersActions.updateSamplerSize({
			samplerIndex: samplerIndex,
			numberOfRows: newSampler.numberOfRows,
			numberOfColumns: newSampler.numberOfColumns
		}))
	}

	return (
		<>
			<View style={styles.container}>
				<View style={styles.samplerSelectorContainer}>
					{ samplers.map((sampler, index) => (
						<SamplerCard
							key={index}
							name={sampler.name}
							selected={selectedSamplerIndex === index}
							onPress={() => setSelectedSamplerIndex(index)}
							onLongPress={() => openEditSamplerModal(index)}
						/>
					))}
				</View>
				<View style={styles.samplerContainer}>
					{ samplers.map((sampler, index) => (
						<Sampler
							key={index}
							sampler={sampler}
							index={index}
							show={index === selectedSamplerIndex}
							onPadEdit={pad => openEditPadModal(pad)}
						/>
					))}
				</View>
			</View>
			
			<EditPadModal
				pad={selectedPad}
				visible={padModalVisible}
				onClose={() => setPadModalVisible(false)}
				onSave={newPad => updatePad(selectedPad, newPad)}
			/>

			<EditSamplerModal
				sampler={samplers[selectedSamplerIndex]}
				visible={samplerModalVisible}
				onClose={() => setSamplerModalVisible(false)}
				onSave={newSampler => updateSampler(selectedSamplerIndex, newSampler)}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		height: '100%',
		backgroundColor: config.colors.background
	},

	samplerSelectorContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 30
	},

	samplerContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		marginBottom: 10
	}
})

export default SamplerScreen