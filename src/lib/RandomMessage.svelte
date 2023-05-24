<script>
	import BasicMarkdown from '$lib/Discord/BasicMarkdown.svelte'
	import { onMount } from 'svelte'
	import { slide } from 'svelte/transition'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	let classList
	export let messages
	let splash
	function shuffle(a) {
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[a[i], a[j]] = [a[j], a[i]]
		}
		return a
	}
	onMount(() => {
		messages = shuffle(messages)
		let splashI = 0
		splash = messages[splashI]
		dispatch('update-message', {
			text: splash
		})
		let splashInterval = setInterval(() => {
			splashI += 1
			if (splashI >= messages.length) splashI = 0
			splash = messages[splashI]
			dispatch('update-message', {
				text: splash
			})
		}, 10000)
		return () => {
			clearInterval(splashInterval)
		}
	})
	export { classList as class }
</script>

{#key splash}
	<p class={classList} transition:slide>
		<BasicMarkdown text={splash ? splash : ''} />
	</p>
{/key}
