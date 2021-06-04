/**
 * Get a duration in seconds and milliseconds from a duration in milliseconds
 * @param {number} durationInMillis full duration in milliseconds
 * @returns 
 */
export const formatAudioDuration = (durationInMillis) => {
	let durationInSeconds = durationInMillis / 1000
	let seconds = Math.floor(durationInSeconds)
	let millis = (durationInSeconds - seconds) * 1000

	if (seconds < 60)
		return `${seconds}sec ${millis.toFixed(0)}ms`
	
	let minutes = Math.floor(seconds / 60)
	seconds = seconds - minutes * 60

	return `${minutes}min ${seconds}sec ${millis.toFixed(0)}ms` 
}

/**
 * Get a file extension from a file uri.
 * This is a dumb function that could be reviewd for better security.
 * @param {string} uri - URI from where to extract the extension
 * @returns {string} the extension of the file
 */
export const getFileExtension = (uri) => {
	const splittedUri = uri.split('.')
	return splittedUri[splittedUri.length - 1]
}