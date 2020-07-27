import Shader from './shader.js'
import {MainShader} from '../shaders/mainshader.js';
import {Maths, Vector3} from '../utils/maths.js';
import Model from './model';
import {Cube} from '../entities/cube';

class RenderSystem {
    constructor(gl){
        this.shader = new Shader([[0,'vertPosition'],[1, 'normal']],MainShader,gl);
        this.models = [];
        this.sources = [];
        this.detectors = [];
        this.guns = [];
        this.particles = [];
        this.gl = gl;

        this.addModel(new Model([1, 0, 0, -1, 0, 0], [1, 1, 1, 1, 1, 1], gl));
        this.addModel(new Model([0, 1, 0, 0, -1, 0], [1, 1, 1, 1, 1, 1], gl));
        this.addModel(new Model([0, 0, 1, 0, 0, -1], [1, 1, 1, 1, 1, 1], gl));
        this.addModel(new Model([0, 0, 1, 0, 0, -1], [1, 1, 1, 1, 1, 1], gl));

        this.models[0].color = new Vector3(1,0,0);
        this.models[1].color = new Vector3(0,1,0);
        this.models[2].color = new Vector3(0,0,1);
        this.models[3].color = new Vector3(0,0,1);
        
        
        this.drawTracks = true;
        this.drawParticles = true;
    }
      static acitve_id = 0;

