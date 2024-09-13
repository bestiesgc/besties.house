<script>
	import RandomMessage from '$lib/RandomMessage.svelte'
	import GlitchyBg from '$lib/GlitchyBg.svelte'
	export let splashes
	function handleRandomMessageUpdate(e) {
		document.title = `besties - ${e.detail.text}`
	}
</script>

<div class="hero">
	<GlitchyBg />
	<h1 class="besties-heading">besties</h1>
	<RandomMessage
		on:update-message={handleRandomMessageUpdate}
		class="besties-splash"
		messages={splashes}
	/>
</div>

<style lang="postcss">
	.hero {
		position: relative;
		padding: 0 2rem;
		/* iPhone notch when viewing horizontally */
		@supports (padding: max(0px)) {
			padding-left: calc(env(safe-area-inset-left) + 2rem);
			padding-right: calc(env(safe-area-inset-right) + 2rem);
		}
		text-align: center;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		--negative-bottom-margin: 0rem;
		min-height: calc(100vh - 12rem);
		color: #a39fb2;
		background-color: var(--violet-700);
	}

	.hero :global(canvas) {
		pointer-events: none;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
	}

	.besties-heading {
		color: var(--grey-100);
		font-weight: 700;
		margin: 0;
		transform: scaleY(0.8);
		position: relative;
		z-index: 2;
		--3d-anaglyph: 0.025em;
		--blend-mode: color-dodge;
	}

	.besties-heading::after {
		content: 'besties';
		position: absolute;
		left: 0;
		top: 0;
		transform: translateX(var(--3d-anaglyph));
		color: #12d3ff;
		mix-blend-mode: var(--blend-mode);
		pointer-events: none;
	}
	.besties-heading::before {
		content: 'besties';
		position: absolute;
		left: 0;
		transform: translateX(calc(var(--3d-anaglyph) * -1));
		color: #ff4343;
		mix-blend-mode: var(--blend-mode);
		pointer-events: none;
	}

	.hero :global(.besties-splash) {
		z-index: 2;
	}

	@media (min-width: 1050px) {
		.hero {
			position: fixed;
			left: 0;
			top: 0;
			bottom: 0;
			width: 24rem;
			pointer-events: none;
		}
	}
</style>
