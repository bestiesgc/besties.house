<script>
	import '../app.postcss'
</script>

<div class="downtime-disclosure">
	<p class="large">
		Recently our services have gone down on multiple occassions, completely out
		of our control. We're very sorry for this.
	</p>
	<p>
		We hope to move to different hosting which will hopefully not have the same
		issues, but in the meantime you can check <a
			href="https://status.besties.house">status.besties.house</a
		>, which we host on a separate server in case of this specific issue.
	</p>
</div>
<slot />

<style lang="postcss">
	.downtime-disclosure {
		padding: 0.5rem;
		background: var(--violet-800);
		color: #fff;
		z-index: 1000;
	}
	.downtime-disclosure :first-child {
		margin-top: 0;
	}
	.downtime-disclosure :last-child {
		margin-bottom: 0;
	}
	.downtime-disclosure p {
		margin: 0.8em 0;
	}
	.large {
		font-size: 1.25rem;
		font-weight: 600;
	}
</style>
