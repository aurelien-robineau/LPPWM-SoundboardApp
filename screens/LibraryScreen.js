import React from 'react'
import { View, StyleSheet } from 'react-native'

import config from '../config'

const LibraryScreen = () => {
	return (
		<View style={styles.container}>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		height: '100%',
		backgroundColor: config.colors.background
	}
})

export default LibraryScreen