<script>
	import ButtonBadge from './ButtonBadge.svelte'

	export let buttons
	export let flex = false
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
