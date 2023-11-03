<script>
	import { browser } from '$app/environment'
	let listening = null
	export let member
	$: {
		if (browser) loadYellowcab(member.socials.lastfm)
	}
	async function loadYellowcab(user, platform = 'last') {
		if (!user) return
		const resp = await fetch(`https://yc.besties.house/api/${platform}/${user}`)
		const data = await resp.json()
		if (data.success && data.response['est-timestamp'] == 'live') {
			listening = data.response
		}
	}
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
		border-radius: 0.125rem;
	}
	.cover.fallback {
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--violet-900);
		border-radius: 0.125rem;
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
</style>
