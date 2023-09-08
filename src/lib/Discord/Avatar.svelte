<script>
	import ImgAndFallback from '$lib/Discord/ImgAndFallback.svelte'
	export let member
</script>

<div
	style:--member-color={member.color}
	class="avatar"
	class:cat={member.isCat}
	aria-hidden="true"
>
	{#if member.avatar}
		<ImgAndFallback
			width="68"
			height="68"
			class="avatar-img"
			src={member.avatar}
			alt=""
		>
			<div
				class="avatar-img"
				style="background-color: var(--member-color); position: absolute; top: 0; bottom: 0; left: 0; right: 0;"
			/>
		</ImgAndFallback>
	{/if}
</div>

<style lang="postcss">
	.avatar {
		user-select: none;
		width: 80px;
		height: 80px;
		border-radius: 100%;
		border: 6px solid var(--background-color);
		background-color: var(--background-color);
		position: absolute;
		top: 10px;
		left: 16px;
	}
	.avatar :global(.avatar-img) {
		width: 100%;
		border-radius: 100%;
	}
	.cat {
		color: white;
		overflow: unset;
		background-color: unset !important;
	}
	.cat :global(.avatar-img) {
		border-radius: 100%;
		z-index: 1;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}

	@keyframes earwiggleleft {
		from {
			transform: rotate(37.6deg) skew(30deg);
		}
		25% {
			transform: rotate(10deg) skew(30deg);
		}
		50% {
			transform: rotate(20deg) skew(30deg);
		}
		75% {
			transform: rotate(0deg) skew(30deg);
		}
		to {
			transform: rotate(37.6deg) skew(30deg);
		}
	}

	@keyframes earwiggleright {
		from {
			transform: rotate(-37.6deg) skew(-30deg);
		}
		30% {
			transform: rotate(-10deg) skew(-30deg);
		}
		55% {
			transform: rotate(-20deg) skew(-30deg);
		}
		75% {
			transform: rotate(-0deg) skew(-30deg);
		}
		to {
			transform: rotate(-37.6deg) skew(-30deg);
		}
	}

	.cat :global(.img)::before,
	.cat :global(.img)::after {
		position: absolute;
		background: #df548f;
		border: solid 4px currentColor;
		box-sizing: border-box;
		content: '';
		display: inline-block;
		width: 50%;
		height: 50%;
		z-index: 0;
		pointer-events: none;
	}
	.cat :global(.img)::before {
		left: -4px;
		border-radius: 0 75% 75%;
		transform: rotate(37.5deg) skew(30deg);
	}
	.cat :global(.img)::after {
		right: -4px;
		border-radius: 75% 0 75% 75%;
		transform: rotate(-37.5deg) skew(-30deg);
	}
	.cat :global(.img):hover::before {
		animation: earwiggleleft 1s infinite;
	}
	.cat :global(.img):hover::after {
		animation: earwiggleright 1s infinite;
	}
</style>
