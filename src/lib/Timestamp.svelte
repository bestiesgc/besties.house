<script>
    import { onMount } from "svelte";

	const formatOptions = {
		timeStyle: "short"
	}
	let classList
	export let time
	function doDatesMatch(date1, date2) {
		return date1.getDate()==date2.getDate()&&date1.getMonth()==date2.getMonth()&&date1.getFullYear()==date2.getFullYear()
	}
	let date = new Date(time)
	function getTimestampString(date) {
		let now = new Date()
		let yesterday = new Date()
		yesterday.setDate(now.getDate()-1)
		if (doDatesMatch(date, now)) {
			return 'Today at '+date.toLocaleTimeString([], formatOptions)
		}
		if (doDatesMatch(date, yesterday)) {
			return 'Yesterday at '+date.toLocaleTimeString([], formatOptions)
		}
		return date.toLocaleDateString()+' '+date.toLocaleTimeString([], formatOptions)
	}
	let string = getTimestampString(date)
	onMount(() => {
		let interval = setInterval(e => string = getTimestampString(date), 60000)
		return e => clearInterval(interval)
	})
	export {classList as class}
</script>
<time class={classList} aria-label="{string}" datetime="{date.toISOString()}">{string}</time>