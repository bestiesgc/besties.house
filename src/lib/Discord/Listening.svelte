<script>
	import { getActivityCover } from '$lib/Discord/activity.js'
	import { browser } from '$app/environment'
	import { onMount } from 'svelte'
	import Playing from '$lib/Discord/Playing.svelte'
	import Duration from '$lib/Duration.svelte'
	let listening = null
	export let member = null
	export let activity = null
	$: {
		if (browser && !activity) loadYellowcab(member.socials.lastfm)
	}
	$: if (activity) {
		now = Date.now()
		let start, end, duration
		if (activity.timestamps.start) {
			start = new Date(activity.timestamps.start)
		}
		if (activity.timestamps.end) {
			end = new Date(activity.timestamps.end)
		}
		if (start && end) {
			duration = end - start
		}
		listening = yellowcabToDiscord({
			cover: getActivityCover(activity),
			track: {
				name: activity.details
			},
			album: {
				name: activity.assets.large_text
			},
			artist: {
				name: activity.state
			},
			start,
			end,
			duration
		})
	}
	function yellowcabToDiscord(listening) {
		if (!listening) return
		const discordPresence = {
			name: listening.track.name,
			details: `by ${listening.artist.name}`,
			assets: {
				large_image: listening.cover.replace('/200s/', '/avatar300s/'),
				large_text: listening.album.name
			},
			start: listening.start,
			end: listening.end,
			duration: listening.duration
		}
		if (listening.album.name && listening.album.name != listening.track.name) {
			discordPresence.state = `on ${listening.album.name}`
		}
		return discordPresence
	}
	async function loadYellowcab(user, platform = 'last') {
		if (!user) return
		const resp = await fetch(`https://yc.besties.house/api/${platform}/${user}`)
		const data = await resp.json()
		if (data.success && data.response['est-timestamp'] == 'live') {
			listening = yellowcabToDiscord(data.response)
		}
	}
	let now = Date.now()
	onMount(() => {
		const int = setInterval(() => {
			now = Date.now()
		}, 1000)
		return () => {
			clearInterval(int)
		}
	})
</script>

{#if listening}
	<Playing heading="listening to music" activity={listening}></Playing>
	{#if listening.start && listening.duration}
		<div class="progress">
			<span class="sr-only">Progress</span>
			<div class="track">
				<div
					class="bar"
					style="width: {((now - listening.start) / listening.duration) * 100}%"
				></div>
			</div>
			<div class="timestamps">
				<span>
					<span class="sr-only">Timestamp: </span>
					<Duration ms={Math.min(now - listening.start, listening.duration)} />
				</span>
				<span>
					<span class="sr-only">Duration: </span>
					<Duration ms={listening.duration} />
				</span>
			</div>
		</div>
	{/if}
{/if}

<style lang="postcss">
	.progress {
		margin-top: 0.25rem;
		grid-column: 1 / -1;
	}
	.progress .track {
		overflow: hidden;
		border-radius: 20rem;
		background-color: var(--violet-900);
	}
	.bar {
		height: 0.1875rem;
		border-radius: 20rem;
		background-color: var(--grey-400);
		transition: width 500ms cubic-bezier(0.075, 0.82, 0.165, 1);
	}
	.timestamps {
		user-select: none;
		display: flex;
		justify-content: space-between;
		font-size: 0.625rem;
		color: var(--grey-500);
	}
</style>
