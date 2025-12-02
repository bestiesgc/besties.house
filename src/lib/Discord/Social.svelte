<script>
	import { browser } from '$app/environment'
	import Website from '$lib/Icons/Website.svg?c'
	import Discord from '$lib/Icons/Discord.svg?c'
	import GitHub from '$lib/Icons/GitHub.svg?c'
	import GitGay from '$lib/Icons/GitGay.svg?c'
	import Twitter from '$lib/Icons/Twitter.svg?c'
	import Mail from '$lib/Icons/Mail.svg?c'
	import Mastodon from '$lib/Icons/Mastodon.svg?c'
	import YouTube from '$lib/Icons/YouTube.svg?c'
	import Lastfm from '$lib/Icons/Lastfm.svg?c'
	import Fedi from '$lib/Icons/Fedi.svg?c'
	import Tumblr from '$lib/Icons/Tumblr.svg?c'
	import Akkoma from '$lib/Icons/Akkoma.svg?c'
	import Keyoxide from '$lib/Icons/Keyoxide.svg?c'

	const detailsMap = {
		website: {
			href: value => `https://${value}`,
			title: value => value,
			icon: Website
		},
		discord: {
			href: value => `https://discord.com/users/${value}`,
			title: 'Discord',
			icon: Discord
		},
		github: {
			href: value => `https://github.com/${value}`,
			title: 'GitHub',
			icon: GitHub
		},
		gitgay: {
			href: value => `https://git.gay/${value}`,
			title: 'git.gay',
			icon: GitGay
		},
		twitter: {
			href: value => `https://twitter.com/intent/user?user_id=${value}`,
			title: 'Twitter',
			icon: Twitter
		},
		email: {
			href: value => `mailto:${value}`,
			title: value => value,
			icon: Mail,
			clientSide: true
		},
		mastodon: {
			href: value => value,
			title: 'Mastodon',
			icon: Mastodon
		},
		youtube: {
			href: value => `https://youtube.com/@${value}`,
			title: 'YouTube',
			icon: YouTube
		},
		lastfm: {
			href: value => `https://last.fm/user/${value}`,
			title: 'Last.fm',
			icon: Lastfm
		},
		fedi: {
			href: value => value,
			title: 'Fediverse',
			icon: Fedi
		},
		akkoma: {
			href: value => value,
			title: 'Akkoma',
			icon: Akkoma
		},
		tumblr: {
			href: value => `https://${value}.tumblr.com`,
			title: 'Tumblr',
			icon: Tumblr
		},
		keyoxide: {
			href: value => value,
			title: 'Keyoxide',
			icon: Keyoxide
		}
	}

	let { type, value } = $props()

	let social = $derived.by(() => {
		const socialDetails = detailsMap[type]
		return {
			...socialDetails,
			href: socialDetails.href(value),
			title:
				typeof socialDetails.title == 'function'
					? socialDetails.title(value)
					: socialDetails.title
		}
	})
</script>

<a href={social.clientSide && !browser ? '#' : social.href}>
	<div class="social">
		<social.icon aria-hidden="true" />
		{#if social.clientSide && !browser}
			<p class="social-label">
				Loading

				<noscript>- You may need to enable JavaScript</noscript>
			</p>
		{:else}
			<p class="social-label">{social.title}</p>
		{/if}
	</div>
</a>

<style lang="postcss">
	a {
		color: inherit;
	}
	.social {
		color: var(--grey-100);
		user-select: none;
		border: 1px solid var(--violet-650);
		display: grid;
		grid-template-columns: 1rem 1fr;
		height: 100%;
		border-radius: 0.25rem;
		padding: 0.5rem;
		align-items: center;
		gap: 0.5rem;
		font-weight: 600;
	}
	.social :global(svg) {
		width: 1rem;
		height: 1rem;
	}
	.social-label {
		min-width: 0;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>
