export function assetURL(url, applicationId) {
	if (!url) return null
	if (url.startsWith('mp:')) {
		return url.replace('mp:', 'https://media.discordapp.net/')
	}
	if (url.startsWith('spotify:')) {
		return url.replace('spotify:', 'https://i.scdn.co/image/')
	}
	if (url.startsWith('https://') || url.startsWith('http://')) {
		return url
	}
	return `https://cdn.discordapp.com/app-assets/${applicationId}/${url}.png`
}

export function getActivityCover(activity) {
	const coverValue = activity?.assets?.large_image
	if (coverValue && coverValue != '') {
		return assetURL(coverValue, activity.application_id)
	}
	if (!activity.application_id || activity.application_id == '') {
		return undefined
	}
	return `https://3000.besties.house/applications/${activity.application_id}/icon.png`
}

const musicApps = ['1115748230328758325']

export function getSpecialActivities(activities) {
	const activitiesReversed = activities.reverse()
	const customStatus = activitiesReversed.find(activity => activity.type === 4)
	const gameActivity = activitiesReversed.find(activity => {
		if (musicApps.includes(activity.application_id)) return false
		if (activity.type === 0) return true
	})
	const musicActivity = activitiesReversed.find(activity => {
		if (activity.type === 2) return true
		if (musicApps.includes(activity.application_id)) return true
	})
	return {
		customStatus,
		gameActivity,
		musicActivity
	}
}
