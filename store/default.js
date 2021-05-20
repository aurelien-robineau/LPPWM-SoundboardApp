import { defaultConfig } from '../constants/sampler'

export default initialState = {
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