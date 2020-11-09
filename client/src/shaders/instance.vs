precision mediump float;

attribute vec3 vertPosition;
attribute vec3 normal;
attribute mat4 transformation;
attribute vec3 color;

varying vec2 tex_coords;
varying vec3 Normal;
varying vec3 fragPos;
varying vec3 out_color;

uniform mat4 projection;
uniform mat4 view;
uniform float camera;

vec3 hsvtorgb(float h, float s, float v)
{
    float i = 0.0;
    float f = 0.0;
    float p = 0.0;
    float q = 0.0;
    float t = 0.0;
    
    vec3 color;
    if(s==0.0){
      color.x = v;
      color.y = v;
      color.z = v;
      return color;
    }
    h /= 60.0;
    i = Math.floor(h);
    f = h - i;
    p = v * (1.0 - s);
    q = v * (1.0 - s*f);
    t = v * (1.0 - s * (1-f));
    if(i==0.0){
      color.x = v;
      color.y = t;
      color.z = p;
    }
    else if(i==1.0){
      color.x = q;
      color.y = v;
      color.z = p;
    }
    else if(i==2.0){
      color.x = p;
      color.y = v;
      color.z = t;
    }
    else if(i==3.0){
      color.x = p;
      color.y = q;
      color.z = v;
    }
    else if(i==4.0){
      color.x = t;
      color.y = p;
      color.z = v;
    }else{
      color.x = v;
      color.y = p;
      color.z = q;
    }
    
    return color;
}

void main()
{
  gl_Position = projection * view * transformation * vec4(vec3(vertPosition*camera*0.2), 1.0);
  out_color = color;
  fragPos = vec3(transformation * vec4(vertPosition, 1.0));
  Normal = normal;
}