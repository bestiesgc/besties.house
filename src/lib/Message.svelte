<script>
	import { fly } from 'svelte/transition'
	import Timestamp from '$lib/Timestamp.svelte'
	import Attachment from '$lib/Attachment.svelte'
	import BasicMarkdown from '$lib/BasicMarkdown.svelte'
	import MemberPopout from '$lib/MemberPopout.svelte'
	export let full = true
	export let message
	let messageHeader
	let messageAvatar
	let popoutOpen = false
    function onMemberClick(e) {
        popoutOpen = !popoutOpen
    }
</script>

<li class="message" transition:fly={{y: 10, duration: 100}} style={message.author.style||null} class:message-with-header={full}>
	<h3 class="message-header" class:screen-reader-only={!full} bind:this={messageHeader}>
		<button style:color={message.author.color} class="message-author-name" on:click={onMemberClick}>
			{message.author.name}
		</button>
		<Timestamp class="message-timestamp" time={message.time}></Timestamp>

		{#if popoutOpen}
			<MemberPopout member={message.author} on:clickout={e=>popoutOpen=false} dontClickOut={[messageHeader,messageAvatar]} transitionX=5></MemberPopout>
		{/if}
	</h3>
	{#if full}
		<div style:background-color={message.author.color} class="message-author-avatar" bind:this={messageAvatar} on:click={onMemberClick} aria-hidden="true">
			{#if message.author.avatar}
				<img src="{message.author.avatar}" alt="">
			{/if}
		</div>
	{/if}
	<div class="message-content"><BasicMarkdown text={message.content??''}></BasicMarkdown></div>
	{#if message.attachments}
		<div class="message-attachments">
			{#each message.attachments as attachment}
				{#if attachment.type==='img'}
					<Attachment {attachment}></Attachment>
				{/if}
			{/each}
		</div>
	{/if}
</li>