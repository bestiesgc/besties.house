<script>
	import { run } from 'svelte/legacy';

	/** @type {{ms: any}} */
	let { ms } = $props();
	let durationStr = $state()
	run(() => {
		const minutes = Math.floor(ms / 1000 / 60)
		const seconds = Math.floor(ms / 1000 - minutes * 60)
		durationStr = `${minutes}:${seconds.toString().padStart(2, '0')}`
	});
</script>

{durationStr}
