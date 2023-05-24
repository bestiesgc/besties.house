<script>
	import { onMount } from 'svelte'
	export let text
	let htmlContent
	let markdownEl
	function obscure(text) {
		let chars = `#$%()*+-/0123456789=?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[|]^_abcdefghijklmnopqrstuvwxyz{}~`
		let newText = text.split('')
		for (let i = 0; i < newText.length; i++) {
			newText[i] = chars[Math.round(Math.random() * (chars.length - 1))]
		}
		return newText
			.join('')
			.match(/.{1,3}/g)
			.map(e => `<span>${e}</span>`)
			.join('')
	}
	onMount(() => {
		let textElem = document.createElement('span')
		textElem.innerText = text
		let html = textElem.innerHTML
		// minecraft's obscured text formatting, using &ktext to obscure&r syntax
		html = html.replace(/&amp;k(.*?)&amp;r/gm, (e, html) => {
			return `<span class="screen-reader-only">[REDACTED]</span><span class="glitchy-text" aria-hidden="true">${obscure(
				html
			)}</span>`
		})
		// urls to anchor tags
		html = html.replace(
			/https?:\/\/.*?(\.[^./<>\s]{2,})+(\/[^\s<>]*)?/gm,
			e => {
				return `<a href="${e}">${e}</a>`
			}
		)
		// **bold**
		html = html.replace(/\*\*(.*?)\*\*/gm, (e, h) => {
			return `<b>${h}</b>`
		})
		// *italics*
		html = html.replace(/\*(.*?)\*/gm, (e, h) => {
			return `<i>${h}</i>`
		})
		// _italics_
		html = html.replace(/_(.*?)_/gm, (e, h) => {
			return `<i>${h}</i>`
		})
		markdownEl.innerHTML = html
		let glitchyTexts = markdownEl.querySelectorAll('.glitchy-text')
		let interval = setInterval(() => {
			for (let el of glitchyTexts) {
				el.innerHTML = obscure(el.innerText)
			}
		}, 50)
		markdownEl.querySelectorAll('.glitchy-text')
		return () => clearInterval(interval)
	})
</script>

<span bind:this={markdownEl}>
	{#if !htmlContent}
		{text}
	{:else}
		{@html htmlContent}
	{/if}
</span>
