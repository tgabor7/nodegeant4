import Shader from "./shader.js";
import Matrix, {Maths, Vector3} from "./maths.js";
import { Texture } from "./texture.js";

export class GuiRenderer {
    constructor(gl){
        this.gl = gl;
        this.shader = new Shader([0, 'vertPosition'],"shaders/gui", gl);
        this.vertices = [ -1, 1, 1, 1, -1, -1,
             1, -1, 1, 1, -1, -1];

        this.vao = this.gl.createVertexArray();
        this.gl.bindVertexArray(this.vao);
        this.gl.enableVertexAttribArray(0);

        this.vbo = gl.createBuffer();
        this.gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        this.gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW, 0);
        this.gl.vertexAttribPointer(0, 2, gl.FLOAT, gl.FALSE, 0, 0);


        this.gl.bindVertexArray(null);
        this.gl.disableVertexAttribArray(0);
    }
    draw(){
        //remove clear
        
        
        this.shader.bind();
        this.gl.disable(this.gl.DEPTH_TEST);
        this.gl.disable(this.gl.CULL_FACE);

        //this.shader.setUniform("sampler", 0);

        var transformation = Maths.createTransformationMatrix(.45,-.58,0,0,0,0,.05,.002,1);
      

        this.shader.setUniform4fv("transformation", transformation);
        

		
        this.gl.enableVertexAttribArray(0);
        this.gl.bindVertexArray(this.vao);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertices.length);

        this.gl.bindVertexArray(null);
        this.gl.disableVertexAttribArray(0);

        this.shader.unBind();
    }
} 