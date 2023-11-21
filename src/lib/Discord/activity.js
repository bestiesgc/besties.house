export function getActivityCover(activity) {
	const coverValue = activity?.assets?.large_image
	if (coverValue && coverValue != '') {
		if (coverValue.startsWith('mp:')) {
			return activity.assets.large_image.replace(
				'mp:',
				'https://media.discordapp.net/'
			)
		} else if (coverValue.startsWith('spotify:')) {
			return coverValue.replace('spotify:', 'https://i.scdn.co/image/')
		} else {
			return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`
		}
	} else if (activity.application_id != '') {
		return `https://3000.besties.house/applications/${activity.application_id}/icon.png`
	}
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
