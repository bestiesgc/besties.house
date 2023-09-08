import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: true,
			strict: true
		}),
		inlineStyleThreshold: 9000
	},

	preprocess: [
		preprocess({
			postcss: true
		})
	]
}

export default config
