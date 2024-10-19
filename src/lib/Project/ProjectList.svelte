<script>
	import ProjectItem from './ProjectItem.svelte'
	/** @type {{projects: any}} */
	let { projects } = $props();
</script>

<div class="project-list-wrapper">
	{#each projects as project}
		<ProjectItem {project} />
	{/each}
</div>

<style lang="postcss">
	.project-list-wrapper {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
	}
</style>
