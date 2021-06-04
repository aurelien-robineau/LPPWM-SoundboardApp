import { createSlice } from '@reduxjs/toolkit'
import { defaultConfig as defaultPad } from '../constants/pads'

/**
 * Initial state for the samplers slice
 */
const initialState = {
	/**
	 * List of available samplers. The number of samplers cannot be changed.
	 * Sampler object :
	 *	name {String} - name of the sampler
	 *	numberOfRows {Number} - number of pad rows of the sampler
	 *	numberOfColumns {Number} - number of pad columns of the sampler
	 *	pads {Array} - list of the sampler's pads. Must be of size numberOfRows * numberOfColumns
	 *
	 * Pad object :
	 * 	color {String} - color of the pad (valid colors in the /constants/pads.js file)
	 * 	sound {String} - id of the sound of the pad
	 * 	crop {Array|null} - used to crop the sound. If null, no cropping. It
	 * 	must be an array of two numbers : the first one is the beginning
	 * 	position in milliseconds when playing the sound, he second is the ending
	 * 	position.
	 */
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
		/**
		 * Update a pad in the store
		 * @param {{}} state redux state
		 * @param {{}} action reducer action. Payload must contain the new pad
		 * values as an object, the sampler index in the store and the pas index
		 * in the sampler
		 */
		updatePad(state, action) {
			const { samplerIndex, padIndex, newValue } = action.payload
			state.samplers[samplerIndex].pads[padIndex] = newValue
		},

		/**
		 * Update the sampler number of rows and number of columns
		 * @param {{}} state redux state
		 * @param {{}} action reducer action. Payload must contain the sampler
		 * index in the store, the new number of rows and the new number of
		 * columns
		 */
		updateSamplerSize(state, action) {
			const { samplerIndex, numberOfRows, numberOfColumns } = action.payload
			const sampler = state.samplers[samplerIndex]
			sampler.numberOfRows = numberOfRows
			sampler.numberOfColumns = numberOfColumns
			
			// Add new pads if the new sampler contains more pads than the
			// previous one
			for (let i = 0; i < numberOfRows * numberOfColumns; i++) {
				const pad = sampler.pads[i] ?? defaultPad
				sampler.pads[i] = pad
			}

			// Removes pads if the new sampler containes less pads than the
			// previous one
			sampler.pads.splice(numberOfRows * numberOfColumns)
		}
	}
})

export const samplersActions = samplersSlice.actions

export default samplersSlice.reducer