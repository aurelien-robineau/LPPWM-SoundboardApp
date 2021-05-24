import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	sounds: [
		{
			id: 'default-hihat-808',
			type: 'default',
			name: 'HiHat 808',
			file: 'assets/sounds/hihat-808.wav'
		},
		{
			id: 'default-openhat-808',
			type: 'default',
			name: 'HiHat 808 ouverte',
			file: 'assets/sounds/openhat-808.wav'
		},
		{
			id: 'default-snare-808',
			type: 'default',
			name: 'Snare 808',
			file: 'assets/sounds/snare-808.wav'
		},
		{
			id: 'default-clap-808',
			type: 'default',
			name: 'Clap 808',
			file: 'assets/sounds/clap-808.wav'
		},
		{
			id: 'default-tom-rototom-808',
			type: 'default',
			name: 'Rototom 808',
			file: 'assets/sounds/tom-rototom-808.wav'
		},
		{
			id: 'default-kick-808',
			type: 'default',
			name: 'Kick 808',
			file: 'assets/sounds/kick-808.wav'
		}
	]
}

const librarySlice = createSlice({
	name: 'library',
	initialState,
	reducers: {}
})

export const libraryActions = librarySlice.actions

export default librarySlice.reducer