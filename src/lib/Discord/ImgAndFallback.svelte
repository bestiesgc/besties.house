<script>
	/** @type {{class: any, src: any, alt: any, width: any, height: any}} */
	let {
		class: classList,
		src,
		alt,
		width,
		height
	} = $props();
	
</script>

<div class="img">
	<img {src} {width} {height} {alt} draggable="false" class={classList} />
</div>
