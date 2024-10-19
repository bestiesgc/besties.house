<script>
	import Member from '$lib/Discord/Member.svelte'
	import RandomMessage from '$lib/RandomMessage.svelte'
	/** @type {{group: any}} */
	let { group } = $props();
</script>

<div class="member-group" style={group.style}>
	{#if !group.hideName}
		<h3 class="member-group-title">{group.name}</h3>
		{#if group.subtitles}
			<RandomMessage
				class="member-group-subtitles"
				messages={group.subtitles}
			/>
		{/if}
	{/if}
	<div class="member-list">
		{#each group.members as member}
			<Member {member} />
		{/each}
	</div>
</div>

<style lang="postcss">
	.member-list {
		display: grid;
		gap: 1rem;
		justify-items: center;
		grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
	}

	.member-group-title {
		margin-top: 0;
	}

	.member-group :global(.member-group-subtitles) {
		margin-bottom: 1rem;
	}
</style>
