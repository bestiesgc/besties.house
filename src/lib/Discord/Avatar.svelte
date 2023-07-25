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
		<ImgAndFallback class="avatar-img" src={member.avatar} alt="">
			<div
				class="avatar-img"
				style="background-color: var(--member-color); position: absolute; top: 0; bottom: 0; left: 0; right: 0;"
			/>
		</ImgAndFallback>
	{/if}
	{#if member.blunt}
		<img src="/blunt.png" alt="" class="blunt" />
	{/if}
</div>

<style>
	div:global(.avatar) {
		user-select: none;
	}
</style>
