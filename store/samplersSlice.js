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
					sound: 'default-openhat-808'
				},
				{
					color: 'blue',
					sound: 'default-hihat-808'
				},
				{
					color: 'pink',
					sound: 'default-snare-808'
				},
				{
					color: 'purple',
					sound: 'default-clap-808'
				},
				{
					color: 'orange',
					sound: 'default-tom-rototom-808'
				},
				{
					color: 'red',
					sound: 'default-kick-808'
				},
				{
					color: 'red',
					sound: 'default-kick-808'
				},
				{
					color: 'red',
					sound: 'default-kick-808'
				},
				{
					color: 'red',
					sound: 'default-kick-808'
				}
			]
		},
		{
			name: 'B',
			numberOfRows: 3,
			numberOfColumns: 3,
			pads: [
				{
					color: 'cyan',
					sound: 'default-openhat-808'
				},
				{
					color: 'blue',
					sound: 'default-hihat-808'
				},
				{
					color: 'pink',
					sound: 'default-snare-808'
				},
				{
					color: 'purple',
					sound: 'default-clap-808'
				},
				{
					color: 'red',
					sound: 'default-kick-808'
				},
				{
					color: 'red',
					sound: 'default-kick-808'
				},
				{
					color: 'red',
					sound: 'default-kick-808'
				},
				{
					color: 'red',
					sound: 'default-kick-808'
				},
				{
					color: 'red',
					sound: 'default-kick-808'
				}
			]
		},
		{
			name: 'C',
			numberOfRows: 3,
			numberOfColumns: 3,
			pads: [
				{
					color: 'cyan',
					sound: 'default-openhat-808'
				},
				{
					color: 'blue',
					sound: 'default-hihat-808'
				},
				{
					color: 'pink',
					sound: 'default-snare-808'
				},
				{
					color: 'purple',
					sound: 'default-clap-808'
				},
				{
					color: 'orange',
					sound: 'default-tom-rototom-808'
				},
				{
					color: 'red',
					sound: 'default-kick-808'
				},
				{
					color: 'red',
					sound: 'default-kick-808'
				},
				{
					color: 'red',
					sound: 'default-kick-808'
				},
				{
					color: 'red',
					sound: 'default-kick-808'
				}
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