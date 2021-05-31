import { Image } from 'react-native'
import { createSlice } from '@reduxjs/toolkit'

import HiHat808 from '../assets/sounds/hihat-808.wav'
import OpenHat808 from '../assets/sounds/openhat-808.wav'
import Snare808 from '../assets/sounds/snare-808.wav'
import Clap808 from '../assets/sounds/clap-808.wav'
import Rototom808 from '../assets/sounds/tom-rototom-808.wav'
import Kick808 from '../assets/sounds/kick-808.wav'

const initialState = {
	sounds: [
		{
			id: 'default-hihat-808',
			type: 'default',
			name: 'HiHat 808',
			uri: Image.resolveAssetSource(HiHat808).uri
		},
		{
			id: 'default-openhat-808',
			type: 'default',
			name: 'HiHat 808 ouverte',
			uri: Image.resolveAssetSource(OpenHat808).uri
		},
		{
			id: 'default-snare-808',
			type: 'default',
			name: 'Snare 808',
			uri: Image.resolveAssetSource(Snare808).uri
		},
		{
			id: 'default-clap-808',
			type: 'default',
			name: 'Clap 808',
			uri: Image.resolveAssetSource(Clap808).uri
		},
		{
			id: 'default-tom-rototom-808',
			type: 'default',
			name: 'Rototom 808',
			uri: Image.resolveAssetSource(Rototom808).uri
		},
		{
			id: 'default-kick-808',
			type: 'default',
			name: 'Kick 808',
			uri: Image.resolveAssetSource(Kick808).uri
		}
	]
}

const librarySlice = createSlice({
	name: 'library',
	initialState,
	reducers: {
		addSound(state, action) {
			const { id, type, name, uri } = action.payload
			state.sounds.push({ id, type, name, uri })
		}
	}
})

export const libraryActions = librarySlice.actions

export default librarySlice.reducer