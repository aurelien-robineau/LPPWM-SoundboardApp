import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import Sampler from '../components/Sampler'
import SamplerCard from '../components/SamplerCard'

import config from '../config'

const SamplerScreen = () => {
	const [selectedSamplerIndex, setSelectedSamplerIndex] = useState(0)

	const samplers = useSelector(state => state.samplers)

	return (
		<View style={styles.container}>
			<View style={styles.samplerSelectorContainer}>
				{ samplers.map((sampler, index) => (
					<SamplerCard key={index} name={sampler.name} selected={selectedSamplerIndex === index} onPress={() => {
						setSelectedSamplerIndex(index)
					}}/>
				))}
			</View>
			<View style={styles.samplerContainer}>
				{ samplers.map((sampler, index) => (
					<Sampler
						key={index}
						show={index === selectedSamplerIndex}
						numberOfRows={sampler.numberOfRows}
						numberOfColumns={sampler.numberOfColumns}
						padsConfig={sampler.pads}
					/>
				))}
			</View>
		</View>
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