    removeDetector(detector){
        for(let i = 0;i<this.detectors.length;i++){
            if(this.detectors[i] == detector){
                this.detectors.splice(i, 1);
            }
        }
    }
    removeGun(gun){
        for(let i = 0;i<this.guns.length;i++){
            if(this.guns[i] == gun){
                this.guns.splice(i, 1);
            }
        }
    }
    removeSource(source){
        for(let i = 0;i<this.sources.length;i++){
            if(this.sources[i] == source){
                this.sources.splice(i, 1);
            }
        }
    }
    addModel(model){
        this.models.push(model);
    }
    addParticles(particle){
        this.particles.push(particle);
    }
    addGun(gun){
        this.guns.push(gun);
    }
    addSource(source){
        this.sources.push(source);
    }
    addDetector(detector){
        this.detectors.push(detector);
    }
    clearTracks(){
        this.models = [];
        this.addModel(new Model([1, 0, 0, -1, 0, 0], [1, 1, 1, 1, 1, 1], this.gl));
        this.addModel(new Model([0, 1, 0, 0, -1, 0], [1, 1, 1, 1, 1, 1], this.gl));
        this.addModel(new Model([0, 0, 1, 0, 0, -1], [1, 1, 1, 1, 1, 1], this.gl));
        this.addModel(new Model([0, 0, 1, 0, 0, -1], [1, 1, 1, 1, 1, 1], this.gl));

        this.models[0].color = new Vector3(1,0,0);
        this.models[1].color = new Vector3(0,1,0);
        this.models[2].color = new Vector3(0,0,1);
        this.models[3].color = new Vector3(0,0,1);
        //this is whack
    }
    draw(projection, camera){
        this.gl.disable(this.gl.DEPTH_TEST);
        this.shader.bind();
        for(let i = 0;i<this.detectors.length;i++){
            if(this.detectors[i].id != RenderSystem.acitve_id-1) continue;
            if(this.detectors[i].id == RenderSystem.acitve_id-1){
                this.gl.enableVertexAttribArray(0);
                this.gl.enableVertexAttribArray(1);
                this.gl.bindVertexArray(this.detectors[i].model.vao);
                let mat = Maths.createTransformationMatrix(this.detectors[i].model.position.x, this.detectors[i].model.position.y, this.detectors[i].model.position.z,
                    this.detectors[i].model.rotation.x, this.detectors[i].model.rotation.y, this.detectors[i].model.rotation.z,
                     this.detectors[i].model.scale.x * (1.01),
                     this.detectors[i].model.scale.y * (1.01),
                    this.detectors[i].model.scale.z * (1.01));
                this.shader.setUniform3f("color", 1, .4, 0);
                this.shader.setUniform1i("sampler", 0);
                this.shader.setUniform4fv("view", Maths.createViewMatrix(camera));
                this.shader.setUniform4fv("projection", projection);
                this.shader.setUniform4fv("transformation", mat);
                this.detectors[i].model.draw();
                this.gl.disableVertexAttribArray(0);
                this.gl.disableVertexAttribArray(1);
            }
            
        }
        for(let i = 0;i<this.detectors.length;i++){
            this.gl.enable(this.gl.DEPTH_TEST);
            this.gl.enableVertexAttribArray(0);
            this.gl.enableVertexAttribArray(1);
            this.gl.bindVertexArray(this.detectors[i].model.vao);
            let mat = Maths.createTransformationMatrix(this.detectors[i].model.position.x, this.detectors[i].model.position.y, this.detectors[i].model.position.z,
                this.detectors[i].model.rotation.x, this.detectors[i].model.rotation.y, this.detectors[i].model.rotation.z, this.detectors[i].model.scale.x,
                 this.detectors[i].model.scale.y,
                this.detectors[i].model.scale.z);
            this.shader.setUniform3f("color", this.detectors[i].model.color.x, this.detectors[i].model.color.y, this.detectors[i].model.color.z);
            this.shader.setUniform1i("sampler", 0);
            this.shader.setUniform4fv("view", Maths.createViewMatrix(camera));
            this.shader.setUniform4fv("projection", projection);
            this.shader.setUniform4fv("transformation", mat);
            this.detectors[i].model.draw();
            this.gl.disableVertexAttribArray(0);
            this.gl.disableVertexAttribArray(1);
        }
        
        for (var i = 0; i < this.guns.length; i++) {
            this.gl.enableVertexAttribArray(0);
            this.gl.enableVertexAttribArray(1);
            this.gl.bindVertexArray(this.guns[i].model.vao);
            let mat = Maths.createTransformationMatrix(this.guns[i].model.position.x, this.guns[i].model.position.y, this.guns[i].model.position.z,
                this.guns[i].model.rotation.x, this.guns[i].model.rotation.y, this.guns[i].model.rotation.z, camera.d*0.01,camera.d*0.01,camera.d*0.01);

            this.shader.setUniform3f("color", this.guns[i].model.color.x, this.guns[i].model.color.y, this.guns[i].model.color.z);
            this.shader.setUniform1i("sampler", 0);
            this.shader.setUniform4fv("view", Maths.createViewMatrix(camera));
            this.shader.setUniform4fv("projection", projection);
            this.shader.setUniform4fv("transformation", mat);
            this.guns[i].model.draw();
            this.gl.disableVertexAttribArray(0);
            this.gl.disableVertexAttribArray(1);
            console.log(this.guns[i].model.position.x);
        }
        this.gl.disable(this.gl.DEPTH_TEST);
        for (var i = 0; i < this.sources.length; i++) {
            this.gl.enableVertexAttribArray(0);
            this.gl.enableVertexAttribArray(1);
            this.gl.bindVertexArray(this.sources[i].model.vao);
            let mat = Maths.createTransformationMatrix(this.sources[i].model.position.x, this.sources[i].model.position.y, this.sources[i].model.position.z,
                this.sources[i].model.rotation.x, this.sources[i].model.rotation.y, this.sources[i].model.rotation.z, camera.d*0.004,camera.d*0.004,camera.d*0.004);

            this.shader.setUniform3f("color", this.sources[i].model.color.x, this.sources[i].model.color.y, this.sources[i].model.color.z);
            this.shader.setUniform1i("sampler", 0);
            this.shader.setUniform4fv("view", Maths.createViewMatrix(camera));
            this.shader.setUniform4fv("projection", projection);
            this.shader.setUniform4fv("transformation", mat);
            this.sources[i].model.draw();
            this.gl.disableVertexAttribArray(0);
            this.gl.disableVertexAttribArray(1);
        }
        this.gl.enable(this.gl.DEPTH_TEST);

        this.gl.disable(this.gl.DEPTH_TEST);

        for(let i = 0;i<4;i++){
            this.gl.enableVertexAttribArray(0);
            this.gl.enableVertexAttribArray(1);
            this.gl.bindVertexArray(this.models[i].vao);
            let mat = Maths.createTransformationMatrix(this.models[i].position.x, this.models[i].position.y, this.models[i].position.z,
                this.models[i].rotation.x, this.models[i].rotation.y, this.models[i].rotation.z,
                camera.d,
                 camera.d,
                camera.d);
            this.shader.setUniform3f("color", this.models[i].color.x, this.models[i].color.y, this.models[i].color.z);
            this.shader.setUniform1i("sampler", 0);
            this.shader.setUniform4fv("view", Maths.createViewMatrix(camera));
            this.shader.setUniform4fv("projection", projection);
            this.shader.setUniform4fv("transformation", mat);
            this.models[i].draw();
            this.gl.disableVertexAttribArray(0);
            this.gl.disableVertexAttribArray(1);
        }
        if(!this.drawTracks){
            this.shader.unBind();
            return;
        } 
        for(let i = 3;i<this.models.length;i++){
            this.gl.enableVertexAttribArray(0);
            this.gl.enableVertexAttribArray(1);
            this.gl.bindVertexArray(this.models[i].vao);
            let mat = Maths.createTransformationMatrix(this.models[i].position.x, this.models[i].position.y, this.models[i].position.z,
                this.models[i].rotation.x, this.models[i].rotation.y, this.models[i].rotation.z,
                this.models[i].scale.x, this.models[i].scale.y, this.models[i].scale.z);
            this.shader.setUniform3f("color", this.models[i].color.x, this.models[i].color.y, this.models[i].color.z);
            this.shader.setUniform1i("sampler", 0);
            this.shader.setUniform4fv("view", Maths.createViewMatrix(camera));
            this.shader.setUniform4fv("projection", projection);
            this.shader.setUniform4fv("transformation", mat);
            this.models[i].draw();
            this.gl.disableVertexAttribArray(0);
            this.gl.disableVertexAttribArray(1);
        }
        this.shader.unBind();
        
    }
}
export default RenderSystem;