import Shader from "./shader.js";
import Matrix, {Maths, Vector3} from "../utils/Maths.js";
import { Texture } from "./texture.js";
import { GridShader } from "../shaders/gridshader.js";
import {InstanceRenderer} from './InstanceRenderer';

export class GridRenderer {
    constructor(gl){
        this.gl = gl;
        this.shader = new Shader([0, 'vertPosition'],GridShader, gl);
        this.vertices = [ -1, 1, 1, 1, -1, -1,
             1, -1, 1, 1, -1, -1];


        this.vertical = [1,0,0,-1,0,0];
        this.horizontal = [0,0,1,0,0,-1];
            
        this.vao = this.gl.createVertexArray();
        this.gl.bindVertexArray(this.vao);
        this.gl.enableVertexAttribArray(0);

        this.vbo = gl.createBuffer();
        this.gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        this.gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertical), gl.STATIC_DRAW, 0);
        this.gl.vertexAttribPointer(0, 2, gl.FLOAT, gl.FALSE, 0, 0);


        this.gl.bindVertexArray(null);
        this.gl.disableVertexAttribArray(0);

        this.verticalRenderer = new InstanceRenderer(this.vertical, this.gl);
        this.verticalRenderer.drawLines = true;
        this.horizontalRenderer = new InstanceRenderer(this.horizontal, this.gl);
        this.horizontalRenderer.drawLines = true;
        
        class Line {
            constructor(x,y,z,sx,sy,sz){
                this.position = new Vector3(x,y,z);
                this.scale = new Vector3(sx,sy,sz);
                this.color = new Vector3(1,1,1);
            }
        }
        this.lines = [];

        for(let i = -100;i<100;i++){
            this.lines.push(new Line(0,0,i*100,10,1,1));
        }
        for(let i = -100;i<100;i++){
            this.lines.push(new Line(i*100,0,0,1,1,10));
        }
    }
    draw(projection, camera, width, height, d, hint){
        let f = 100;
        if(d > 1000) f = 5000;
        if(d > 200 && d < 1000) f = 500;
        if(d < 200 && d > 20) f = 100;
        if(d < 20) f = 10;
        hint(f / 100 + " cm");

        for(let i = 0;i<200;i++){
            this.lines[i].position.z = ((f*i) / 100) - f;
            this.lines[i].scale.x = f / 200;
        }
        for(let i = 200;i<400;i++){
            this.lines[i].position.x = ((f*(i-200)) / 100) - f;
            this.lines[i].scale.z = f / 200;
        }
        this.verticalRenderer.render(this.lines, Maths.createViewMatrix(camera),projection, 1000, this.gl);
        this.horizontalRenderer.render(this.lines, Maths.createViewMatrix(camera),projection, 1000, this.gl);
    }
} 