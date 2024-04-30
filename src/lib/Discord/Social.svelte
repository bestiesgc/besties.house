<script>
	import Website from '$lib/Icons/Website.svg?c'
	import GitHub from '$lib/Icons/GitHub.svg?c'
	import GitGay from '$lib/Icons/GitGay.svg?c'
	import Twitter from '$lib/Icons/Twitter.svg?c'
	import Mail from '$lib/Icons/Mail.svg?c'
	import Mastodon from '$lib/Icons/Mastodon.svg?c'
	import YouTube from '$lib/Icons/YouTube.svg?c'
	import Lastfm from '$lib/Icons/Lastfm.svg?c'
	import Firefish from '$lib/Icons/Firefish.svg?c'
	import Sharkey from '$lib/Icons/Sharkey.svg?c'
	import Tumblr from '$lib/Icons/Tumblr.svg?c'
	import Akkoma from '$lib/Icons/Akkoma.svg?c'

	const detailsMap = {
		website: {
			href: value => `https://${value}`,
			title: value => value,
			icon: Website
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
			icon: Mail
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
		firefish: {
			href: value => value,
			title: 'Firefish',
			icon: Firefish
		},
		sharkey: {
			href: value => value,
			title: 'Sharkey',
			icon: Sharkey
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
		}
	}

	let href, title, icon
	$: {
		href = detailsMap[type].href(value)
		if (typeof detailsMap[type].title === 'function') {
			title = detailsMap[type].title(value)
		} else {
			title = detailsMap[type].title
		}
		icon = detailsMap[type].icon
	}
	export let type
	export let value
</script>

<a {href}>
	<div class="social">
		<svelte:component this={icon} aria-hidden="true" />
		<p class="social-label">{title}</p>
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
		grid-template-columns: 1.25rem 1fr;
		height: 100%;
		border-radius: 0.25rem;
		padding: 0.5rem;
		align-items: center;
		gap: 0.5rem;
		font-weight: 600;
	}
	.social :global(svg) {
		width: 1.25rem;
		height: 1.25rem;
	}
	.social-label {
		min-width: 0;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>