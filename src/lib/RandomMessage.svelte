<script>
	import BasicMarkdown from '$lib/BasicMarkdown.svelte'
	import { onMount, createEventDispatcher } from 'svelte'
	import { slide } from 'svelte/transition'

	const dispatch = createEventDispatcher()

	/** @type {{class: any, messages: any}} */
	let { class: classList, messages = $bindable() } = $props()
	let splash = $state()
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
		const splashInterval = setInterval(() => {
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
</script>

{#key splash}
	<p data-nosnippet class={classList} transition:slide>
		<BasicMarkdown text={splash ? splash : ''} />
	</p>
{/key}
