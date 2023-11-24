<script>
	import { getActivityCover } from '$lib/Discord/activity.js'
	import { browser } from '$app/environment'
	import { onMount } from 'svelte'
	import Duration from '$lib/Duration.svelte'
	let listening = null
	export let member = null
	export let activity = null
	$: {
		if (browser && !activity) loadYellowcab(member.socials.lastfm)
	}
	$: if (activity) {
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
		listening = {
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
		}
	}
	async function loadYellowcab(user, platform = 'last') {
		if (!user) return
		const resp = await fetch(`https://yc.besties.house/api/${platform}/${user}`)
		const data = await resp.json()
		if (data.success && data.response['est-timestamp'] == 'live') {
			listening = data.response
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
	<p class="heading">listening to music</p>
	<div class="listening">
		{#if listening.cover}
			<img
				class="cover"
				aria-hidden="true"
				src={listening.cover.replace('/200s/', '/avatar300s/')}
				alt=""
			/>
		{:else}
			<div class="cover fallback" aria-hidden="true">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24"
					viewBox="0 0 24 24"
					width="24"
					fill="currentColor"
					><path d="M0 0h24v24H0z" fill="none" /><path
						d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
					/></svg
				>
			</div>
		{/if}
		<div class="meta">
			<p class="track-name">{listening.track.name}</p>
			<p class="artist-name">by {listening.artist.name}</p>
			{#if listening.album && listening.album.name && listening.album.name != listening.track.name}
				<p class="album-name">on {listening.album.name}</p>
			{/if}
		</div>
		{#if listening.start && listening.duration}
			<div class="progress">
				<span class="sr-only">Progress</span>
				<div class="track">
					<div
						class="bar"
						style="width: {((now - listening.start) / listening.duration) *
							100}%"
					></div>
				</div>
				<div class="timestamps">
					<span>
						<span class="sr-only">Timestamp: </span>
						<Duration
							ms={Math.min(now - listening.start, listening.duration)}
						/>
					</span>
					<span>
						<span class="sr-only">Duration: </span>
						<Duration ms={listening.duration} />
					</span>
				</div>
			</div>
		{/if}
	</div>
{/if}

<style lang="postcss">
	.listening {
		display: grid;
		grid-template-columns: 3rem 1fr;
		gap: 0.25rem;
		font-size: 0.75rem;
		color: var(--grey-600);
	}
	.cover {
		width: 100%;
		aspect-ratio: 1;
		border-radius: 0.25rem;
	}
	.cover.fallback {
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--violet-900);
	}
	.meta {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-width: 0;
	}
	.meta p {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.track-name {
		color: var(--grey-400);
		font-weight: 600;
	}
	.progress {
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
		display: flex;
		justify-content: space-between;
		font-size: 0.625rem;
		color: var(--grey-500);
	}
</style>
