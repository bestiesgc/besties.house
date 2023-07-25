<script>
	export let project
	let urlText
	if (project.url) {
		let urlObj = new URL(project.url)
		urlText = urlObj.hostname
		if (urlObj.pathname !== '/') urlText += urlObj.pathname
	}
</script>

<a href={project.url} class="project-item-wrapper">
	<div class="project-item">
		<div class="project-header dot-bg">
			<div class="project-icon-wrapper">
				<img src={project.iconUrl} alt="" aria-hidden="true" />
			</div>
			<p class="project-name">{project.name}</p>
		</div>
		<div class="project-meta">
			<p class="project-description">
				{project.description}
			</p>
		</div>
	</div>
</a>

<style lang="postcss">
	.project-item:hover .dot-bg::before {
		background-position-x: var(--dot-size);
	}
	.project-item-wrapper {
		color: inherit;
		text-decoration: none;
	}
	.project-item {
		overflow: hidden;
		border-radius: 0.5rem;
		height: 100%;
		display: grid;
		grid-template-rows: min-content 1fr;
	}
	.project-header {
		padding: 0.5rem;
		display: grid;
		grid-template-columns: min-content 1fr;
		gap: 0.5rem;
	}
	.project-icon-wrapper {
		user-select: none;
		display: grid;
		align-items: center;
	}
	.project-icon-wrapper > img {
		width: 1.5rem;
		height: 1.5rem;
	}
	.project-meta {
		background-color: var(--violet-300);
		padding: 0.5rem 0.5rem;
		height: 100%;
	}
</style>
