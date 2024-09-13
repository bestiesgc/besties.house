import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import svelteSVG from '@hazycora/vite-plugin-svelte-svg'
import fontconf from 'fontconf/vite'

export default defineConfig({
	plugins: [
		fontconf(),
		svelteSVG({
			svgoConfig: {
				plugins: [
					{
						name: 'preset-default',
						params: {
							overrides: {
								removeViewBox: false,
								cleanupIds: false
							}
						}
					}
				]
			},
			requireSuffix: true
		}),
		sveltekit()
	]
})
