precision mediump float;

uniform sampler2D sampler;

varying vec2 tex_coords;

void main()
{
  vec4 color = texture2D(sampler,tex_coords);
  if(color.a < 0.9) discard;
  gl_FragColor = color;
}