export class MainShader{
   
    static vertexShader = "precision mediump float;"+

    "attribute vec3 vertPosition;"+
    "attribute vec3 normal;"+
    
    "varying vec2 tex_coords;"+
    "varying vec3 Normal;"+
    "varying vec3 fragPos;"+
    
    "uniform mat4 projection;"+
    "uniform mat4 transformation;"+
    "uniform mat4 view;"+
    
    "void main()"+
    "{"+
      "gl_Position = projection * view * transformation * vec4(vertPosition, 1.0);"+
      "fragPos = vec3(transformation * vec4(vertPosition, 1.0));"+
      "Normal = normal;"+
    "}";
    static fragmentShader = "precision mediump float;"+

    "varying vec2 tex_coords;"+
    "varying vec3 Normal;"+
    "varying vec3 fragPos;"+
    
    "uniform vec3 color;"+
    "uniform sampler2D sampler;"+
    "uniform int fakeLightning;"+
    "void main()"+
    "{"+
      "vec3 norm = normalize(Normal);"+
      "vec3 lightDir = normalize(vec3(100) - fragPos);"+ 
      "float diff = max(dot(norm, lightDir), 0.0); "+
      "vec3 diffuse = diff * vec3(1); "+
      "if(fakeLightning == 1) diffuse = vec3(.9);"+
      "gl_FragColor = vec4((vec3(.1)+diffuse)*color,1.0);"+
     "}";
}

