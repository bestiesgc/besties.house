<script>
	/** @type {{button: any}} */
	let { button } = $props()
</script>

{#if button.href}
	<a class="button-badge" href={button.href}>
		<img
			loading="lazy"
			src={button.src}
			alt={button.alt}
			title={button.title ?? button.alt}
		/>
	</a>
{:else}
	<img
		class="button-badge"
		loading="lazy"
		src={button.src}
		alt={button.alt}
		title={button.title ?? button.alt}
	/>
{/if}

<style lang="postcss">
	img {
		width: 88px;
		height: 31px;
		user-select: none;
		vertical-align: middle;
		&:not([src$='.svg']) {
			image-rendering: pixelated;
		}
	}
	.button-badge {
		transition: opacity 0.125s;
	}
	@media (pointer: fine) {
		.button-badge:not(:focus):not(:hover) {
			opacity: 0.8;
		}
	}
</style>
