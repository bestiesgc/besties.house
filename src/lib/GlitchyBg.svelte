<script>
    import Shadertoy from '$lib/Shadertoy.svelte';
//     const shader = `float rand(vec2 intPos) {
//     return fract(sin(dot(intPos, vec2(12.9898, 78.233))) * 43758.5453);
// }

// vec2 GetGradient(vec2 intPos, float t) {
    
//     // Uncomment for calculated rand
//     float rand = fract(sin(dot(intPos, vec2(12.9898, 78.233))) * 43758.5453);
    
//     // Texture-based rand (a bit faster on my GPU)
//     // float rand = texture(iChannel0, intPos / 64.0).r;
    
//     // Rotate gradient: random starting rotation, random rotation rate
//     float angle = 6.283185 * rand + 4.0 * t * rand;
//     return vec2(cos(angle), sin(angle));
// }


// float Pseudo3dNoise(vec3 pos) {
//     vec2 i = floor(pos.xy);
//     vec2 f = pos.xy - i;
//     vec2 blend = f * f * (3.0 - 2.0 * f);
//     float noiseVal = 
//         mix(
//             mix(
//                 dot(GetGradient(i + vec2(0, 0), pos.z), f - vec2(0, 0)),
//                 dot(GetGradient(i + vec2(1, 0), pos.z), f - vec2(1, 0)),
//                 blend.x),
//             mix(
//                 dot(GetGradient(i + vec2(0, 1), pos.z), f - vec2(0, 1)),
//                 dot(GetGradient(i + vec2(1, 1), pos.z), f - vec2(1, 1)),
//                 blend.x),
//         blend.y
//     );
//     return noiseVal / 0.7; // normalize to about [-1..1]
// }

// vec3 h(in vec3 a) {
//     vec3 b = clamp(abs(mod(a.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
//     return a.z + a.y * (b - 0.5) * (1.0 - abs(2.0 * a.z - 1.0));
// }

// vec4 draw(vec2 fragCoord) {
//     vec4 fragColor;
//     int part = int(floor(mod(iTime/8.0, 3.0)));
    
//     float d = 0.0;

//     if (part==0) {
//         float speed = (sin(iTime/80.0+21481.0)+1.0)*10.0+50.0;
//         float px = 5.0;
//         vec2 uv = fragCoord.xy / iResolution.y;
//         float xpos = uv.x * 6.0 + 0.01;
//         float noiseScale = 1.2;
//         d = 0.5 + 0.5 * Pseudo3dNoise(vec3((floor(xpos * px)/10.0)*noiseScale, floor(uv.y*6.0*px)/10.0*noiseScale, iTime / speed));
//     }
//     if (part==1) {
//         float speed = (sin(iTime/80.0+1122.0)+1.0)*10.0+50.0;
//         float px = 5.0;
//         vec2 uv = fragCoord.xy / iResolution.y;
//         float xpos = uv.x * 6.0 + 0.01;
//         float noiseScale = 1.2;
//         d = 0.5 + 0.5 * Pseudo3dNoise(vec3((floor(xpos * px)/10.0)*noiseScale, floor(uv.y*6.0*px)/10.0*noiseScale, 2000.0+iTime / speed));
//     }
//     if (part==2) {
//         float speed = (sin(iTime/80.0+3252.0)+1.0)*10.0+50.0;
//         float px = 5.0;
//         vec2 uv = fragCoord.xy / iResolution.y;
//         float xpos = uv.x * 6.0 + 0.01;
//         float noiseScale = 1.2;
//         d = 0.5 + 0.5 * Pseudo3dNoise(vec3((floor(xpos * px)/10.0)*noiseScale, floor(uv.y*6.0*px)/10.0*noiseScale, 8000.0+iTime / speed));
//     }

//     fragColor.rgb = h(vec3(0.8-d*0.1, 0.6+d*0.4, clamp(0.4-d*0.6,0.0,1.0)));

//     return fragColor;
// }

// void mainImage(out vec4 fragColor, in vec2 fragCoord) {
//     vec2 uv = fragCoord.xy / iResolution.y;
//     float glitcha = 2.0;
//     float offset = floor(Pseudo3dNoise(vec3(floor(uv.x*0.8 + cos(iTime/5.0)), mod(uv.y*14.0,40.0)/2.0, iTime / 3.0))*glitcha)/glitcha;
//     offset = offset*10.0;
//     fragColor = draw(vec2(fragCoord.x+offset, fragCoord.y));
// }`
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
    
    vec2 coords = vec2(
        fragCoord.x + 50.0*Pseudo3dNoise(vec3(fragCoord/noiseSize, iTime/20.0)),
        fragCoord.y + 50.0*Pseudo3dNoise(vec3(fragCoord/noiseSize, -90.0+iTime/20.0))
    );
    
    float col = mod(
        floor(coords.x/gridSize)*gridSize + floor(coords.y/gridSize)*gridSize,
        2.*gridSize
    );
    col = clamp(col, 0.0, 1.0);
    
    vec3 startCol = h(vec3(278.0/360.0, 0.9, 0.2));
    vec3 endCol = h(vec3(283.0/360.0, 1.0, 0.07));

    // Output to screen
    return mix(startCol, endCol, col);
}


void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord.xy / iResolution.y;
    float glitcha = 2.0;
    float offset = floor(Pseudo3dNoise(vec3(floor(uv.x*0.8 + cos(iTime/5.0)), mod(uv.y*14.0,40.0)/2.0, iTime / 3.0))*glitcha)/glitcha;
    offset = offset*10.0;
    // float offset = 0.0;
    fragColor.rgb = warpGrid(vec2(fragCoord.x+offset, fragCoord.y));
}`
</script>
<Shadertoy {shader}></Shadertoy>