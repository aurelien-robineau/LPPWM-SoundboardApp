import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Dimensions, TextInput,TouchableOpacity, StatusBar } from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Icon } from 'react-native-elements'

import SoundList from '../library/SoundList'

import config from '../../config'
import FreeSoundApi from '../../apis/FreeSoundApi'

const soundListHeight =
	Dimensions.get('window').height
	- (StatusBar.currentHeight)
	- 140

const DownloadSoundBottomSheet = ({ isOpen, onOpen, onClose }) => {
	const [research, setResearch] = useState('')
	const [sounds, setSounds] = useState([])

	const refRBSheet = useRef()

	useEffect(() => {
		if (isOpen) {
			refRBSheet.current.open()
		} else {
			refRBSheet.current.close()
		}
	}, [isOpen])

	const _handleResearch = () => {
		if (research) {
			FreeSoundApi.textSearch(research)
				.then(async (response) => {
					const data = await response.json()
					setSounds(data.results)
				})
				.catch(error => {})
		}
	}

	return (
		<RBSheet
			ref={refRBSheet}
			height={Dimensions.get('window').height * 0.9}
			closeOnDragDown={true}
			closeOnPressMask={true}
			onClose={onClose}
			onOpen={onOpen}
			openDuration={250}
			customStyles={{
				container: {
					backgroundColor: config.colors.main,
				}
			}}
		>
			<View style={styles.bottomSheetContainer}>
				<View style={styles.searchInputWrapper}>
					<TextInput
						style={styles.searchInput}
						value={research}
						onChangeText={setResearch}
						onEndEditing={_handleResearch}
						placeholder="Recherche..."
						placeholderTextColor="#999999"
					/>
					<TouchableOpacity onPress={_handleResearch}>
						<Icon
							name="search"
							size={26}
							color="white"
							style={styles.searchIcon}
						/>
					</TouchableOpacity>
				</View>

				<SoundList
					sounds={sounds}
					loadFrom="freesound"
					style={{ height: soundListHeight }}
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

	searchInputWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: config.colors.background,
		marginBottom: 10
	},

	searchInput: {
		flex: 1,
		color: 'white',
		fontSize: 18,
		paddingHorizontal: 20,
		paddingVertical: 15,
	},

	searchIcon: {
		paddingHorizontal: 15
	}
})

export default DownloadSoundBottomSheet