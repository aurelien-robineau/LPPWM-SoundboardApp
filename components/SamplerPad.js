import React from 'react'
import { View, StyleSheet } from 'react-native'

const SamplerPad = ({ size, color }) => {
	return (
		<View style={[styles.pad, { width: size, height: size, backgroundColor: color }]}>

		</View>
	)
}

const styles = StyleSheet.create({
	pad: {
		
	}
})

export default SamplerPad