import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const SoundCard = ({ sound }) => {
	return (
		<View>
			<Text style={styles.name}>{ sound.name }</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	name: {
		color: 'white'
	}
})

export default SoundCard