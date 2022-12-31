<script>
	import { scale, fade } from 'svelte/transition'
    import { onMount } from "svelte";


	export let attachment
	let showFullView = false
	let fullViewElem
	function toggleFullView(e) {
		showFullView = !showFullView
	}
	function onFullViewClickout(e) {
		// if you clicked on the image, then youre not clicking out
		if (e.target.tagName=='IMG') return
		showFullView = false
	}
	$: {
		if (fullViewElem) {
			document.body.appendChild(fullViewElem)
		}
	}
	function checkForEsc(e) {
		if (e.key==='Escape') showFullView = false
	}
	onMount(() => {
		document.body.addEventListener('keydown', checkForEsc)
		return e => {
			document.body.removeEventListener('keydown', checkForEsc)
		}
	})
</script>

{#if attachment.type=='img'}
<button class="attachment-button" on:click={toggleFullView}>
	<img src="{attachment.url}" alt="{attachment.alt}" class:unloaded={attachment.loaded==undefined||false} on:load={e => attachment.loaded = true}>
</button>
{/if}


{#if showFullView}
<!-- there is an event listener added to check for the escape key! -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div transition:fade={{duration: 100}} class="attachment-full-view" bind:this={fullViewElem} on:click={onFullViewClickout}>
	<img transition:scale={{start: 0.9, duration: 100}} src="{attachment.url}" alt="{attachment.alt}">
</div>
{/if}