import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, TextInput, FlatList } from 'react-native'
import { Icon } from 'react-native-elements'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Audio } from 'expo-av'

import Recorder from '../../components/library/Recorder'

import config from '../../config'
import { formatAudioDuration } from '../../utils'
import FreeSoundApi from '../../apis/FreeSoundApi'

const DownloadSoundBottomSheet = ({ isOpen }) => {
	const [research, setResearch] = useState(null)
	const [sounds, setSounds] = useState([])

	const refRBSheet = useRef()

	useEffect(() => {
		if (isOpen) {
			refRBSheet.current.open()
		} else {
			refRBSheet.current.close()
		}
	}, [isOpen])

	const _handleSearchChange = (text) => {
		setResearch(text)
		FreeSoundApi.textSearch(text)
			.then(async (response) => {
				const data = await response.json()
				setSounds(data.results)
			})
			.catch(error => {})
	}

	const _renderSound = ({ item }) => {
		return (
			<Text>{ item.name }</Text>
		)
	}

	return (
		<RBSheet
			ref={refRBSheet}
			height={Dimensions.get('window').height * 0.9}
			closeOnDragDown={true}
			closeOnPressMask={true}
			openDuration={250}
			customStyles={{
				container: {
					backgroundColor: config.colors.main,
				}
			}}
		>
			<View style={styles.bottomSheetContainer}>
				<TextInput
					style={styles.searchInput}
					value={research}
					onChangeText={_handleSearchChange}
					placeholder="Recherche..."
					placeholderTextColor="#999999"
				/>

				<FlatList
					data={sounds}
					renderItem={_renderSound}
					keyExtractor={item => item.id.toString()}
				/>
			</View>
		</RBSheet>
	)
}

const styles = StyleSheet.create({
	bottomSheetContainer: {
		paddingHorizontal: 20,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10
	},

	searchInput: {
		color: 'white',
		fontSize: 18,
		backgroundColor: config.colors.background,
		paddingHorizontal: 20,
		paddingVertical: 15,
	}
})

export default DownloadSoundBottomSheet