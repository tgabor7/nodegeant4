precision mediump float;

attribute vec3 vertPosition;

uniform mat4 projection;
uniform mat4 transformation;
uniform mat4 view;

varying vec2 tex_coords;

void main()
{
	
	vec4 pos =  projection * view * transformation * vec4(vertPosition, 1.0);



	gl_Position = pos;
  
  
}