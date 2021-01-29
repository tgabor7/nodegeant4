export class AxisShader {
   
    static vertexShader = "precision mediump float;"+

    "attribute vec3 vertices;"+

    "uniform mat4 view;"+
    "uniform mat4 transformation;"+
    "uniform mat4 projection;"+
    "uniform mat4 bmat;"+
    "uniform float camerad;"+
    "uniform vec3 pos;"+

    "void main()"+
    "{"+
      "gl_Position = transformation * vec4(( bmat*vec4(vertices,1.0) + vec4(pos,0.0)).xyz*camerad*.03, 1.0);"+
    "}";
    static fragmentShader = "precision mediump float;"+

    "uniform vec3 color;" +

    "void main()"+
    "{"+
      "gl_FragColor = vec4(color, 1.0);"+
     "}";
}

