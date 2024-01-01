<script>
	import { getSpecialActivities } from '$lib/Discord/activity.js'
	import { roles } from '$lib/data.js'
	import Avatar from '$lib/Discord/Avatar.svelte'
	import Listening from '$lib/Discord/Listening.svelte'
	import Playing from '$lib/Discord/Playing.svelte'
	import BasicMarkdown from '$lib/BasicMarkdown.svelte'
	import { getContext } from 'svelte'

	export let member

	if (member.bio && Array.isArray(member.bio)) {
		member.bio = member.bio[Math.round(Math.random() * (member.bio.length - 1))]
	}
	const allMemberDetails = getContext('member-details')
	let status = null
	let customStatus = null
	let gameActivity = null
	let musicActivity = null
	$: {
		let memberDetails = member.socials.discord
			? $allMemberDetails[member.socials.discord]
			: null
		if (memberDetails) {
			status = memberDetails.status != '' ? memberDetails.status : null
			const specialActivities = getSpecialActivities(memberDetails.activities)
			customStatus = specialActivities.customStatus
			gameActivity = specialActivities.gameActivity
			musicActivity = specialActivities.musicActivity
		}
	}
</script>

<div class="member" style={member.style || null}>
	<div class="banner" style:background-color={member.color} />
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
		{#if member.bio}
			<hr />
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
		<p class="heading">roles</p>
		<ul class="roles">
			{#each member.roles as role}
				<span class="role" style:--role-color={roles[role]?.color}
					>{roles[role]?.name ?? role}</span
				>
			{/each}
		</ul>
		{#if member.socials || member.email}
			<hr />
			<div class="social-list">
				{#if member.email}
					<a href="mailto:{member.email}">
						<div class="social">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								><path
									d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
								/></svg
							>
							<p class="social-label">{member.email}</p>
						</div>
					</a>
				{/if}
				{#if member.socials.twitter}
					<a
						href="https://twitter.com/intent/user?user_id={member.socials
							.twitter}"
					>
						<div class="social">
							<svg
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								xml:space="preserve"
								viewBox="0 0 248 204"
								><path
									fill="currentColor"
									d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"
								/></svg
							>
							<p class="social-label">Twitter</p>
						</div>
					</a>
				{/if}
				{#if member.socials.youtube}
					<a href="https://youtube.com/@{member.socials.youtube}">
						<div class="social">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								xml:space="preserve"
								id="Layer_1"
								x="0"
								y="0"
								version="1.1"
								viewBox="0 0 71.412065 50"
								><g id="g5" transform="scale(.58824)"
									><path
										id="path7"
										fill="#fff"
										fill-opacity="1"
										d="M35.705078 0S13.35386.0001149 7.765625 1.4707031c-3 .8235294-5.4713925 3.2946921-6.2949219 6.3535157C.0001149 13.412454 0 25 0 25s.0001149 11.64637 1.4707031 17.175781c.8235294 3.058824 3.2360984 5.471393 6.2949219 6.294922C13.412684 50.000115 35.705078 50 35.705078 50s22.353171-.000115 27.941406-1.470703c3.058824-.82353 5.471393-3.236098 6.294922-6.294922 1.470588-5.588235 1.470703-17.175781 1.470703-17.175781s.058709-11.64614-1.470703-17.2343752c-.823529-3.0588236-3.236098-5.4713925-6.294922-6.2949219C58.058249-.00011488 35.705078 0 35.705078 0zm-7.117187 14.294922L47.175781 25l-18.58789 10.705078V14.294922z"
										transform="scale(1.7)"
									/></g
								></svg
							>
							<p class="social-label">YouTube</p>
						</div>
					</a>
				{/if}
				{#if member.socials.tumblr}
					<a href="https://{member.socials.tumblr}.tumblr.com">
						<div class="social">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
								><path
									d="M309.8 480.3c-13.6 14.5-50 31.7-97.4 31.7-120.8 0-147-88.8-147-140.6v-144H17.9c-5.5 0-10-4.5-10-10v-68c0-7.2 4.5-13.6 11.3-16 62-21.8 81.5-76 84.3-117.1.8-11 6.5-16.3 16.1-16.3h70.9c5.5 0 10 4.5 10 10v115.2h83c5.5 0 10 4.4 10 9.9v81.7c0 5.5-4.5 10-10 10h-83.4V360c0 34.2 23.7 53.6 68 35.8 4.8-1.9 9-3.2 12.7-2.2 3.5.9 5.8 3.4 7.4 7.9l22 64.3c1.8 5 3.3 10.6-.4 14.5z"
									fill="currentColor"
								/></svg
							>
							<p class="social-label">Tumblr</p>
						</div>
					</a>
				{/if}
				{#if member.socials.mastodon}
					<a href={member.socials.mastodon}>
						<div class="social">
							<svg
								aria-hidden="true"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 216.4144 232.00976"
							>
								<mask id="m-mask">
									<rect fill="#fff" width="240" height="240" />
									<path
										fill="#000"
										d="M177.50984 80.077v60.94125h-24.14375v-59.15c0-12.46875-5.24625-18.7975-15.74-18.7975-11.6025 0-17.4175 7.5075-17.4175 22.3525v32.37625H96.20734V85.42325c0-14.845-5.81625-22.3525-17.41875-22.3525-10.49375 0-15.74 6.32875-15.74 18.7975v59.15H38.90484V80.077c0-12.455 3.17125-22.3525 9.54125-29.675 6.56875-7.3225 15.17125-11.07625 25.85-11.07625 12.355 0 21.71125 4.74875 27.8975 14.2475l6.01375 10.08125 6.015-10.08125c6.185-9.49875 15.54125-14.2475 27.8975-14.2475 10.6775 0 19.28 3.75375 25.85 11.07625 6.36875 7.3225 9.54 17.22 9.54 29.675"
									/>
								</mask>
								<path
									mask="url(#m-mask)"
									fill="currentColor"
									d="M211.80734 139.0875c-3.18125 16.36625-28.4925 34.2775-57.5625 37.74875-15.15875 1.80875-30.08375 3.47125-45.99875 2.74125-26.0275-1.1925-46.565-6.2125-46.565-6.2125 0 2.53375.15625 4.94625.46875 7.2025 3.38375 25.68625 25.47 27.225 46.39125 27.9425 21.11625.7225 39.91875-5.20625 39.91875-5.20625l.8675 19.09s-14.77 7.93125-41.08125 9.39c-14.50875.7975-32.52375-.365-53.50625-5.91875C9.23234 213.82 1.40609 165.31125.20859 116.09125c-.365-14.61375-.14-28.39375-.14-39.91875 0-50.33 32.97625-65.0825 32.97625-65.0825C49.67234 3.45375 78.20359.2425 107.86484 0h.72875c29.66125.2425 58.21125 3.45375 74.8375 11.09 0 0 32.975 14.7525 32.975 65.0825 0 0 .41375 37.13375-4.59875 62.915"
								/>
							</svg>
							<p class="social-label">Mastodon</p>
						</div>
					</a>
				{/if}
				{#if member.socials.firefish}
					<a href={member.socials.firefish}>
						<div class="social">
							<svg
								viewBox="0 0 1024 1024"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M530.286 438.893H54.8572C24.56 438.893 0 463.451 0 493.746V969.141C0 999.436 24.56 1023.99 54.8572 1023.99H530.286C560.583 1023.99 585.143 999.436 585.143 969.141V493.746C585.143 463.451 560.583 438.893 530.286 438.893ZM146.286 877.719C105.891 877.719 73.1429 844.973 73.1429 804.581C73.1429 764.19 105.891 731.444 146.286 731.444C186.68 731.444 219.429 764.19 219.429 804.581C219.429 844.973 186.68 877.719 146.286 877.719ZM329.143 877.719C288.749 877.719 256 844.973 256 804.581C256 764.19 288.749 731.444 329.143 731.444C369.537 731.444 402.286 764.19 402.286 804.581C402.286 844.973 369.537 877.719 329.143 877.719Z"
								/>
								<path
									d="M530.286 438.899H54.8572C24.56 438.899 0 463.457 0 493.752V969.147C0 999.442 24.56 1024 54.8572 1024H530.286C560.583 1024 585.143 999.442 585.143 969.147V493.752C585.143 463.457 560.583 438.899 530.286 438.899ZM146.286 877.725C105.891 877.725 73.1429 844.979 73.1429 804.587C73.1429 764.196 105.891 731.449 146.286 731.449C186.68 731.449 219.429 764.196 219.429 804.587C219.429 844.979 186.68 877.725 146.286 877.725ZM329.143 877.725C288.749 877.725 256 844.979 256 804.587C256 764.196 288.749 731.449 329.143 731.449C369.537 731.449 402.286 764.196 402.286 804.587C402.286 844.979 369.537 877.725 329.143 877.725Z"
								/>
								<path
									d="M530.092 365.573H278.697C248.423 365.573 223.875 341.031 223.875 310.754V59.3772C223.875 10.5406 282.926 -13.9148 317.457 20.6142L568.852 271.991C603.389 306.525 578.926 365.567 530.086 365.567L530.092 365.573Z"
								/>
								<path
									d="M968.377 804.581H713.8C683.143 804.581 658.286 779.726 658.286 749.071V494.512C658.286 445.058 718.08 420.289 753.051 455.258L1007.63 709.817C1042.6 744.786 1017.83 804.576 968.371 804.576L968.377 804.581Z"
								/>
								<path
									d="M968.377 365.693H713.8C683.143 365.693 658.286 340.837 658.286 310.182V55.6232C658.286 6.16953 718.08 -18.6001 753.051 16.3688L1007.63 270.928C1042.6 305.897 1017.83 365.687 968.371 365.687L968.377 365.693Z"
								/>
							</svg>
							<p class="social-label">Firefish</p>
						</div>
					</a>
				{/if}
				{#if member.socials.sharkey}
					<a href={member.socials.sharkey}>
						<div class="social">
							<svg 
								xmlns="http://www.w3.org/2000/svg" 
								xmlns:xlink="http://www.w3.org/1999/xlink" 
								version="1.1" 
								x="0px" 
								y="0px" 
								viewBox="0 0 100 100" 
								enable-background="new 0 0 100 100" 
								xml:space="preserve"
							>
								<path fill="#FFFFFF" d="M33.649,93.08l-2.191,3.652h38.063l-2.389-3.575C81.623,87.588,92.611,74.97,95.9,59.501H5.08  C8.353,74.9,19.256,87.475,33.649,93.08z"/>
								<path fill="#FFFFFF" d="M96.922,49.811H4.059c0,2.273,0.17,4.505,0.486,6.69h91.891C96.751,54.314,96.922,52.084,96.922,49.811z"/>
								<path fill="#FFFFFF" d="M28.615,49.811c0,0,18.547-32.148,45.75-30.294c-6.183,12.365-4.265,30.294-4.265,30.294"/>
							</svg>
							<p class="social-label">Sharkey</p>
						</div>
					</a>
				{/if}
				{#if member.socials.github}
					<a href="https://github.com/{member.socials.github}">
						<div class="social">
							<svg
								aria-hidden="true"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								viewBox="1.4 1.4 33.2 33.2"
								enable-background="new 0 0 36 36"
								xml:space="preserve"
							>
								<path
									fill-rule="evenodd"
									clip-rule="evenodd"
									fill="currentColor"
									d="M18,1.4C9,1.4,1.7,8.7,1.7,17.7c0,7.2,4.7,13.3,11.1,15.5  c0.8,0.1,1.1-0.4,1.1-0.8c0-0.4,0-1.4,0-2.8c-4.5,1-5.5-2.2-5.5-2.2c-0.7-1.9-1.8-2.4-1.8-2.4c-1.5-1,0.1-1,0.1-1  c1.6,0.1,2.5,1.7,2.5,1.7c1.5,2.5,3.8,1.8,4.7,1.4c0.1-1.1,0.6-1.8,1-2.2c-3.6-0.4-7.4-1.8-7.4-8.1c0-1.8,0.6-3.2,1.7-4.4  c-0.2-0.4-0.7-2.1,0.2-4.3c0,0,1.4-0.4,4.5,1.7c1.3-0.4,2.7-0.5,4.1-0.5c1.4,0,2.8,0.2,4.1,0.5c3.1-2.1,4.5-1.7,4.5-1.7  c0.9,2.2,0.3,3.9,0.2,4.3c1,1.1,1.7,2.6,1.7,4.4c0,6.3-3.8,7.6-7.4,8c0.6,0.5,1.1,1.5,1.1,3c0,2.2,0,3.9,0,4.5  c0,0.4,0.3,0.9,1.1,0.8c6.5-2.2,11.1-8.3,11.1-15.5C34.3,8.7,27,1.4,18,1.4z"
								/>
							</svg>
							<p class="social-label">GitHub</p>
						</div>
					</a>
				{/if}
				{#if member.socials.lastfm}
					<a href="https://last.fm/user/{member.socials.lastfm}">
						<div class="social">
							<svg
								class="member-social-icon"
								aria-label="Last.fm"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
								><path
									fill="currentColor"
									d="M225.8 367.1l-18.8-51s-30.5 34-76.2 34c-40.5 0-69.2-35.2-69.2-91.5 0-72.1 36.4-97.9 72.1-97.9 66.5 0 74.8 53.3 100.9 134.9 18.8 56.9 54 102.6 155.4 102.6 72.7 0 122-22.3 122-80.9 0-72.9-62.7-80.6-115-92.1-25.8-5.9-33.4-16.4-33.4-34 0-19.9 15.8-31.7 41.6-31.7 28.2 0 43.4 10.6 45.7 35.8l58.6-7c-4.7-52.8-41.1-74.5-100.9-74.5-52.8 0-104.4 19.9-104.4 83.9 0 39.9 19.4 65.1 68 76.8 44.9 10.6 79.8 13.8 79.8 45.7 0 21.7-21.1 30.5-61 30.5-59.2 0-83.9-31.1-97.9-73.9-32-96.8-43.6-163-161.3-163C45.7 113.8 0 168.3 0 261c0 89.1 45.7 137.2 127.9 137.2 66.2 0 97.9-31.1 97.9-31.1z"
								/></svg
							>
							<p class="social-label">Last.fm</p>
						</div>
					</a>
				{/if}
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
	.social-list > a {
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
	.social svg {
		width: 1.25rem;
		height: 1.25rem;
	}
	.social-label {
		min-width: 0;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>
