export const vertex = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

export const fragment = `
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_pointer;
float noise(vec2 p) {
  return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);
}
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  float t = u_time * 0.075;
  vec2 p = uv + (u_pointer - 0.5) * 0.025;
  float wave = sin(p.x * 4.0 + t) * 0.15 + cos(p.y * 3.0 - t * 0.7) * 0.15;
  vec2 center = vec2(0.76 + sin(t * 0.7) * 0.12, 0.5 + cos(t) * 0.16);
  float mist = exp(-length((p - center) * vec2(1.1, 1.5)) * 2.5);
  float silk = smoothstep(-0.7, 0.9, sin(p.x * 3.5 + p.y * 2.0 + wave + t));
  vec3 paper = vec3(0.957, 0.941, 0.910);
  vec3 gold = vec3(0.831, 0.776, 0.635);
  vec3 olive = vec3(0.855, 0.855, 0.761);
  vec3 color = mix(paper, gold, mist * 0.25 * silk);
  color = mix(color, olive, smoothstep(0.4, 1.0, uv.x) * mist * 0.12);
  color += (noise(gl_FragCoord.xy) - 0.5) / 255.0;
  gl_FragColor = vec4(color, 1.0);
}
`;
