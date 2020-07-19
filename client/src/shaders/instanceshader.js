export class InstancedShader{
   
    static vertexShader = "precision mediump float;"+

    "attribute vec3 vertPosition;"+
    "attribute vec3 normal;"+
    "attribute mat4 transformation;"+
    "attribute vec3 color;"+
    
    "varying vec2 tex_coords;"+
    "varying vec3 Normal;"+
    "varying vec3 fragPos;"+
    "varying vec3 out_color;"+
    
    "uniform mat4 projection;"+
    "uniform mat4 view;"+
    "uniform float camera;"+
    
    "void main()"+
    "{"+
      "gl_Position = projection * view * transformation * vec4(vec3(vertPosition*camera*0.2), 1.0);"+
      "out_color = color;"+
      "fragPos = vec3(transformation * vec4(vertPosition, 1.0));"+
      "Normal = normal;"+
    "}";
    static fragmentShader = "precision mediump float;"+

    "varying vec2 tex_coords;"+
    "varying vec3 Normal;"+
    "varying vec3 fragPos;"+
    
    "varying vec3 out_color;"+
    
    "uniform sampler2D sampler;"+
    
    "void main()"+
    "{"+
      "vec3 norm = normalize(Normal);"+
      "vec3 lightDir = normalize(vec3(100) - fragPos);"+ 
      "float diff = max(dot(norm, lightDir), 0.0); "+
      "vec3 diffuse = diff * vec3(1); "+
      "gl_FragColor = vec4(out_color,1.0);"+
     "}";
}

