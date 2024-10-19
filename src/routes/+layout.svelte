<script>
	import '../css/app.pcss'
	import '../css/fonts.pcss'
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();
</script>

{@render children?.()}
