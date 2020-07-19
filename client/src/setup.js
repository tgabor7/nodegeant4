import Detector from "./Detektor.js";
import {Cube} from "./cube.js";
import Model from "./model.js";
import { ParticleSource } from "./ParticleSource.js";
import { Vector3 } from "./maths.js";

export class Setup {
    constructor(text,gl){
        this.detectors = [];
        this.sources = [];
        this.gl = gl;

        var params = "";
        let lines = text.split("/");
        for(let i = 0;i<lines.length;i++){
            let words = lines[i].split("{");
            let detector = null;
            let source = null;
            console.log(lines[i].substring(0,lines[i].indexOf("{")));

            if(words[0] == 'Detector'){
                detector = new Detector(new Model(Cube.vertices,Cube.normals,this.gl));
            }
            if(words[0] == 'Source'){
                source = new ParticleSource(new Model(Cube.vertices,Cube.normals,this.gl),new Vector3(0,0,0),"U235");
            }
            for(let j = 0;j<words.length;j++){
                params = words[j].substring(words[j].lastIndexOf("{") + 1, words[j].lastIndexOf("}"));
                params = params.split(",");
                
                if(words[0] == 'Detector'){
                    switch(j){
                        case(1):
                            detector.model.position.x = params[0];
                            detector.model.position.y = params[1];
                            detector.model.position.z = params[2];
                            break;
                        case(2):
                            detector.model.rotation.x = params[0];
                            detector.model.rotation.y = params[1];
                            detector.model.rotation.z = params[2];
                            break;
                        case(3):
                            detector.model.scale.x = params[0];
                            detector.model.scale.y = params[1];
                            detector.model.scale.z = params[2];
                            break;
                    }
                }
                if(words[0] == 'Source'){
                    switch(j){
                        case(1):
                            source.model.position.x = params[0];
                            source.model.position.y = params[1];
                            source.model.position.z = params[2];
                            break;
                    }
                }
                
            }
            if(source != null) this.sources.push(source);
            if(detector != null) this.detectors.push(detector);
        } 
    }
    getDetectors(){
        return this.detectors;
    }
    getSources(){
        return this.sources;
    }
}