<script>
	import { onMount } from 'svelte'
	/** @type {{text: any}} */
	let { text } = $props();
	let markdownElement = $state()

	const ATTR_REGEX = /[&"]/g
	const CONTENT_REGEX = /[&<]/g
	function escape(value, isAttribute = false) {
		const str = String(value)
		const pattern = isAttribute ? ATTR_REGEX : CONTENT_REGEX
		pattern.lastIndex = 0
		let escaped = ''
		let last = 0
		while (pattern.test(str)) {
			const i = pattern.lastIndex - 1
			const ch = str[i]
			escaped +=
				str.substring(last, i) +
				(ch === '&' ? '&amp;' : ch === '"' ? '&quot;' : '&lt;')
			last = i + 1
		}
		return escaped + str.substring(last)
	}

	function obscure(text) {
		const chars =
			'#$%()*+-/0123456789=?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[|]^_abcdefghijklmnopqrstuvwxyz{}~'
		const newText = text.split('')
		for (let i = 0; i < newText.length; i++) {
			newText[i] = chars[Math.round(Math.random() * (chars.length - 1))]
		}
		return newText
			.join('')
			.match(/.{1,3}/g)
			.map(e => `<span>${escape(e)}</span>`)
			.join('')
	}

	onMount(() => {
		let html = escape(text)
		// minecraft's obscured text formatting, using &ktext to obscure&r syntax
		html = html.replace(/&amp;k(.*?)&amp;r/gm, (e, html) => {
			return `<span class="sr-only">[REDACTED]</span><span class="glitchy-text" aria-hidden="true">${obscure(
				html
			)}</span>`
		})
		// urls to anchor tags
		html = html.replace(
			/https?:\/\/.*?(\.[^./<>\s]{2,})+(\/[^\s<>]*)?/gm,
			e => {
				return `<a href="${escape(e, true)}">${escape(e)}</a>`
			}
		)
		// **bold**
		html = html.replace(/\*\*(.*?)\*\*/gm, (e, h) => {
			return `<b>${escape(h)}</b>`
		})
		// *italics*
		html = html.replace(/\*(.*?)\*/gm, (e, h) => {
			return `<i>${escape(h)}</i>`
		})
		// _italics_
		html = html.replace(/_(.*?)_/gm, (e, h) => {
			return `<i>${escape(h)}</i>`
		})
		markdownElement.innerHTML = html
		const glitchyTexts = markdownElement.querySelectorAll('.glitchy-text')
		const interval = setInterval(() => {
			for (const el of glitchyTexts) {
				el.innerHTML = obscure(el.innerText)
			}
		}, 50)
		return () => clearInterval(interval)
	})
</script>

<span class="md" bind:this={markdownElement}>
	{text}
</span>

<style lang="postcss">
	.md :global(.glitchy-text) {
		font-family: 'Monocraft', monospace;
	}
	.md :global(.glitchy-text > span) {
		display: inline-block;
		white-space: nowrap;
	}
</style>
