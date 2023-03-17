<script>
	let classList = ''
	export let ariaHidden = false
	export { classList as class }
</script>

<svg class={classList} aria-hidden={ariaHidden} width="18" height="18"
	><g fill="none" fill-rule="evenodd"
		><path d="M0 0h18v18H0" /><path
			stroke="currentColor"
			d="M4.5 4.5l9 9"
			stroke-linecap="round"
		/><path
			stroke="currentColor"
			d="M13.5 4.5l-9 9"
			stroke-linecap="round"
		/></g
	></svg
>

<style>
	path {
		stroke-dasharray: 7;
		stroke-dashoffset: 1;
	}
</style>
