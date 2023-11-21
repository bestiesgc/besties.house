<script>
	export let ms
	let durationStr
	$: {
		let minutes = Math.floor(ms / 1000 / 60)
		let seconds = Math.floor(ms / 1000 - minutes * 60)
		durationStr = `${minutes}:${seconds.toString().padStart(2, '0')}`
	}
</script>

{durationStr}
