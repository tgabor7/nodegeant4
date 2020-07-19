import Shader from "./shader.js";
import Matrix, {Maths, Vector3} from "./maths.js";
import { Texture } from "./texture.js";
import { Cube } from "./cube.js";
import Model from "./model.js";
 
export class DecalRenderer {
    constructor(gl){
        this.gl = gl;
        this.shader = new Shader([0, 'vertPosition'],"shaders/shader", gl);
        this.decalShader = new Shader([0, 'vertPosition'],"shaders/decal", gl);
        this.vertices = [];


        this.vertical = [1,0,-1,0];
        this.horizontal = [0,1,0,0,-1,0];
            
        this.vao = this.gl.createVertexArray();
        this.gl.bindVertexArray(this.vao);
        this.gl.enableVertexAttribArray(0);

        this.vbo = gl.createBuffer();
        this.gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        this.gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW, 0);
        this.gl.vertexAttribPointer(0, 3, gl.FLOAT, gl.FALSE, 0, 0);


        this.gl.bindVertexArray(null);
        this.gl.disableVertexAttribArray(0);

        this.model = new Model(Cube.vertices, Cube.normals, this.gl);
        this.model.drawLines = false;

    }
    draw(projection, camera){
        this.gl.enable(this.gl.STENCIL_TEST);
        this.gl.stencilFunc(this.gl.ALWAYS, 1, 1);
        this.gl.stencilOp(this.gl.KEEP, this.gl.ZERO, this.gl.REPLACE);
        this.drawA(projection, camera);
        this.gl.stencilFunc(this.gl.EQUAL, 1, 1);
        this.gl.stencilMask(this.gl.FALSE);
        this.gl.disable(this.gl.DEPTH_TEST);
        this.drawB(projection, camera);
    }
    drawA(projection, camera){
        //remove clear
        this.shader.bind();
        this.gl.enable(this.gl.DEPTH_TEST);  
        //this.shader.setUniform("sampler", 0);

        var view = Maths.createViewMatrix(camera);

        var transformation = Maths.createTransformationMatrix(0,0,0,0,0,0,1,1,1);
        this.shader.setUniform4fv("transformation", transformation);
        this.shader.setUniform4fv("view", view);
        this.shader.setUniform4fv("projection", projection);
        this.shader.setUniform3f("color",1,1,1);

        this.gl.enableVertexAttribArray(0);
        this.gl.enableVertexAttribArray(1);
        this.gl.bindVertexArray(this.model.vao);

        this.model.draw();
        //this.gl.bindVertexArray(null);
        this.gl.disableVertexAttribArray(0);
        this.gl.disableVertexAttribArray(1);
        this.shader.unBind();
    }
    drawB(projection, camera, pos){
        //remove clear
        this.decalShader.bind();
        this.gl.enable(this.gl.DEPTH_TEST);  
        //this.shader.setUniform("sampler", 0);
        this.triangles = [];
        let range = .1;

        

        var view = Maths.createViewMatrix(camera);

        var transformation = Maths.createTransformationMatrix(.5,.5,0,0,0,0,.1,.1,.1);
        this.decalShader.setUniform4fv("transformation", transformation);
        this.decalShader.setUniform4fv("view", view);
        this.decalShader.setUniform4fv("projection", projection);
        this.decalShader.setUniform3f("color",0,1,1);

        this.gl.enableVertexAttribArray(0);
        this.gl.bindVertexArray(this.vao);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertices.length);

        this.gl.bindVertexArray(null);
        this.gl.disableVertexAttribArray(0);

        this.decalShader.unBind();
    }
} 