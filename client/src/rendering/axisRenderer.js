import Shader from "./shader.js";
import Matrix, {Maths, Vector3} from "../utils/Maths.js";
import { Texture } from "./texture.js";
import {AxisShader} from "../shaders/axisShader";
import Model from './model';

class AxisRenderer {
    constructor(gl){
        this.gl = gl;
        this.shader = new Shader([[0,'vertices']],AxisShader,gl);
       
        this.allaxis = [];
        this.labels = [];

        this.xaxis = new Model([1,0,0,0,0,0],[1,1,1,1,1,1],gl);
        this.yaxis = new Model([0,1,0,0,0,0],[1,1,1,1,1,1],gl);
        this.zaxis = new Model([0,0,1,0,0,0],[1,1,1,1,1,1],gl);
        
        this.xlabel = new Model([1,0,0  ,.5,-.5,0,  .75,-.25,0,   .5,0,0, 1,-.5,0],[],gl);
        this.ylabel = new Model([1,0,0  ,.75,-.25,0,  .5,0,0,.75,-.25,0, .75,-.5,0],[],gl);
        this.zlabel = new Model([1,0,0  ,.5,0,0, 1,-.5,0, .5,-.5,0],[],gl);

        this.xlabel.scale = new Vector3(.3,.3,.3);
        this.xlabel.position = new Vector3(3,-.5,0);
        
        this.ylabel.scale = new Vector3(.3,.3,.3);
        this.ylabel.position = new Vector3(-.5,4,0);
        
        this.zlabel.scale = new Vector3(.3,.3,.3);
        this.zlabel.position = new Vector3(0,-.5,3);
        


        this.xlabel.color = new Vector3(1,1,1);
        this.ylabel.color = new Vector3(1,1,1);
        this.zlabel.color = new Vector3(1,1,1);
        this.xaxis.color = new Vector3(1,0,0);
        this.yaxis.color = new Vector3(0,1,0);
        this.zaxis.color = new Vector3(0,0,1);
        
        this.xaxis.drawLines = true;
        this.yaxis.drawLines = true;
        this.zaxis.drawLines = true;
        this.xlabel.drawLines = true;
        this.ylabel.drawLines = true;
        this.zlabel.drawLines = true;

        this.allaxis.push(this.xaxis);
        this.allaxis.push(this.yaxis);
        this.allaxis.push(this.zaxis);
        this.labels.push(this.xlabel);
        this.labels.push(this.ylabel);
        this.labels.push(this.zlabel);
    }
    draw(projection, camera){
    
        this.shader.bind();
        this.gl.disable(this.gl.DEPTH_TEST);

        
       
		for(let i = 0;i<this.allaxis.length;i++){
            var tmat = Maths.createTransformationMatrix(-.5,-.7,0,0,0,0,this.allaxis[i].scale.x,this.allaxis[i].scale.y,this.allaxis[i].scale.z);
        
            tmat = Maths.mul(tmat, projection);
            tmat = Maths.mul(tmat, Maths.createViewMatrix(camera));
            
            tmat = Maths.translate(tmat, new Vector3(camera.a.x+this.allaxis[i].position.x,camera.a.y+this.allaxis[i].position.y,camera.a.z+this.allaxis[i].position.z));
            
            //tmat = Maths.scale(tmat, new Vector3(camera.d*.03,camera.d*.03,camera.d*.03));
            this.shader.setUniform("camerad", camera.d);
            this.shader.setUniform3f("pos", 0,0,0);
            var bmat = Maths.createTransformationMatrix(0,0,0,0,0,0,1,1,1);
            bmat = Maths.rotate(bmat,0, new Vector3(0,1,0));
            this.shader.setUniform4fv("bmat", bmat);

            this.shader.setUniform4fv("transformation", tmat);
            this.gl.enableVertexAttribArray(0);
            this.gl.bindVertexArray(this.allaxis[i].vao);
            this.shader.setUniform3f("color", this.allaxis[i].color.x,this.allaxis[i].color.y,this.allaxis[i].color.z);
            
            this.allaxis[i].draw();
    
            this.gl.disableVertexAttribArray(0);
        }
        for(let i = 0;i<this.labels.length;i++){
            var tmat = Maths.createTransformationMatrix(-.5,-.7,0,0,0,0,this.labels[i].scale.x,this.labels[i].scale.y,this.labels[i].scale.z);
            
            tmat = Maths.mul(tmat, projection);
            tmat = Maths.mul(tmat, Maths.createViewMatrix(camera));
            
            tmat = Maths.translate(tmat, new Vector3(camera.a.x,camera.a.y,camera.a.z));
            
            var bmat = Maths.createTransformationMatrix(0,0,0,0,0,0,1,1,1);
            bmat = Maths.rotate(bmat, Maths.toRad(camera.x), new Vector3(0,1,0));
            bmat = Maths.rotate(bmat, Maths.toRad(-camera.y), new Vector3(1,0,0));
            //tmat = Maths.scale(tmat, new Vector3(camera.d*.03,camera.d*.03,camera.d*.03));

            this.shader.setUniform("camerad", camera.d);
            this.shader.setUniform3f("pos", this.labels[i].position.x,this.labels[i].position.y,this.labels[i].position.z);
            this.shader.setUniform4fv("transformation", tmat);
            this.shader.setUniform4fv("bmat", bmat);

            this.gl.enableVertexAttribArray(0);
            this.gl.bindVertexArray(this.labels[i].vao);
            this.shader.setUniform3f("color", this.labels[i].color.x,this.labels[i].color.y,this.labels[i].color.z);
            
            this.labels[i].draw();
    
            this.gl.disableVertexAttribArray(0);
        }        

        this.shader.unBind();
    }
} 

export default AxisRenderer;