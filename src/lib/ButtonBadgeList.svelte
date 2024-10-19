<script>
	import ButtonBadge from './ButtonBadge.svelte'

	/** @type {{buttons: any, flex?: boolean}} */
	let { buttons, flex = false } = $props();
</script>

<div class="button-badges" class:flex>
	{#each buttons as button}
		<ButtonBadge {button} />
	{/each}
</div>

<style lang="postcss">
	.button-badges {
		&:not(.flex) {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(88px, 1fr));
		}
		&.flex {
			display: flex;
			flex-wrap: wrap;
		}
		width: 100%;
		gap: 0.5rem;
		justify-items: center;
	}
</style>
