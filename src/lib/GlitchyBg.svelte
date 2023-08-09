<script>
	import Shadertoy from '$lib/Shadertoy.svelte'
	const shader = `vec2 GetGradient(vec2 intPos, float t) {
    
    // Uncomment for calculated rand
    float rand = fract(sin(dot(intPos, vec2(12.9898, 78.233))) * 43758.5453);
    
    // Texture-based rand (a bit faster on my GPU)
    // float rand = texture(iChannel0, intPos / 64.0).r;
    
    // Rotate gradient: random starting rotation, random rotation rate
    float angle = 6.283185 * rand + 4.0 * t * rand;
    return vec2(cos(angle), sin(angle));
}


float Pseudo3dNoise(vec3 pos) {
    vec2 i = floor(pos.xy);
    vec2 f = pos.xy - i;
    vec2 blend = f * f * (3.0 - 2.0 * f);
    float noiseVal = 
        mix(
            mix(
                dot(GetGradient(i + vec2(0, 0), pos.z), f - vec2(0, 0)),
                dot(GetGradient(i + vec2(1, 0), pos.z), f - vec2(1, 0)),
                blend.x),
            mix(
                dot(GetGradient(i + vec2(0, 1), pos.z), f - vec2(0, 1)),
                dot(GetGradient(i + vec2(1, 1), pos.z), f - vec2(1, 1)),
                blend.x),
        blend.y
    );
    return noiseVal / 0.7; // normalize to about [-1..1]
}

vec3 h(in vec3 a) {
    vec3 b = clamp(abs(mod(a.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return a.z + a.y * (b - 0.5) * (1.0 - abs(2.0 * a.z - 1.0));
}

vec3 warpGrid(vec2 fragCoord) {
    // Time varying pixel color
    float gridSize = 40.0;
    
    float noiseSize = 100.0;

    vec2 distortion = vec2(
        50.0*Pseudo3dNoise(vec3(fragCoord/noiseSize, iTime/20.0)),
        50.0*Pseudo3dNoise(vec3(fragCoord/noiseSize, -90.0+iTime/20.0))
    );
    
    vec2 coords = fragCoord.xy+distortion.xy;
    
    float col = mod(
        floor(coords.x/gridSize)*gridSize + floor(coords.y/gridSize)*gridSize,
        2.*gridSize
    );
    col = clamp(col, 0.0, 1.0);
    
    vec3 startCol = h(vec3(263.0/360.0, 0.9, 0.2));
    vec3 endCol = h(vec3(263.0/360.0, 1.0, 0.07));

    // Output to screen
    return mix(startCol, endCol, col);
}


void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord.xy / iResolution.y;
    float glitcha = 5.0;
    float offset = floor(Pseudo3dNoise(vec3(floor(uv.y*0.8 + cos(iTime/5.0)), uv.y*14.0/2.0, iTime / 3.0))*glitcha)/glitcha;
    offset = offset*20.0;
    // float offset = 0.0;
    fragColor.rgb = warpGrid(vec2(fragCoord.x+offset, fragCoord.y));
}`
</script>

<Shadertoy aria-hidden="true" {shader} />
