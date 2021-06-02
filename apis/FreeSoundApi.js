export default FreeSoundApi = {
	textSearch: async (research) => {
		return fetch(FreeSoundApi._constructSearchUrl(research))
	},

	_constructSearchUrl: (research) => {
		return `${FreeSoundApi._config._baseUrl}/search/text/?query=${research}&page_size=${FreeSoundApi._config._pageSize}&token=${FreeSoundApi._config._secretToken}`
	},

	_config: {
		_baseUrl: 'https://freesound.org/apiv2',
		_secretToken: 'iBJmnVpfYLaguApfZRPXu09umD8DYnOz4bs12T86',
		_pageSize: 10
	}
}