import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	samplers: [
		{
			name: 'A',
			numberOfRows: 4,
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
			name: 'B', numberOfRows: 2,
			numberOfColumns: 2,
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
				}
			]
		},
		{
			name: 'C',
			numberOfRows: 5,
			numberOfColumns: 4,
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
		}
	}
})

export const samplersActions = samplersSlice.actions

export default samplersSlice.reducer