import { createSlice } from '@reduxjs/toolkit'

import { defaultConfig } from '../constants/sampler'

const initialState = {
	samplers: [
		{name: 'A', ...defaultConfig},
		{name: 'B', numberOfRows: 2,
	numberOfColumns: 2,
	pads: [
		{
			color: 'cyan',
			soundFile: require("../assets/sounds/openhat-808.wav")
		},
		{
			color: 'blue',
			soundFile: require("../assets/sounds/hihat-808.wav")
		},
		{
			color: 'pink',
			soundFile: require("../assets/sounds/snare-808.wav")
		},
		{
			color: 'purple',
			soundFile: require("../assets/sounds/clap-808.wav")
		}
	]},
		{name: 'C', ...defaultConfig}
	]
}

const samplersSlice = createSlice({
	name: 'samplers',
	initialState,
	reducers: {
		updatePad(state, action) {
			console.log(action.payload)
			const { samplerIndex, padIndex, newValue } = action.payload
			state.samplers[samplerIndex].pads[padIndex] = newValue
		}
	}
})

export const samplersActions = samplersSlice.actions

export default samplersSlice.reducer