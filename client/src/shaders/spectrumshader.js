export class SpectrumShader {
   
    static vertexShader = "precision mediump float;"+

    "attribute vec2 vertPosition;"+

    "varying vec2 textures;" +
    "uniform mat4 transformation;"+
    
    "void main()"+
    "{"+
      "gl_Position = transformation * vec4(vertPosition, 0.0, 1.0);"+
      "textures = vertPosition * 0.5 - 0.5;"+
    "}";
    static fragmentShader = "precision mediump float;"+

    "varying vec2 textures;" + 

    "vec3 hsvtorgb(float h, float s, float v)"+
    "{"+
        "float i = 0.0;"+
        "float f = 0.0;"+
        "float p = 0.0;"+
        "float q = 0.0;"+
        "float t = 0.0;"+
        
        "vec3 color;"+
        "if(s==0.0){"+
          "color.x = v;"+
          "color.y = v;"+
          "color.z = v;"+
          "return color;"+
        "}"+
        "h /= 60.0;"+
        "i = float(int(h));"+
        "f = h - i;"+
        "p = v * (1.0 - s);"+
        "q = v * (1.0 - s*f);"+
        "t = v * (1.0 - s * (1.0-f));"+
        "if(i==0.0){"+
          "color.x = v;"+
          "color.y = t;"+
          "color.z = p;"+
        "}"+
        "else if(i==1.0){"+
          "color.x = q;"+
          "color.y = v;"+
          "color.z = p;"+
        "}"+
        "else if(i==2.0){"+
          "color.x = p;"+
          "color.y = v;"+
          "color.z = t;"+
        "}"+
        "else if(i==3.0){"+
          "color.x = p;"+
          "color.y = q;"+
          "color.z = v;"+
        "}"+
        "else if(i==4.0){"+
          "color.x = t;"+
          "color.y = p;"+
          "color.z = v;"+
        "}else{"+
          "color.x = v;"+
          "color.y = p;"+
          "color.z = q;"+
        "}"+
        "return color;"+
    "}"+

    "void main()"+
    "{"+
      "gl_FragColor = vec4(hsvtorgb(((-1.0-textures.y)+1.0)*180.0,1.0,1.0),1.0);"+
     "}";
}

