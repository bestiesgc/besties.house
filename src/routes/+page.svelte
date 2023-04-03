<script>
	import Hero from '$lib/Hero/Component.svelte'
	import MemberGroup from '$lib/MemberGroup/Component.svelte'
	import ProjectItem from '$lib/ProjectItem.svelte'
	import RandomMessage from '$lib/RandomMessage.svelte'
	import { memberGroups, splashes } from '$lib/data.js'
	function handleRandomMessageUpdate(e) {
		document.title = `besties - ${e.detail.text}`
	}
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

<div class="page">
	<div class="main-wrapper">
		<Hero>
			<h1 class="besties-heading">besties</h1>
			<RandomMessage
				on:update-message={handleRandomMessageUpdate}
				class="besties-splash"
				messages={splashes}
			/>
		</Hero>

		<div class="info">
			<h2>projects</h2>
			<div class="project-list-wrapper">
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
						name: 'wandering eye',
						url: 'https://eye.besties.house',
						iconUrl: '/icons/eye.svg',
						description: 'Easily retrieve information on any domain'
					}}
				/>
				<ProjectItem
					project={{
						name: 'fuckgov.org',
						url: 'https://fuckgov.org',
						iconUrl: '/icons/ucb.svg',
						description: 'A Mastodon server'
					}}
				/>
			</div>
			<h2>members</h2>
			<div class="member-list-wrapper">
				{#each memberGroups as group}
					<MemberGroup {group} />
				{/each}
			</div>
		</div>
	</div>
</div>
