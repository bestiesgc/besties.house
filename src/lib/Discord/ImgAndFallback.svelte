<script>
	import { onMount } from 'svelte'
	let imgElem
	let blobUrl
	let loaded = false
	let classList
	export let src
	export let alt
	export let width
	export let height
	export { classList as class }
	onMount(async () => {
		if (loaded) return
		const response = await fetch(src)
		if (loaded) return
		const blob = await response.blob()
		blobUrl = URL.createObjectURL(blob)
		loaded = true
	})
</script>

<div class="img">
	{#if !loaded}
		<slot />
	{/if}
	<img
		bind:this={imgElem}
		src={blobUrl || src}
		{width}
		{height}
		{alt}
		class={classList}
		class:unloaded={!loaded}
		on:load={() => (loaded = true)}
	/>
</div>
