<script>
	let classList
	export let src
	export let alt
	export let width
	export let height
	export { classList as class }
</script>

<div class="img">
	<img {src} {width} {height} {alt} draggable="false" class={classList} />
</div>
