<script>
	import { onMount } from 'svelte'
	export let shader
	let loaded = false
	export let doResize = true
	export let width = null
	export let height = null
	export let style = ''
	let className = ''
	export { className as class }
	let animate = false

	const vertexShader = `attribute vec2 inPos;
void main()
{
    gl_Position = vec4(inPos, 0.0, 1.0);
}`
	const fragmentShader = `
#ifdef GL_ES
precision highp float;
precision highp int;
#endif
float round( float x ) { return floor(x+0.5); }
vec2 round(vec2 x) { return floor(x + 0.5); }
vec3 round(vec3 x) { return floor(x + 0.5); }
vec4 round(vec4 x) { return floor(x + 0.5); }
float trunc( float x, float n ) { return floor(x*n)/n; }
mat3 transpose(mat3 m) { return mat3(m[0].x, m[1].x, m[2].x, m[0].y, m[1].y, m[2].y, m[0].z, m[1].z, m[2].z); }
float determinant( in mat2 m ) { return m[0][0]*m[1][1] - m[0][1]*m[1][0]; }
float determinant( mat4 m ) { float b00 = m[0][0] * m[1][1] - m[0][1] * m[1][0], b01 = m[0][0] * m[1][2] - m[0][2] * m[1][0], b02 = m[0][0] * m[1][3] - m[0][3] * m[1][0], b03 = m[0][1] * m[1][2] - m[0][2] * m[1][1], b04 = m[0][1] * m[1][3] - m[0][3] * m[1][1], b05 = m[0][2] * m[1][3] - m[0][3] * m[1][2], b06 = m[2][0] * m[3][1] - m[2][1] * m[3][0], b07 = m[2][0] * m[3][2] - m[2][2] * m[3][0], b08 = m[2][0] * m[3][3] - m[2][3] * m[3][0], b09 = m[2][1] * m[3][2] - m[2][2] * m[3][1], b10 = m[2][1] * m[3][3] - m[2][3] * m[3][1], b11 = m[2][2] * m[3][3] - m[2][3] * m[3][2];  return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;}
mat2 inverse(mat2 m) { float det = determinant(m); return mat2(m[1][1], -m[0][1], -m[1][0], m[0][0]) / det; }
mat4 inverse(mat4 m ) { float inv0 = m[1].y*m[2].z*m[3].w - m[1].y*m[2].w*m[3].z - m[2].y*m[1].z*m[3].w + m[2].y*m[1].w*m[3].z + m[3].y*m[1].z*m[2].w - m[3].y*m[1].w*m[2].z; float inv4 = -m[1].x*m[2].z*m[3].w + m[1].x*m[2].w*m[3].z + m[2].x*m[1].z*m[3].w - m[2].x*m[1].w*m[3].z - m[3].x*m[1].z*m[2].w + m[3].x*m[1].w*m[2].z; float inv8 = m[1].x*m[2].y*m[3].w - m[1].x*m[2].w*m[3].y - m[2].x  * m[1].y * m[3].w + m[2].x  * m[1].w * m[3].y + m[3].x * m[1].y * m[2].w - m[3].x * m[1].w * m[2].y; float inv12 = -m[1].x  * m[2].y * m[3].z + m[1].x  * m[2].z * m[3].y +m[2].x  * m[1].y * m[3].z - m[2].x  * m[1].z * m[3].y - m[3].x * m[1].y * m[2].z + m[3].x * m[1].z * m[2].y; float inv1 = -m[0].y*m[2].z * m[3].w + m[0].y*m[2].w * m[3].z + m[2].y  * m[0].z * m[3].w - m[2].y  * m[0].w * m[3].z - m[3].y * m[0].z * m[2].w + m[3].y * m[0].w * m[2].z; float inv5 = m[0].x  * m[2].z * m[3].w - m[0].x  * m[2].w * m[3].z - m[2].x  * m[0].z * m[3].w + m[2].x  * m[0].w * m[3].z + m[3].x * m[0].z * m[2].w - m[3].x * m[0].w * m[2].z; float inv9 = -m[0].x  * m[2].y * m[3].w +  m[0].x  * m[2].w * m[3].y + m[2].x  * m[0].y * m[3].w - m[2].x  * m[0].w * m[3].y - m[3].x * m[0].y * m[2].w + m[3].x * m[0].w * m[2].y; float inv13 = m[0].x  * m[2].y * m[3].z - m[0].x  * m[2].z * m[3].y - m[2].x  * m[0].y * m[3].z + m[2].x  * m[0].z * m[3].y + m[3].x * m[0].y * m[2].z - m[3].x * m[0].z * m[2].y; float inv2 = m[0].y  * m[1].z * m[3].w - m[0].y  * m[1].w * m[3].z - m[1].y  * m[0].z * m[3].w + m[1].y  * m[0].w * m[3].z + m[3].y * m[0].z * m[1].w - m[3].y * m[0].w * m[1].z; float inv6 = -m[0].x  * m[1].z * m[3].w + m[0].x  * m[1].w * m[3].z + m[1].x  * m[0].z * m[3].w - m[1].x  * m[0].w * m[3].z - m[3].x * m[0].z * m[1].w + m[3].x * m[0].w * m[1].z; float inv10 = m[0].x  * m[1].y * m[3].w - m[0].x  * m[1].w * m[3].y - m[1].x  * m[0].y * m[3].w + m[1].x  * m[0].w * m[3].y + m[3].x * m[0].y * m[1].w - m[3].x * m[0].w * m[1].y; float inv14 = -m[0].x  * m[1].y * m[3].z + m[0].x  * m[1].z * m[3].y + m[1].x  * m[0].y * m[3].z - m[1].x  * m[0].z * m[3].y - m[3].x * m[0].y * m[1].z + m[3].x * m[0].z * m[1].y; float inv3 = -m[0].y * m[1].z * m[2].w + m[0].y * m[1].w * m[2].z + m[1].y * m[0].z * m[2].w - m[1].y * m[0].w * m[2].z - m[2].y * m[0].z * m[1].w + m[2].y * m[0].w * m[1].z; float inv7 = m[0].x * m[1].z * m[2].w - m[0].x * m[1].w * m[2].z - m[1].x * m[0].z * m[2].w + m[1].x * m[0].w * m[2].z + m[2].x * m[0].z * m[1].w - m[2].x * m[0].w * m[1].z; float inv11 = -m[0].x * m[1].y * m[2].w + m[0].x * m[1].w * m[2].y + m[1].x * m[0].y * m[2].w - m[1].x * m[0].w * m[2].y - m[2].x * m[0].y * m[1].w + m[2].x * m[0].w * m[1].y; float inv15 = m[0].x * m[1].y * m[2].z - m[0].x * m[1].z * m[2].y - m[1].x * m[0].y * m[2].z + m[1].x * m[0].z * m[2].y + m[2].x * m[0].y * m[1].z - m[2].x * m[0].z * m[1].y; float det = m[0].x * inv0 + m[0].y * inv4 + m[0].z * inv8 + m[0].w * inv12; det = 1.0 / det; return det*mat4( inv0, inv1, inv2, inv3,inv4, inv5, inv6, inv7,inv8, inv9, inv10, inv11,inv12, inv13, inv14, inv15);}
float sinh(float x)  { return (exp(x)-exp(-x))/2.; }
float cosh(float x)  { return (exp(x)+exp(-x))/2.; }
float tanh(float x)  { return sinh(x)/cosh(x); }
float coth(float x)  { return cosh(x)/sinh(x); }
float sech(float x)  { return 1./cosh(x); }
float csch(float x)  { return 1./sinh(x); }
float asinh(float x) { return    log(x+sqrt(x*x+1.)); }
float acosh(float x) { return    log(x+sqrt(x*x-1.)); }
float atanh(float x) { return .5*log((1.+x)/(1.-x)); }
float acoth(float x) { return .5*log((x+1.)/(x-1.)); }
float asech(float x) { return    log((1.+sqrt(1.-x*x))/x); }
float acsch(float x) { return    log((1.+sqrt(1.+x*x))/x); }

uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;

${shader}

void main() 
{
    mainImage( gl_FragColor, gl_FragCoord.xy );
}
`
	let doneAnimating = false

	onMount(() => {
		var gl = null
		var canvas,
			vp_size,
			bufObj = {},
			mousepos = [0, 0]
		let progDraw

		function mouseHandler(e) {
			mousepos = [e.clientX, e.clientY]
		}

		let query = window.matchMedia(`(prefers-reduced-motion: reduce)`)
		animate = !(query === true ? true : query.matches === true)

		function initScene() {
			let opts = {
				alpha: false,
				depth: false,
				stencil: false,
				premultipliedAlpha: false,
				antialias: false,
				preserveDrawingBuffer: true,
				powerPreference: 'high-performance'
			}
			canvas = document.querySelector('canvas')
			if (gl === null) gl = canvas.getContext('webgl2', opts)
			if (gl === null) gl = canvas.getContext('experimental-webgl2', opts)
			if (gl === null) gl = canvas.getContext('webgl', opts)
			if (gl === null) gl = canvas.getContext('experimental-webgl', opts)

			if (!gl) return

			canvas.addEventListener('mousemove', mouseHandler)

			progDraw = gl.createProgram()
			let sources = [
				{
					type: gl.VERTEX_SHADER,
					code: vertexShader
				},
				{
					type: gl.FRAGMENT_SHADER,
					code: fragmentShader
				}
			]
			for (let source of sources) {
				let shaderObj = gl.createShader(source.type)
				gl.shaderSource(shaderObj, source.code)
				gl.compileShader(shaderObj)
				let status = gl.getShaderParameter(shaderObj, gl.COMPILE_STATUS)
				if (!status) alert(gl.getShaderInfoLog(shaderObj))
				gl.attachShader(progDraw, shaderObj)
			}
			gl.linkProgram(progDraw)
			let status = gl.getProgramParameter(progDraw, gl.LINK_STATUS)
			if (!status) alert(gl.getProgramInfoLog(progDraw))
			progDraw.inPos = gl.getAttribLocation(progDraw, 'inPos')
			progDraw.iTime = gl.getUniformLocation(progDraw, 'iTime')
			progDraw.iMouse = gl.getUniformLocation(progDraw, 'iMouse')
			progDraw.iResolution = gl.getUniformLocation(progDraw, 'iResolution')
			gl.useProgram(progDraw)

			var pos = [-1, -1, 1, -1, 1, 1, -1, 1]
			var inx = [0, 1, 2, 0, 2, 3]
			bufObj.pos = gl.createBuffer()
			gl.bindBuffer(gl.ARRAY_BUFFER, bufObj.pos)
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(pos), gl.STATIC_DRAW)
			bufObj.inx = gl.createBuffer()
			bufObj.inx.len = inx.length
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufObj.inx)
			gl.bufferData(
				gl.ELEMENT_ARRAY_BUFFER,
				new Uint16Array(inx),
				gl.STATIC_DRAW
			)
			gl.enableVertexAttribArray(progDraw.inPos)
			gl.vertexAttribPointer(progDraw.inPos, 2, gl.FLOAT, false, 0, 0)

			gl.enable(gl.DEPTH_TEST)
			gl.clearColor(0.0, 0.0, 0.0, 1.0)

			if (doResize) {
				window.onresize = resize
			}
			resize()
			requestAnimationFrame(render)
			doneAnimating = !animate
		}

		function resize() {
			if (width && height) {
				vp_size = [width, height]
			} else {
				vp_size = [canvas.clientWidth, canvas.clientHeight]
			}
			canvas.width = vp_size[0]
			canvas.height = vp_size[1]
		}

		let startOffset = Math.random() * 10000

		function render(deltaMS) {
			gl.viewport(0, 0, canvas.width, canvas.height)
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

			gl.uniform1f(progDraw.iTime, startOffset + deltaMS / 1000.0)
			gl.uniform2f(progDraw.iResolution, canvas.width, canvas.height)
			gl.uniform2f(progDraw.iMouse, mousepos[0], mousepos[1])
			gl.drawElements(gl.TRIANGLES, bufObj.inx.len, gl.UNSIGNED_SHORT, 0)
			if (!doneAnimating) requestAnimationFrame(render)
			loaded = true
		}

		initScene()
		return () => {
			doneAnimating = true
			canvas.removeEventListener('mousemove', mouseHandler)
		}
	})
</script>

{#if doneAnimating}
	<div {style} class="{className} tooslow" />
{:else}
	<canvas {style} class="{className} {loaded ? 'loaded' : ''}" />
{/if}

<style>
	canvas {
		opacity: 0;
		transition: opacity 2s;
	}
	canvas.loaded {
		opacity: 1;
	}
</style>
