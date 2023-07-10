<script>
	import Hero from '$lib/Hero/Component.svelte'
	import MemberGroup from '$lib/MemberGroup/Component.svelte'
	import ProjectItem from '$lib/ProjectItem.svelte'
	import RandomMessage from '$lib/RandomMessage.svelte'
	const memberGroups = [
		{
			name: 'teen bible study',
			members: [
				{
					name: 'hazycora',
					socials: {
						twitter: '1021804959703212034',
						mastodon: 'https://fuckgov.org/@h'
					},
					avatar: '/avatars/hazycora.webp',
					color: '#ff36ed',
					pronouns: 'she/her',
					email: 'hazy@besties.house',
					url: 'https://hazy.gay',
					bio: 'h'
				},
				{
					name: 'quinn',
					socials: {
						twitter: '1528596604940341250'
					},
					avatar: '/avatars/quinn.webp',
					color: '#2ecc71',
					pronouns: 'she/they',
					email: 'quinn@besties.house',
					bio: 'loser'
				},
				{
					name: 'aria',
					socials: {
						twitter: '1450703231642972161',
						mastodon: 'https://fuckgov.org/web/@a',
						lastfm: 'tacohitbox'
					},
					isCat: true,
					avatar: '/avatars/aria.webp',
					color: '#33b2e7',
					pronouns: 'she/it',
					email: 'aria@besties.house',
					url: 'https://tacohitbox.com',
					bio: 'weezer enjoyer, bad webdev'
				},
				{
					name: 'luna',
					socials: {
						twitter: '765711397820989440',
						mastodon: 'https://fuckgov.org/@Luna'
					},
					avatar: '/avatars/luna.webp',
					color: '#71368a',
					pronouns: 'hamburger'
				}
			]
		},
		{
			name: 'childrens church',
			subtitles: [
				`Left Twix > Right Twix`,
				`Hazy is a Dictator please help`,
				`i'm silly i'm silly i'm silly`,
				`my head hurts`,
				`IM NORMAL IM NORMAL IM NORMAL IM NORMAL IM NORMAL IM NORMAL IM NORMAL `,
				`80k reddit karma and counting`,
				`:( `,
				`We live in misery…`,
				`skill issue`,
				`no comment`,
				`The Funny Ones`,
				`Teen Bible Study, more like, uhh, DUMB.`,
				`Besties is a terrible group chat name. I don't like it.`,
				`:3`,
				`Nya!~`,
				`i'm doing the best i can`,
				`Hazy filtered out all the funny subtitles :(`,
				`Interact with caution`,
				`Thats a subtitle its funny dont delete it hazy (this is also a subtitle)`,
				`reduce your expectations to zero`,
				`loud != funny`,
				`Cool Person#0001 on discord wants money please send them money`
			],
			members: [
				{
					name: 'ultra',
					socials: {
						twitter: '1580957316077215750'
					},
					avatar: '/avatars/ultra.webp',
					color: '#206694',
					pronouns: 'they/them',
					bio: 'breathing right now'
				}
			]
		},
		{
			name: 'poneeee :3',
			subtitles: [
				'&kaaaaaaaaa&r is the best pony!',
				'startrix 4 life!!!',
				'm.a. larson is the best writer of the decade',
				'derpy!!!!!!!',
				'i bite!',
				'pls give me a free laptop',
				'neigh'
			],
			members: [
				{
					name: 'Trixie',
					socials: {
						mastodon: 'https://yiff.life/@trixie',
						lastfm: 'twilightemi'
					},
					avatar: '/avatars/trixie.webp',
					email: 'izzy@besties.house',
					color: '#2f0a4f',
					pronouns: 'she/they/pony',
					bio: 'silly pony doing silly things on her puter'
				}
			]
		}
	]
	const splashes = [
		'first unionised group chat of all time',
		'hope you like amateur web design',
		'def a little stupid. at least a little',
		'gluten-free antifa caramel',
		'"did you just try to ratio me?"',
		'i tested positive for being all tuckered out',
		'comic sans is aweosme',
		'my clique got me for life'
	]
	function handleRandomMessageUpdate(e) {
		document.title = `besties - ${e.detail.text}`
	}
</script>

<svelte:head>
	<title>besties clean edition</title>

	<meta name="title" content="besties clean edition" />
	<meta name="description" content="made this for demos lol" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://besties.house/" />
	<meta property="og:title" content="besties" />
	<meta property="og:description" content="made this for demos lol" />
	<meta property="og:image" content="https://besties.house/besties-thumb.png" />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://besties.house/" />
	<meta property="twitter:title" content="besties" />
	<meta property="twitter:description" content="made this for demos lol" />
	<meta
		property="twitter:image"
		content="https://besties.house/besties-thumb.png"
	/>
</svelte:head>

<div class="page">
	<div class="main-wrapper">
		<Hero>
			<h1 class="besties-heading">besties</h1>
			<p style="z-index: 2; font-size: 0.5em; margin-bottom: 0.5em;">
				(clean edition for demo lol)
			</p>
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
						description: 'Git server'
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
