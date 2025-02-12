<script>
	import { run } from 'svelte/legacy'

	import {
		getSpecialActivities,
		getNintendoPresence
	} from '$lib/Discord/activity.js'
	import roles from '$lib/data/roles.js'
	import Avatar from '$lib/Discord/Avatar.svelte'
	import Listening from '$lib/Discord/Listening.svelte'
	import Playing from '$lib/Discord/Playing.svelte'
	import BasicMarkdown from '$lib/BasicMarkdown.svelte'
	import Social from '$lib/Discord/Social.svelte'
	import ButtonBadgeList from '$lib/ButtonBadgeList.svelte'
	import { getContext, onMount } from 'svelte'

	/** @type {{member: any}} */
	let { member = $bindable() } = $props()

	if (member.bio && Array.isArray(member.bio)) {
		member.bio = member.bio[Math.round(Math.random() * (member.bio.length - 1))]
	}
	const allMemberDetails = getContext('member-details')
	let status = $state(null)
	let customStatus = $state(null)
	let gameActivity = $state(null)
	let musicActivity = $state(null)
	run(() => {
		const memberDetails = member.socials?.discord
			? $allMemberDetails[member.socials.discord]
			: null
		if (memberDetails) {
			status = memberDetails.status != '' ? memberDetails.status : null
			const specialActivities = getSpecialActivities(memberDetails.activities)
			customStatus = specialActivities.customStatus
			if (specialActivities.gameActivity || !gameActivity?.nso) {
				gameActivity = specialActivities.gameActivity
			}
			musicActivity = specialActivities.musicActivity
		}
	})

	function updateNintendoPresence() {
		if (!member.nso) return
		getNintendoPresence(member.nso).then(presence => {
			if (!presence && !gameActivity.nso) return
			gameActivity = presence
			gameActivity.nso = true
		})
	}

	onMount(async () => {
		updateNintendoPresence()

		const nsoTimeout = setInterval(updateNintendoPresence, 60 * 1000)

		return () => clearInterval(nsoTimeout)
	})
</script>

<div class="member" style={member.style || null}>
	<div class="banner" style:background-color={member.color}></div>
	<Avatar {member} {status} />
	<div class="info">
		<p class="name">
			{member.name}
			{#if member.pronouns}
				<span class="pronouns">{member.pronouns}</span>
			{/if}
		</p>
		{#if status}
			<span class="sr-only">
				Status:
				{#if status == 'online'}
					online
				{:else if status == 'idle'}
					idle
				{:else if status == 'dnd'}
					do not disturb
				{:else if status == 'offline' || status == 'invisible'}
					offline
				{:else}
					unknown
				{/if}
			</span>
		{/if}
		{#if customStatus}
			<p>
				{#if customStatus.emoji?.id == ''}
					{customStatus.emoji.name}
				{:else if customStatus.emoji?.id}
					<img
						loading="lazy"
						class="status-emoji"
						width="21"
						height="21"
						src="https://cdn.discordapp.com/emojis/{customStatus.emoji
							.id}.{customStatus.emoji.animated
							? 'gif'
							: 'png'}?size=44&quality=lossless"
						alt=":{customStatus.emoji.name}:"
					/>
				{/if}
				{customStatus.state}
			</p>
		{/if}
		{#if member.bio || gameActivity || musicActivity || member.roles.length > 0 || member.buttons}
			<hr />
		{/if}
		{#if member.bio}
			<p class="heading">about me</p>
			<p class="bio"><BasicMarkdown text={member.bio} /></p>
		{/if}
		{#if gameActivity}
			<Playing activity={gameActivity} />
		{/if}
		{#if musicActivity}
			<Listening activity={musicActivity} />
		{:else}
			<Listening {member} />
		{/if}
		{#if member.roles.length > 0}
			<p class="heading">roles</p>
			<ul class="roles">
				{#each member.roles as role}
					<li class="role" style:--role-color={roles[role]?.color}>
						{roles[role]?.name ?? role}
					</li>
				{/each}
			</ul>
		{/if}
		{#if member.buttons}
			<p class="heading">buttons</p>
			<ButtonBadgeList buttons={member.buttons} flex />
		{/if}
		{#if member.socials || member.email}
			<hr />
			<div class="social-list">
				{#each Object.keys(member.socials).sort() as type}
					<Social {type} value={member.socials[type]} />
				{/each}
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.member {
		font-size: 0.75rem;
		position: relative;
		width: 100%;
		--background-color: var(--violet-800);
		background-color: var(--background-color);
		border-radius: 0.5rem;
		overflow: hidden;
		align-self: start;
	}
	.name {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		color: var(--grey-100);
		font-weight: 700;
		font-size: 1rem;
		margin: 0;
	}
	.member :global(.heading) {
		color: var(--grey-100);
		margin: 0.5em 0;
		font-weight: 700;
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.015rem;
	}
	.banner {
		height: 3.75rem;
	}
	.info {
		margin: 1.5rem 0.75rem 0.75rem;
		background-color: var(--violet-750);
		padding: 0.75rem;
		border-radius: 0.5rem;
	}
	hr {
		color: transparent;
		border: none;
		border-top: 1px solid var(--violet-650);
	}
	.pronouns {
		display: inline-block;
		font-size: 0.75rem;
		font-weight: 400;
		color: var(--grey-300);
		opacity: 0.75;
	}
	.status-emoji {
		width: 1lh;
		height: 1lh;
		vertical-align: bottom;
	}
	.bio {
		font: inherit;
		white-space: pre-line;
		margin: 0;
	}
	.roles {
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		list-style: none;
	}
	.role {
		font-size: 0.625rem;
		background-color: var(--violet-800);
		border: 1px solid var(--grey-600);
		padding: 0.25em 0.5em;
		border-radius: 0.25rem;
	}
	.roles :global(.role[style*='--role-color']) {
		color: var(--role-color);
		border-color: var(--role-color);
	}
	.social-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
		gap: 0.5rem;
	}
</style>
