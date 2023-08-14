<script>
	export let project
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
	@keyframes dot-bg-move {
		0% {
			background-position-y: 0;
		}
		100% {
			background-position-y: var(--dot-size);
		}
	}
	.dot-bg {
		z-index: 1;
		position: relative;
		--dot-size: 1rem;
		--dot-color: var(--grey-900);
		--bg-color: var(--violet-950);
	}
	.dot-bg::before {
		content: '';
		z-index: -1;
		position: absolute;
		inset: 0;
		background-color: var(--bg-color);
		background-image: radial-gradient(var(--dot-color) 1px, transparent 1px);
		background-size: var(--dot-size) var(--dot-size);
		background-position: 0 0;
		animation: 4s dot-bg-move linear infinite;
		transition: background-position-x 400ms;
	}
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
		background-color: var(--violet-800);
		padding: 0.5rem 0.5rem;
		height: 100%;
	}
</style>
