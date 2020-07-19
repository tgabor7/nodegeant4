export class GridShader{
   
    static vertexShader = "precision mediump float;" + 

    "attribute vec2 vertPosition;"+
    
    "uniform mat4 projection;"+
    "uniform mat4 transformation;"+
    "uniform mat4 view;"+
    
    "varying vec2 tex_coords;"+
    
    "void main()"+
    "{"+
        
     "vec4 pos =  projection * view * transformation * vec4(vertPosition, 0.0, 1.0);"+
      "tex_coords = vertPosition * 0.5 + 0.5;"+
      "tex_coords.y = 1.0-tex_coords.y;"+
      "gl_Position = pos;"+
      
      
    "}";
    static fragmentShader = "precision mediump float;"+
    
    "uniform sampler2D sampler;"+
    
    "uniform float width;"+
    "uniform float height;"+
    "uniform float distance;"+
    
    "varying vec2 tex_coords;"+
    
    "int mod(int a, int b)"+
    "{"+
    "	return a - b * int(a/b);"+
    "}"+
    
    "void main()"+
    "{"+
      "vec4 color = vec4(1.0);"+
      
      
      "gl_FragColor = color;"+
    "}";
}

