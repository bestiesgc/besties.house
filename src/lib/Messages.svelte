<script>
	import Message from '$lib/Message.svelte'
	import { beforeUpdate, afterUpdate, onMount } from 'svelte'
	export let messages

	let div
	let autoscroll = true
	let oldScrollHeight
	let oldScrollTop

	beforeUpdate(() => {
		if (!div) return
		let currentMaxScroll = div.scrollTopMax
		let currentScroll = div.scrollTop
		autoscroll = currentMaxScroll - currentScroll < 20
	})

	afterUpdate(() => {
		oldScrollHeight = div.scrollTopMax
		oldScrollTop = div.scrollTop
		if (autoscroll) div.scrollTo(0, div.scrollHeight)
	})

	onMount(() => {
		oldScrollHeight = div.scrollTopMax
		oldScrollTop = div.scrollTop
		function onResize() {
			let difference = oldScrollHeight - oldScrollTop
			div.scrollTo(0, div.scrollTopMax - difference)
			oldScrollHeight = div.scrollTopMax
			oldScrollTop = div.scrollTop
		}
		function updateScrollTop() {
			oldScrollHeight = div.scrollTopMax
			oldScrollTop = div.scrollTop
		}
		div.scrollTo(0, div.scrollHeight)
		window.addEventListener('resize', onResize)
		div.addEventListener('scroll', updateScrollTop)
		return () => {
			window.removeEventListener('resize', onResize)
			div.removeEventListener('scroll', updateScrollTop)
		}
	})
</script>

<div class="chat-messages-wrapper" bind:this={div} aria-live="polite">
	<ol class="chat-messages">
		{#each messages as message, i}
			<Message
				{message}
				full={!(i - 1 >= 0 && messages[i - 1].author === message.author)}
			/>
		{/each}
	</ol>
</div>
