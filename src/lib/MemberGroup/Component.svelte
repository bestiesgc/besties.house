<script>
	import './style.css'
	import Member from '$lib/Discord/Member/Component.svelte'
	import RandomMessage from '$lib/RandomMessage.svelte'
	export let group
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
