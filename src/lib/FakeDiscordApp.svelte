<script>
	import TextChannelIcon from '$lib/Icons/TextChannelIcon.svelte'
	import MembersIcon from '$lib/Icons/MembersIcon.svelte'
	import MemberList from '$lib/MemberList.svelte'
	import Messages from '$lib/Messages.svelte'
	import { onMount } from 'svelte'
	export let members = []
	export let channel = {
		name: 'general',
		messages: []
	}
	export let channels = []
	let mobileShowMembers = false
	let mobileShowSidebar = false
	let isMobile = false

	function handleMobileChange(e) {
		isMobile = e.matches
	}

	onMount(() => {
		const mediaQuery = window.matchMedia('(max-width: 700px)')
		// Register event listener
		mediaQuery.addEventListener('change', handleMobileChange)
		handleMobileChange(mediaQuery)
	})
</script>

<div
	class="layout-wrapper"
	class:show-member-list={mobileShowMembers}
	class:show-sidebar={mobileShowSidebar}
>
	<div
		class="sidebar"
		aria-hidden={isMobile && !mobileShowSidebar}
		aria-label="sidebar"
	>
		<!-- server list is decorative -->
		<div class="server-list" aria-hidden="true">
			<div class="server-item discord-logo-icon">
				<svg
					role="img"
					aria-label="Discord logo"
					class="server-icon"
					style="display: block; width: 48px; height: 48px;"
					viewBox="0 0 48 48"
				>
					<path
						fill="#ffffff"
						d="M34.48,14.44a25.11,25.11,0,0,0-6.21-1.92,17.28,17.28,0,0,0-.79,1.62,23.6,23.6,0,0,0-6.92,0,17.38,17.38,0,0,0-.8-1.62,25.11,25.11,0,0,0-6.21,1.92A25.08,25.08,0,0,0,9.11,31.56a23.65,23.65,0,0,0,3.66,2.25,25.79,25.79,0,0,0,3.91,1.63,18.33,18.33,0,0,0,1.63-2.67,15.54,15.54,0,0,1-2.57-1.23l.63-.47a18,18,0,0,0,15.27,0c.2.16.41.32.63.47a17,17,0,0,1-2.58,1.23,17.38,17.38,0,0,0,1.64,2.67A24.79,24.79,0,0,0,39,31.6a26.49,26.49,0,0,0,.14-2.66A25.17,25.17,0,0,0,34.48,14.44ZM19,28.12a2.89,2.89,0,0,1-2.72-3A2.94,2.94,0,0,1,16.38,24,2.81,2.81,0,0,1,17,23a2.54,2.54,0,0,1,.92-.67A2.68,2.68,0,0,1,19,22.06a2.72,2.72,0,0,1,1.12.24A2.63,2.63,0,0,1,21,23a2.81,2.81,0,0,1,.57,1,2.94,2.94,0,0,1,.11,1.14A2.92,2.92,0,0,1,21,27.17,2.85,2.85,0,0,1,19,28.12Zm10,0a2.85,2.85,0,0,1-2-.95,2.92,2.92,0,0,1-.74-2.07A2.83,2.83,0,0,1,26.43,24,2.77,2.77,0,0,1,27,23a2.73,2.73,0,0,1,.91-.66A2.83,2.83,0,0,1,29,22.11a2.78,2.78,0,0,1,1.1.23A2.65,2.65,0,0,1,31.6,24a2.66,2.66,0,0,1,.13,1.12,2.89,2.89,0,0,1-2.71,3Z"
					/>
				</svg>
			</div>
			<div class="server-list-divider" />
			<div class="server-item" selected>
				<img class="server-icon" src="/besties-server-icon.webp" alt="" />
			</div>
		</div>
		<heading aria-level="2" class="server-heading">
			<div aria-label="server name" class="server-title line-clamp">
				UCB (United Coalition of Besties)
			</div>
		</heading>
		<div class="channel-list" role="list" aria-label="channels">
			{#each channels as channelItem}
				{#if channelItem.group}
					<div
						role="list"
						class="channel-group-wrapper"
						aria-label={channelItem.name}
					>
						<div class="channel-group-label">
							<div class="channel-group-title">text channels</div>
						</div>
						{#each channelItem.channels as channelItem}
							<a href={channelItem.path}>
								<div
									class="channel-item"
									selected={channelItem.name == channel.name || null}
								>
									<TextChannelIcon ariaHidden="true" class="channel-icon" />
									<div class="channel-item-title">{channelItem.name}</div>
								</div>
							</a>
						{/each}
					</div>
				{:else}
					<a href={channelItem.path}>
						<div
							class="channel-item"
							selected={channelItem.name == channel.name || null}
						>
							<TextChannelIcon ariaHidden="true" class="channel-icon" />
							<div class="channel-item-title">{channelItem.name}</div>
						</div>
					</a>
				{/if}
			{/each}
		</div>
	</div>
	<div class="main-layout">
		<heading aria-level="1" class="channel-heading">
			<button
				aria-label="show sidebar"
				class="hamburger-icon"
				on:click={() => (mobileShowSidebar = !mobileShowSidebar)}
			>
				<div />
				<div />
				<div />
			</button>
			<TextChannelIcon ariaHidden="true" class="channel-icon" />
			<div class="channel-title">{channel.name}</div>
			<button
				aria-label="show member list"
				class="toggle-members-list-button"
				on:click={() => (mobileShowMembers = !mobileShowMembers)}
			>
				<MembersIcon />
			</button>
		</heading>
		<div aria-label="messages" class="chat-wrapper">
			<Messages messages={channel.messages} />
			<!-- fake, decorative message input doesnt need to be shown -->
			<div class="chat-input" aria-hidden="true">
				<div class="line-clamp">
					You do not have permission to send messages in this channel.
				</div>
			</div>
		</div>
		<div
			role="list"
			aria-label="members"
			class="member-list"
			aria-hidden={isMobile && !mobileShowMembers}
		>
			<MemberList {members} />
		</div>
	</div>
</div>
