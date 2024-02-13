<script>
	import { onMount, setContext } from 'svelte'
	import Hero from '$lib/Hero.svelte'
	import Groups from '$lib/Groups.svelte'
	import ProjectList from '$lib/Project/ProjectList.svelte'
	import { splashes, projects } from '$lib/data.js'
	import { writable } from 'svelte/store'
	const memberDetails = writable([])
	setContext('member-details', memberDetails)

	onMount(async () => {
		const connection = new WebSocket('wss://3000.besties.house/users')
		connection.addEventListener('message', event => {
			const message = JSON.parse(event.data)
			switch (message.type) {
				case 'INITIAL':
					$memberDetails = message.members
					break
				case 'UPDATE':
					$memberDetails[message.userId] = message
					break
			}
		})
	})
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
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Organization",
			"name": "Besties",
			"legalName" : "Besties",
			"url": "https://besties.house",
			"logo": "https://besties.house/icons/ucb.png",
			"foundingDate": "2021",
			"founders": [
				{
				"@type": "Person",
				"name": "Hazel Cora"
				},
				{
				"@type": "Person",
				"name": "Aria Blue"
				}
			],
			"sameAs": [ 
				"https://social.besties.house/@besties",
				"https://twitter.com/bestiesgc",
				"https://github.com/bestiesgc"
			]
	}
	</script>
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

		<main class="info">
			<h2>about us</h2>
			<p>
				besties is a collective - Formally established March of 2021 but truly
				beginning late 2020. Our goal is to provide spaces for queers like us to
				socialise and make cool stuff.
			</p>
			<p>
				We've been running <a href="https://git.gay">git.gay</a>, our Git forge
				(running Forgejo), since January 2022, using it to host the source code
				for our own projects, and opening it up to the public for others to use
				for theirs. We've made our own additions beyond what's built into
				Forgejo, including a static site host available for anyone at
				<a href="https://pages.gay">pages.gay</a>.
			</p>
			<p>
				We're actively working on new stuff all of the time. Our projects are <a
					href="https://git.gay/besties">all free and open source</a
				>, and we'd love for others to contribute!
				<img
					width="24"
					height="24"
					draggable="false"
					style="display: inline-block;vertical-align: middle;"
					src="/icons/pleadingcat.png"
					title=":pleadingcat:"
					alt="🥺🐱"
				/>
			</p>
			<h2>main projects</h2>
			<ProjectList {projects} />
			<h2>members</h2>
			<Groups />
			<div class="button-badges">
				<img
					width="88"
					height="31"
					class="button-badge"
					src="/badges/besties.gif"
					alt="besties - first unionised group chat"
				/>
				<img
					width="88"
					height="31"
					class="button-badge"
					src="/badges/trans.png"
					alt="trans flag"
				/>
				<img
					width="88"
					height="31"
					class="button-badge"
					src="/badges/piracy.gif"
					alt="piracy now"
				/>
				<img
					width="88"
					height="31"
					class="button-badge"
					src="/badges/acab.gif"
					alt="acab"
				/>
			</div>
		</main>
	</div>
</div>

<style lang="postcss">
	.page {
		position: relative;
		overflow-y: scroll;
		overflow-y: overlay;
		height: 100vh;
		height: 100svh;
		scrollbar-color: var(--violet-100) var(--violet-600);
		scrollbar-width: thin;
	}
	.main-wrapper {
		min-height: 100%;
	}
	.info {
		padding: 1rem;

		/* iPhone notch when viewing horizontally */
		@supports (padding: max(0px)) {
			padding-left: calc(env(safe-area-inset-left) + 1rem);
			padding-right: calc(env(safe-area-inset-right) + 1rem);
		}
	}
	.info :first-child {
		margin-top: 0;
	}
	.info > p {
		margin: 0.5em 0;
	}
	@media screen and (min-width: 1050px) {
		.main-wrapper {
			display: grid;
			grid-template-columns: 24rem 1fr;
		}
		.info {
			grid-column: 2;
			overflow-y: auto;

			scrollbar-color: var(--violet-100) var(--violet-400);
			scrollbar-width: thin;
		}
	}
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
