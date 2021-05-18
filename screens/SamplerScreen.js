import React from 'react'
import { View, StyleSheet } from 'react-native'

import Sampler from '../components/Sampler'

import { defaultConfig } from '../constants/sampler'
import config from '../config'


const SamplerScreen = () => {
	return (
		<View style={styles.container}>
			<View style={styles.samplerContainer}>
				<Sampler
					numberOfRows={defaultConfig.numberOfRows}
					numberOfColumns={defaultConfig.numberOfColumns}
				/>
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

	samplerContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		marginBottom: 10
	}
})

export default SamplerScreen