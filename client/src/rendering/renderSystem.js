import Shader from './shader.js'
import {MainShader} from '../shaders/mainshader.js';
import {Maths, Vector3, Vector4} from '../utils/Maths.js';
import Model from './model';
import {Cube} from '../entities/cube';
import MousePicker from '../utils/mousePicker';


/*
This class handles the rendering of detectors, sources and guns
*/
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
        this.addModel(new Model([0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1], gl));
        //this.addModel(new Model([0, 0, 1, 0, 0, -1], [1, 1, 1, 1, 1, 1], gl));

        this.models[0].color = new Vector3(1,0,0);
        this.models[1].color = new Vector3(0,1,0);
        this.models[2].color = new Vector3(0,0,1);
        //this.models[3].color = new Vector3(0,0,1);
        
        
        this.drawTracks = true;
        this.drawParticles = true;
        this.drawAxes = true;
    }
      static active_id = -1;
      static hover_id = -1;

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
    clearSetup(){
        this.detectors = []
        this.sources = []
        this.guns = []
    }
    clearTracks(){
        this.models = [];
        this.addModel(new Model([1, 0, 0, -1, 0, 0], [1, 1, 1, 1, 1, 1], this.gl));
        this.addModel(new Model([0, 1, 0, 0, -1, 0], [1, 1, 1, 1, 1, 1], this.gl));
        this.addModel(new Model([0, 0, 1, 0, 0, -1], [1, 1, 1, 1, 1, 1], this.gl));
        this.addModel(new Model([0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1], this.gl));

//        this.addModel(new Model([0, 0, 1, 0, 0, -1], [1, 1, 1, 1, 1, 1], this.gl));

        this.models[0].color = new Vector3(1,0,0);
        this.models[1].color = new Vector3(0,1,0);
        this.models[2].color = new Vector3(0,0,1);
        //this.models[3].color = new Vector3(0,0,1);
        //this is whack
    }
    drawObject(object,projection, camera,scale,color,fake,tmat){
            this.gl.enableVertexAttribArray(0);
            this.gl.enableVertexAttribArray(1);
            this.gl.bindVertexArray(object.model.vao);
            let mat = Maths.createTransformationMatrix(object.model.position.x, object.model.position.y, object.model.position.z,
                object.model.rotation.x, object.model.rotation.y, object.model.rotation.z, object.model.scale.x * scale,
                object.model.scale.y * scale,
                object.model.scale.z * scale);
            if(tmat != null) mat = tmat;
            this.shader.setUniform1i("fakeLightning", fake);
            this.shader.setUniform3f("color", color.x, color.y, color.z);
            this.shader.setUniform1i("sampler", 0);
            this.shader.setUniform4fv("view", Maths.createViewMatrix(camera));
            this.shader.setUniform4fv("projection", projection);
            this.shader.setUniform4fv("transformation", mat);
            object.model.draw();
            this.gl.disableVertexAttribArray(0);
            this.gl.disableVertexAttribArray(1);
    }
    draw(projection, camera, x, y, down, move){
        this.shader.bind();
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.cullFace(this.gl.BACK);
        var ray = MousePicker.cameraRay(camera, projection, x, y);  
        RenderSystem.hover_id = MousePicker.check(this.detectors,this.sources,this.guns, ray, camera);
        this.gl.enable(this.gl.DEPTH_TEST);
        for(let i = 0;i<this.detectors.length;i++){
            this.drawObject(this.detectors[i],projection, camera, 1, this.detectors[i].model.color,0);
        }
        for(let i = 0;i<this.guns.length;i++){
            
        }
        this.gl.disable(this.gl.DEPTH_TEST);

        for(let i = 0;i<this.sources.length;i++){
            
        }
        
        
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.disable(this.gl.DEPTH_TEST);
        
        for(let i = 0;i<this.detectors.length;i++){
            this.gl.cullFace(this.gl.FRONT);
            if(this.detectors[i].id == RenderSystem.active_id){
                
                this.drawObject(this.detectors[i],projection, camera, 1.01, new Vector3(1,.4,0),1);
                
                this.gl.cullFace(this.gl.BACK);

                this.drawObject(this.detectors[i],projection, camera, 1, this.detectors[i].model.color,0);
            }
            if(this.detectors[i].id != RenderSystem.hover_id) continue;
            if(this.detectors[i].id == RenderSystem.hover_id){
                
                this.drawObject(this.detectors[i],projection, camera, 1.01, new Vector3(1,1,0),1);
                
                this.gl.cullFace(this.gl.BACK);

                this.drawObject(this.detectors[i],projection, camera, 1, this.detectors[i].model.color,0);
            }
            this.gl.enable(this.gl.DEPTH_TEST);
        }
        this.gl.disable(this.gl.DEPTH_TEST);
        for (var i = 0; i < this.guns.length; i++) {
            
            
            let rotation = new Vector3(0,0,0);
            rotation.x = Math.atan2(-this.guns[i].direction.y, this.guns[i].direction.z);
            rotation.z = Math.atan2(this.guns[i].direction.x, -this.guns[i].direction.y);
            rotation.y = Math.atan2(this.guns[i].direction.x, this.guns[i].direction.z);

            let mat = Maths.createTransformationMatrix(this.guns[i].model.position.x, this.guns[i].model.position.y, this.guns[i].model.position.z,
                rotation.x, rotation.y, rotation.z, camera.d*0.01,camera.d*0.01,camera.d*0.01);
            this.drawObject(this.guns[i], projection, camera, camera.d*0.01, this.guns[i].model.color, 0, mat);
            if(this.guns[i].id == RenderSystem.active_id){
                
                mat = Maths.createTransformationMatrix(this.guns[i].model.position.x, this.guns[i].model.position.y, this.guns[i].model.position.z,
                    rotation.x, rotation.y, rotation.z, camera.d*0.011,camera.d*0.011,camera.d*0.011);
                this.drawObject(this.guns[i],projection, camera, this.guns[i].model.scale.x*1.01, new Vector3(1,.4,0),1,mat);
                
                this.gl.cullFace(this.gl.BACK);

                mat = Maths.createTransformationMatrix(this.guns[i].model.position.x, this.guns[i].model.position.y, this.guns[i].model.position.z,
                    rotation.x, rotation.y, rotation.z, camera.d*0.01,camera.d*0.01,camera.d*0.01);
                this.drawObject(this.guns[i],projection, camera, this.guns[i].model.scale.x, this.guns[i].model.color,0,mat);
            }
            if(this.guns[i].id != RenderSystem.hover_id) continue;
            if(this.guns[i].id == RenderSystem.hover_id){
                mat = Maths.createTransformationMatrix(this.guns[i].model.position.x, this.guns[i].model.position.y, this.guns[i].model.position.z,
                    rotation.x, rotation.y, rotation.z, camera.d*0.011,camera.d*0.011,camera.d*0.011);
                this.drawObject(this.guns[i],projection, camera, camera.d*0.1, new Vector3(1,1,0),1,mat);
                
                this.gl.cullFace(this.gl.BACK);
                mat = Maths.createTransformationMatrix(this.guns[i].model.position.x, this.guns[i].model.position.y, this.guns[i].model.position.z,
                    rotation.x, rotation.y, rotation.z, camera.d*0.01,camera.d*0.01,camera.d*0.01);
                this.drawObject(this.guns[i],projection, camera, camera.d*0.01, this.guns[i].model.color,0,mat);
            }

        }
        this.gl.disable(this.gl.DEPTH_TEST);
        
        for (var i = 0; i < this.sources.length; i++) {
            
            //this.drawObject(this.sources[i], projection, camera, camera.d*0.004, this.sources[i].model.color, 0);
            this.drawObject(this.sources[i], projection, camera, camera.d*0.004, this.sources[i].model.color, 0);
            if(this.sources[i].id == RenderSystem.active_id){
                this.drawObject(this.sources[i],projection, camera, camera.d*0.005, new Vector3(1,.4,0),1);
                
                this.gl.cullFace(this.gl.BACK);

                this.drawObject(this.sources[i],projection, camera, camera.d*0.004, this.sources[i].model.color,0);
            }
            
            if(this.sources[i].id != RenderSystem.hover_id) continue;
            if(this.sources[i].id == RenderSystem.hover_id){
                this.drawObject(this.sources[i], projection, camera, camera.d*0.005, new Vector3(1,1,0), 1);
                
                this.gl.cullFace(this.gl.BACK);
                this.drawObject(this.sources[i], projection, camera, camera.d*0.004, this.sources[i].model.color, 0);
                
            }
            this.gl.enable(this.gl.DEPTH_TEST);
        }
       

        this.gl.disable(this.gl.DEPTH_TEST);
        if(this.drawAxes){
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
                this.shader.setUniform1i("fakeLightning", 1);
                //this.shader.setUniform1i("sampler", 0);
                // this.shader.setUniform4fv("view", Maths.createViewMatrix(camera));
                // this.shader.setUniform4fv("projection", projection);
                this.shader.setUniform4fv("transformation", mat);
                this.models[i].draw();
                this.gl.disableVertexAttribArray(0);
                this.gl.disableVertexAttribArray(1);
            }
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
            this.shader.setUniform1i("fakeLightning", 1);
            this.shader.setUniform1i("sampler", 0);
            this.shader.setUniform4fv("view", Maths.createViewMatrix(camera));
            this.shader.setUniform4fv("projection", projection);
            this.shader.setUniform4fv("transformation", mat);
            this.models[i].draw();
            this.gl.disableVertexAttribArray(0);
            this.gl.disableVertexAttribArray(1);
        }
        this.shader.unBind();
        this.gl.disable(this.gl.DEPTH_TEST);
        
    }
}
export default RenderSystem;