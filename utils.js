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

export const getFileExtension = (uri) => {
	const splittedUri = uri.split('.')
	return splittedUri[splittedUri.length - 1]
}