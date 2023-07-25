<div class="project-list-wrapper">
	<slot />
</div>

<style>
	.project-list-wrapper {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
	}
</style>
