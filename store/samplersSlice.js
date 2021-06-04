import { createSlice } from '@reduxjs/toolkit'
import { defaultConfig as defaultPad } from '../constants/pads'

const initialState = {
	samplers: [
		{
			name: 'A',
			numberOfRows: 3,
			numberOfColumns: 3,
			pads: [
				{
					color: 'cyan',
					sound: 'default-openhat-808',
					crop: null
				},
				{
					color: 'blue',
					sound: 'default-hihat-808',
					crop: null
				},
				{
					color: 'pink',
					sound: 'default-clap-808',
					crop: null
				},
				{
					color: 'blue',
					sound: 'default-hihat-808',
					crop: null
				},
				{
					color: 'purple',
					sound: 'default-kick-808',
					crop: null
				},
				{
					color: 'blue',
					sound: 'default-hihat-808',
					crop: null
				},
				{
					color: 'pink',
					sound: 'default-clap-808',
					crop: null
				},
				{
					color: 'blue',
					sound: 'default-hihat-808',
					crop: null
				},
				{
					color: 'cyan',
					sound: 'default-openhat-808',
					crop: null
				},
			]
		},
		{
			name: 'B',
			numberOfRows: 3,
			numberOfColumns: 3,
			pads: [
				{
					color: 'yellow',
					sound: 'default-snare-808',
					crop: null
				},
				{
					color: 'orange',
					sound: 'default-tom-rototom-808',
					crop: null
				},
				{
					color: 'yellow',
					sound: 'default-snare-808',
					crop: null
				},
				{
					color: 'orange',
					sound: 'default-tom-rototom-808',
					crop: null
				},
				{
					color: 'red',
					sound: 'default-kick-808',
					crop: null
				},
				{
					color: 'orange',
					sound: 'default-tom-rototom-808',
					crop: null
				},
				{
					color: 'yellow',
					sound: 'default-snare-808',
					crop: null
				},
				{
					color: 'orange',
					sound: 'default-tom-rototom-808',
					crop: null
				},
				{
					color: 'yellow',
					sound: 'default-snare-808',
					crop: null
				}
			]
		},
		{
			name: 'C',
			numberOfRows: 3,
			numberOfColumns: 3,
			pads: [
				{
					color: 'green',
					sound: 'default-snare-808',
					crop: null
				},
				{
					color: 'blue',
					sound: 'default-hihat-808',
					crop: null
				},
				{
					color: 'green',
					sound: 'default-snare-808',
					crop: null
				},
				{
					color: 'blue',
					sound: 'default-hihat-808',
					crop: null
				},
				{
					color: 'green',
					sound: 'default-snare-808',
					crop: null
				},
				{
					color: 'blue',
					sound: 'default-hihat-808',
					crop: null
				},
				{
					color: 'green',
					sound: 'default-snare-808',
					crop: null
				},
				{
					color: 'blue',
					sound: 'default-hihat-808',
					crop: null
				},
				{
					color: 'green',
					sound: 'default-snare-808',
					crop: null
				},
			]
		}
	]
}

const samplersSlice = createSlice({
	name: 'samplers',
	initialState,
	reducers: {
		updatePad(state, action) {
			const { samplerIndex, padIndex, newValue } = action.payload
			state.samplers[samplerIndex].pads[padIndex] = newValue
		},

		updateSamplerSize(state, action) {
			const { samplerIndex, numberOfRows, numberOfColumns } = action.payload
			const sampler = state.samplers[samplerIndex]
			sampler.numberOfRows = numberOfRows
			sampler.numberOfColumns = numberOfColumns
			
			for (let i = 0; i < numberOfRows * numberOfColumns; i++) {
				const pad = sampler.pads[i] ?? defaultPad
				sampler.pads[i] = pad
			}

			sampler.pads.splice(numberOfRows * numberOfColumns)
		}
	}
})

export const samplersActions = samplersSlice.actions

export default samplersSlice.reducer