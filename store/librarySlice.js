import { Image } from 'react-native'
import { createSlice } from '@reduxjs/toolkit'

import HiHat808 from '../assets/sounds/hihat-808.wav'
import OpenHat808 from '../assets/sounds/openhat-808.wav'
import Snare808 from '../assets/sounds/snare-808.wav'
import Clap808 from '../assets/sounds/clap-808.wav'
import Rototom808 from '../assets/sounds/tom-rototom-808.wav'
import Kick808 from '../assets/sounds/kick-808.wav'

/**
 * Initial state of the library slice
 */
const initialState = {
	/**
	 * List of library's sounds
	 * Sound object :
	 * 	id {String} - id of the sound
	 * 	type {String} - type of the sounds. Must be one of the types defined in
	 * 	'/constants/sounds.js' file
	 * 	name {String} - Name of the sound
	 * 	uri {String} - URI of the sound on the phone storage
	 */
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
		/**
		 * Add a new sound to the library
		 * @param {{}} state - redux state
		 * @param {{}} action - reducer action. Payload must contain all new
		 * sound data.
		 */
		addSound(state, action) {
			const { id, type, name, uri } = action.payload
			state.sounds.push({ id, type, name, uri })
		},

		/**
		 * Remove a sound from the library
		 * @param {{}} state redux state
		 * @param {{}} action reducer action. Payload must contain the id of the
		 * sound to remove.
		 */
		removeSound(state, action) {
			const { id } = action.payload
			state.sounds = state.sounds.filter(sound => sound.id !== id)
		}
	}
})

export const libraryActions = librarySlice.actions

export default librarySlice.reducer