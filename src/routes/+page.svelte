<script>
	import Hero from '$lib/Hero.svelte'
	import MemberGroup from '$lib/MemberGroup.svelte'
	import ProjectItem from '$lib/Project/ProjectItem.svelte'
	import ProjectList from '$lib/Project/ProjectList.svelte'
	import { memberGroups, splashes } from '$lib/data.js'
</script>

<svelte:head>
	<title>besties</title>

	<meta name="title" content="besties" />
	<meta
		name="description"
		content="the radical left, the marxists, the anarchists, the agitators, the looters,"
	/>

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://besties.house/" />
	<meta property="og:title" content="besties" />
	<meta
		property="og:description"
		content="the radical left, the marxists, the anarchists, the agitators, the looters,"
	/>
	<meta property="og:image" content="https://besties.house/besties-thumb.png" />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://besties.house/" />
	<meta property="twitter:title" content="besties" />
	<meta
		property="twitter:description"
		content="the radical left, the marxists, the anarchists, the agitators, the looters,"
	/>
	<meta
		property="twitter:image"
		content="https://besties.house/besties-thumb.png"
	/>
</svelte:head>
<div style:display="none">
	<!-- For fediverse link verification -->
	<a rel="me" href="https://social.besties.house/@besties"
		>@besties@besties.house</a
	>
</div>

<div class="page">
	<div class="main-wrapper">
		<Hero {splashes} />

		<div class="info">
			<h2>projects</h2>
			<ProjectList>
				<ProjectItem
					project={{
						name: 'git.gay',
						url: 'https://git.gay',
						iconUrl: '/icons/git.gay.svg',
						description: 'A git server owned and operated by us queers'
					}}
				/>
				<ProjectItem
					project={{
						name: 'files.gay',
						url: 'https://files.gay',
						iconUrl: '/icons/files.gay.svg',
						description: 'Open-sourced file sharing site'
					}}
				/>
				<ProjectItem
					project={{
						name: 'wandering-eye',
						url: 'https://eye.besties.house',
						iconUrl: '/icons/eye.svg',
						description: 'Easily find information on any domain'
					}}
				/>
				<ProjectItem
					project={{
						name: 'social.besties.house',
						url: 'https://social.besties.house',
						iconUrl: '/icons/ucb.svg',
						description: 'A Mastodon server'
					}}
				/>
			</ProjectList>
			<h2>members</h2>
			<div class="member-list-wrapper">
				{#each memberGroups as group}
					<MemberGroup {group} />
				{/each}
			</div>
			<div class="button-badges">
				<img
					class="button-badge"
					src="/badges/besties.gif"
					alt="besties - first unionised group chat"
				/>
				<img class="button-badge" src="/badges/trans.png" alt="trans flag" />
				<img class="button-badge" src="/badges/piracy.gif" alt="piracy now" />
				<img class="button-badge" src="/badges/acab.gif" alt="acab" />
			</div>
		</div>
	</div>
</div>

<style>
	.button-badges {
		margin-top: 1rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
	.button-badge {
		user-select: none;
	}
</style>
