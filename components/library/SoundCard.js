import React from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { Icon } from 'react-native-elements'

const SoundCard = ({ sound, selected, onChange }) => {
	return (
		<Pressable onPress={() => onChange(!selected)}>
			<View style={styles.card}>
				<View style={[
					styles.selectorIndicator,
					selected ? styles.indicatorOn : styles.indicatorOff
				]}>
					{ selected &&
						<Icon
							name="done"
							size={18}
							color="#ffffff"
						/>
					}
				</View>
				<Text style={styles.name}>{ sound.name }</Text>
			</View>
      </Pressable>
	)
}

const styles = StyleSheet.create({
	card: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 20,
		backgroundColor: '#454545',
		marginBottom: 5,
		borderRadius: 2
	},

	selectorIndicator: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 24,
		height: 24,
		borderRadius: 12
	},

	indicatorOff: {
		borderWidth: 2,
		borderColor: 'white',
	},

	indicatorOn: {
		backgroundColor: '#1ca4ff'
	},

	name: {
		color: 'white',
		fontSize: 16,
		marginLeft: 20
	}
})

export default SoundCard