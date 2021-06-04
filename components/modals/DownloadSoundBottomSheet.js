import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Dimensions, TextInput,TouchableOpacity } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import RBSheet from 'react-native-raw-bottom-sheet'
import { Icon } from 'react-native-elements'

import SoundList from '../library/SoundList'

import config from '../../config'
import FreeSoundApi from '../../apis/FreeSoundApi'

const soundListHeight =
	Dimensions.get('window').height
	- getStatusBarHeight()
	- 140

const DownloadSoundBottomSheet = ({ isOpen, onOpen, onClose }) => {
	const [research, setResearch] = useState('')
	const [sounds, setSounds] = useState([])
	const [nextRequest, setNewRequest] = useState(null)
	const [refreshingSounds, setRefreshingSounds] = useState(false)

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
			setRefreshingSounds(true)
			FreeSoundApi.textSearch(research)
				.then(async (response) => {
					const data = await response.json()
					if (data.results) {
						setSounds(data.results)
						setNewRequest(data.next)
						refreshingSounds(false)
					}

					setRefreshingSounds(false)
				})
				.catch(error => {})
		}
	}

	const _loadMoreSounds = () => {
		if (nextRequest) {
			setRefreshingSounds(true)
			FreeSoundApi.sendRequest(nextRequest)
				.then(async (response) => {
					const data = await response.json()
					if (data.results) {
						setNewRequest(data.next)
						setSounds([...sounds, ...data.results])
					}

					setRefreshingSounds(false)
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
					backgroundColor: config.colors.dark,
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
							color={config.colors.text}
							style={styles.searchIcon}
						/>
					</TouchableOpacity>
				</View>

				<SoundList
					sounds={sounds}
					loadFrom="freesound"
					style={{ height: soundListHeight }}
					onEndReached={_loadMoreSounds}
					refreshing={refreshingSounds}
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
		color: config.colors.text,
		fontSize: 18,
		paddingHorizontal: 20,
		paddingVertical: 15,
	},

	searchIcon: {
		paddingHorizontal: 15
	}
})

export default DownloadSoundBottomSheet