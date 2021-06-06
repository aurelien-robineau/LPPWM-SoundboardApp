import { createSlice } from '@reduxjs/toolkit'
import { defaultConfig as defaultPad } from '../constants/pads'

/**
 * Initial state for the soundboards slice
 */
const initialState = {
	/**
	 * List of available soundboards. The number of soundboards cannot be changed.
	 * Soundboard object :
	 *	name {String} - name of the soundboard
	 *	numberOfRows {Number} - number of pad rows of the soundboard
	 *	numberOfColumns {Number} - number of pad columns of the soundboard
	 *	pads {Array} - list of the soundboard's pads. Must be of size numberOfRows * numberOfColumns
	 *
	 * Pad object :
	 * 	color {String} - color of the pad (valid colors in the /constants/pads.js file)
	 * 	sound {String} - id of the sound of the pad
	 * 	crop {Array|null} - used to crop the sound. If null, no cropping. It
	 * 	must be an array of two numbers : the first one is the beginning
	 * 	position in milliseconds when playing the sound, he second is the ending
	 * 	position.
	 */
	soundboards: [
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

const soundboardsSlice = createSlice({
	name: 'soundboards',
	initialState,
	reducers: {
		/**
		 * Update a pad in the store
		 * @param {{}} state redux state
		 * @param {{}} action reducer action. Payload must contain the new pad
		 * values as an object, the soundboard index in the store and the pas index
		 * in the soundboard
		 */
		updatePad(state, action) {
			const { soundboardIndex, padIndex, newValue } = action.payload
			state.soundboards[soundboardIndex].pads[padIndex] = newValue
		},

		/**
		 * Update the soundboard number of rows and number of columns
		 * @param {{}} state redux state
		 * @param {{}} action reducer action. Payload must contain the soundboard
		 * index in the store, the new number of rows and the new number of
		 * columns
		 */
		updateSoundboardSize(state, action) {
			const { soundboardIndex, numberOfRows, numberOfColumns } = action.payload
			const soundboard = state.soundboards[soundboardIndex]
			soundboard.numberOfRows = numberOfRows
			soundboard.numberOfColumns = numberOfColumns
			
			// Add new pads if the new soundboard contains more pads than the
			// previous one
			for (let i = 0; i < numberOfRows * numberOfColumns; i++) {
				const pad = soundboard.pads[i] ?? defaultPad
				soundboard.pads[i] = pad
			}

			// Removes pads if the new soundboard containes less pads than the
			// previous one
			soundboard.pads.splice(numberOfRows * numberOfColumns)
		}
	}
})

export const soundboardsActions = soundboardsSlice.actions

export default soundboardsSlice.reducer