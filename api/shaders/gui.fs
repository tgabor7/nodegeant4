precision mediump float;

uniform sampler2D sampler;

varying vec2 tex_coords;

void main()
{
  vec4 color = vec4(1.0);
  gl_FragColor = color;
}