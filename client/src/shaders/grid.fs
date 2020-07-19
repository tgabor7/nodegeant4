precision mediump float;

uniform sampler2D sampler;

uniform float width;
uniform float height;
uniform float distance;

varying vec2 tex_coords;

int mod(int a, int b)
{
	return a - b * int(a/b);
}

void main()
{
  vec4 color = vec4(.2,.2,.2,1);
  
  
  gl_FragColor = color;
}