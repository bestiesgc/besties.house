<script>
	import { getActivityCover, assetURL } from '$lib/Discord/activity.js'
	import { onMount } from 'svelte'
	import Game from '$lib/Icons/Game.svg?c'
	export let activity
	export let heading = 'playing a game'

	$: start = activity?.timestamps?.start
		? new Date(activity?.timestamps?.start)
		: null
	$: cover = getActivityCover(activity)
	$: smallCover = assetURL(
		activity?.assets?.small_image,
		activity?.application_id
	)
	let duration

	function timestampToDuration() {
		if (!start) return null
		const now = new Date()
		const diff = now - start

		const hours = Math.floor(diff / 1000 / 60 / 60)
		const minutes = Math.floor((diff / 1000 / 60) % 60).toString()
		const seconds = Math.floor((diff / 1000) % 60).toString()

		if (hours > 0) {
			duration = `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
			return
		}
		duration = `${minutes}:${seconds.padStart(2, '0')}`
	}

	onMount(() => {
		timestampToDuration()
		const durationInterval = setInterval(timestampToDuration, 1000)
		return () => clearInterval(durationInterval)
	})
</script>

{#if activity}
	<p class="heading">{heading}</p>
	<div class="listening">
		{#if cover}
			<div class="cover" class:has-small={smallCover}>
				<img
					class="cover"
					aria-hidden="true"
					draggable="false"
					src={cover}
					alt=""
				/>
				{#if smallCover}
					<img
						class="small"
						aria-hidden="true"
						draggable="false"
						src={smallCover}
						alt=""
					/>
				{/if}
			</div>
		{:else}
			<div class="cover fallback" aria-hidden="true">
				<slot name="iconFallback">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="24"
						viewBox="0 0 24 24"
						width="24"
						fill="currentColor"
						><path
							d="M21.58,16.09l-1.09-7.66C20.21,6.46,18.52,5,16.53,5H7.47C5.48,5,3.79,6.46,3.51,8.43l-1.09,7.66 C2.2,17.63,3.39,19,4.94,19h0c0.68,0,1.32-0.27,1.8-0.75L9,16h6l2.25,2.25c0.48,0.48,1.13,0.75,1.8,0.75h0 C20.61,19,21.8,17.63,21.58,16.09z M11,11H9v2H8v-2H6v-1h2V8h1v2h2V11z M15,10c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1 C16,9.55,15.55,10,15,10z M17,13c-0.55,0-1-0.45-1-1c0-0.55,0.45-1,1-1s1,0.45,1,1C18,12.55,17.55,13,17,13z"
						/></svg
					>
				</slot>
			</div>
		{/if}
		<div class="meta">
			<p class="track-name">{activity.name}</p>
			{#if activity.details}
				<p class="artist-name">{activity.details}</p>
			{/if}
			{#if activity.state}
				<p class="album-name">{activity.state}</p>
			{/if}
			{#if duration}
				<p class="timestamp">
					<Game aria-hidden />
					{duration}
				</p>
			{/if}
		</div>
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
		user-select: none;
		display: block;
		position: relative;
		width: 100%;
		aspect-ratio: 1;
		border-radius: 0.25rem;
	}
	.cover .small {
		background-color: var(--violet-750);
		border: 0.125rem solid var(--violet-750);
		border-radius: 100%;
		position: absolute;
		bottom: -0.125rem;
		right: -0.125rem;
		width: 1rem;
		height: auto;
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
		line-height: 1.2;
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
	.timestamp {
		color: #6dce8c;
		font-weight: 600;
		font-size: 0.625rem;
		display: flex;
		align-items: center;
		gap: 0.5ch;
		margin-block-start: 0.125rem;
	}
</style>
