/**
 * Connection to Freesound API
 */
export default FreeSoundApi = {
	/**
	 * Search sounds from a research
	 * @param {string} research - research
	 * @returns {Promise<{}>} - Promise on data
	 */
	textSearch: async (research) => {
		return fetch(FreeSoundApi._constructSearchUrl(research))
	},

	/**
	 * Get a sound infos
	 * @param {string} soundId - id of the sound on freesound
	 * @returns {Promise<{}>} - Promise on data
	 */
	getSoundInfos: async (soundId) => {
		return fetch(FreeSoundApi._constructGetInfoUrl(soundId))
	},

	/**
	 * Send a request to freesound with the secret token
	 * @param {*} request - request to send
	 * @returns {Promise<{}>} - Promise on data
	 */
	sendRequest: async (request) => {
		return fetch(`${request}&token=${FreeSoundApi._config._secretToken}`)
	},

	/**
	 * Constructs the url to search a sound
	 * @param {string} research - the research string
	 * @returns {string} - the url
	 */
	_constructSearchUrl: (research) => {
		return `${FreeSoundApi._config._baseUrl}/search/text/?query=${research}&page_size=${FreeSoundApi._config._pageSize}&token=${FreeSoundApi._config._secretToken}`
	},

	/**
	 * Construct the url to get a sound infos
	 * @param {srting} soundId - the sound id on freesound
	 * @returns {string} - the url
	 */
	_constructGetInfoUrl: (soundId) => {
		return `${FreeSoundApi._config._baseUrl}/sounds/${soundId}/?token=${FreeSoundApi._config._secretToken}`
	},

	_config: {
		_baseUrl: 'https://freesound.org/apiv2',
		_secretToken: 'iBJmnVpfYLaguApfZRPXu09umD8DYnOz4bs12T86',
		_pageSize: 10
	}
}