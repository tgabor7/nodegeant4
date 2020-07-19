import Shader from "./shader.js";
import Matrix, {Maths, Vector3} from "../utils/maths.js";
import { Texture } from "./texture.js";
import { GridShader } from "../shaders/gridshader.js";

export class GridRenderer {
    constructor(gl){
        this.gl = gl;
        this.shader = new Shader([0, 'vertPosition'],GridShader, gl);
        this.vertices = [ -1, 1, 1, 1, -1, -1,
             1, -1, 1, 1, -1, -1];


        this.vertical = [1,0,-1,0];
        this.horizontal = [0,1,0,0,-1,0];
            
        this.vao = this.gl.createVertexArray();
        this.gl.bindVertexArray(this.vao);
        this.gl.enableVertexAttribArray(0);

        this.vbo = gl.createBuffer();
        this.gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        this.gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertical), gl.STATIC_DRAW, 0);
        this.gl.vertexAttribPointer(0, 2, gl.FLOAT, gl.FALSE, 0, 0);


        this.gl.bindVertexArray(null);
        this.gl.disableVertexAttribArray(0);
    }
    draw(projection, camera, width, height, d){
        var f = 1;
        
        //f = camera.d;
        for(var i = -20;i<20;i++){
        //remove clear
            this.shader.bind();
            this.gl.enable(this.gl.DEPTH_TEST);
            this.gl.disable(this.gl.CULL_FACE);

            //this.shader.setUniform("sampler", 0);

            var view = Maths.createViewMatrix(camera);

            var transformation = Maths.createTransformationMatrix(0,0,i*f+0.5,0,0,0,100*f,1,1);
            this.shader.setUniform4fv("transformation", transformation);
            this.shader.setUniform4fv("view", view);
            this.shader.setUniform4fv("projection", projection);

            this.shader.setUniform("width", width);
            this.shader.setUniform("height", height);
            this.shader.setUniform("distance", d);


            this.gl.enableVertexAttribArray(0);
            this.gl.bindVertexArray(this.vao);

            this.gl.drawArrays(this.gl.LINES, 0, this.vertical.length);

            this.gl.bindVertexArray(null);
            this.gl.disableVertexAttribArray(0);

            this.shader.unBind();
        }

        for(var i = -20;i<20;i++){
            //remove clear
            this.shader.bind();
            
            //this.shader.setUniform("sampler", 0);
    
            var view = Maths.createViewMatrix(camera);
    
            var transformation = Maths.createTransformationMatrix(i*f+0.5,0,0,0,1.57,0,100*f,1,1);
            this.shader.setUniform4fv("transformation", transformation);
            this.shader.setUniform4fv("view", view);
            this.shader.setUniform4fv("projection", projection);
    
            this.shader.setUniform("width", width);
            this.shader.setUniform("height", height);
            this.shader.setUniform("distance", d);
    
    
            this.gl.enableVertexAttribArray(0);
            this.gl.bindVertexArray(this.vao);
    
            this.gl.drawArrays(this.gl.LINES, 0, this.vertical.length);
    
            this.gl.bindVertexArray(null);
            this.gl.disableVertexAttribArray(0);
    
            this.shader.unBind();
            }
    }
} 