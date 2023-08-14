<script>
	import { onMount } from 'svelte'
	let listening = null
	export let member
	onMount(async () => {
		if (!member.socials.lastfm) return
		const resp = await fetch(
			`https://yc.besties.house/api/last/${member.socials.lastfm}`
		)
		const data = await resp.json()
		if (data.success && data.response['est-timestamp'] == 'live') {
			listening = data.response
		}
	})
</script>

{#if listening}
	<p class="heading">listening to music</p>
	<div class="listening">
		<img
			aria-hidden="true"
			src={listening.cover.replace('/200s/', '/avatar300s/')}
			alt=""
		/>
		<div class="listening-meta">
			<p class="track-name">{listening.track.name}</p>
			<p class="artist-name">by {listening.artist.name}</p>
			{#if listening.album.name && listening.album.name != listening.track.name}
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
	}
	.listening img {
		width: 100%;
		border-radius: 0.125rem;
	}
	.listening-meta {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-width: 0;
	}
	.listening-meta p {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.listening .track-name {
		font-weight: 600;
		color: var(--grey-400);
	}
</style>
