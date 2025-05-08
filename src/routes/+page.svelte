<script>
	import { onMount, setContext } from 'svelte'
	import Hero from '$lib/Hero.svelte'
	import Groups from '$lib/Groups.svelte'
	import ProjectList from '$lib/Project/ProjectList.svelte'
	import ButtonBadgeList from '$lib/ButtonBadgeList.svelte'
	import projects from '$lib/data/projects.js'
	import splashes from '$lib/data/splashes.js'
	import buttons from '$lib/data/buttons.js'
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
		content="besties is a collective dedicated to providing spaces for queer folks to express themselves through development online."
	/>

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://besties.house/" />
	<meta property="og:title" content="besties" />
	<meta
		property="og:description"
		content="besties is a collective dedicated to providing spaces for queer folks to express themselves through development online."
	/>
	<meta property="og:image" content="https://besties.house/logo.png" />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:url" content="https://besties.house/" />
	<meta name="twitter:title" content="besties" />
	<meta
		name="twitter:description"
		content="besties is a collective dedicated to providing spaces for queer folks to express themselves through development online."
	/>
	<meta name="twitter:image" content="https://besties.house/logo.png" />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Organization",
			"name": "Besties",
			"legalName": "Besties",
			"url": "https://besties.house",
			"logo": "https://besties.house/logo.png",
			"foundingDate": "2021",
			"founder": [
				{
					"@type": "Person",
					"givenName": "Hazel",
					"familyName": "Cora",
					"name": "hazycora",
					"sameAs": [
						"https://hazy.sh",
						"https://hazy.gay",
						"https://social.besties.house/@h",
						"https://github.com/hazycora"
					]
				},
				{
					"@type": "Person",
					"name": "Aria Blue",
					"givenName": "Aria",
					"familyName": "Blue",
					"sameAs": [
						"https://tacohitbox.com",
						"https://social.besties.house/@a"
					]
				}
			],
			"sameAs": [
				"https://social.besties.house/@besties",
				"https://github.com/bestiesgc"
			]
		}
	</script>
</svelte:head>

<div class="page">
	<div class="main-wrapper">
		<Hero {splashes} />

		<main class="info">
			<h2>what is besties?</h2>
			<p>
				besties is a collective. Having started as just another group chat of
				queer teens, our goal is to provide spaces for queer folks like us to
				socialise and explore development, especially for those who are new.
			</p>
			<p>
				We've been running <a href="https://git.gay">git.gay</a>, our Git forge
				(running <a href="https://forgejo.org">Forgejo</a>), since early 2022,
				so devs can have a cosy place to share their projects that they can
				identify with. We also run
				<a href="https://pages.gay">pages.gay</a>, a static website hosting
				platform that provides free subdomains so anyone can get started making
				sites for themselves and the things they've made.
			</p>
			<p>
				We're working on new stuff all of the time. Our projects are <a
					href="https://git.gay/besties">all open source</a
				>, and we'd love for others to contribute!
				<img
					width="24"
					height="24"
					draggable="false"
					class="emoji"
					src="/icons/pleadingcat.svg"
					title=":pleadingcat:"
					alt="a pleading cat emoji"
				/>
			</p>
			<p>
				For updates on our services, you can find us collectively on the
				Fediverse at <a rel="me" href="https://social.besties.house/@besties"
					>@besties@besties.house</a
				>, and there's a mirror of our account on Bluesky at
				<a href="https://bsky.app/profile/besties.house">@besties.house</a>. If
				you ever need help with something we run, if you can't find a dedicated
				place to report issues, you can message Hazel or Aria through one of
				their profiles linked on their cards below.
			</p>
			<h2>main projects</h2>
			<ProjectList {projects} />
			<h2>members</h2>
			<Groups />
			<br />
			<ButtonBadgeList {buttons} />
			<br />
			<footer>
				<a href="https://git.gay/besties/besties.house">source code</a>
				·
				<em
					>"the radical left, the marxists, the anarchists, the agitators, the
					looters,"</em
				>
				·
				<em>"my clique on me for life"</em>
				·
				<em>"i thought we were besties"</em>
			</footer>
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
		padding: 2rem 1rem;

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
	.emoji {
		display: inline-block;
		vertical-align: middle;
		width: 1.25em;
		height: 1.25em;
		margin-block: -0.5em;
	}
	footer {
		font-size: 0.75rem;
		opacity: 0.75;
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
</style>
