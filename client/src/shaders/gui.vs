precision mediump float;

attribute vec2 vertPosition;

uniform mat4 projection;
uniform mat4 transformation;
uniform mat4 view;

varying vec2 tex_coords;

void main()
{
	
  vec4 pos =  transformation * vec4(vertPosition, 0.0, 1.0);
  tex_coords = vertPosition * 0.5 + 0.5;
  tex_coords.y = 1.0-tex_coords.y;
  gl_Position = pos;
  
  
}