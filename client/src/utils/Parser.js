import Detector from '../detector/Detektor';
import Model from '../rendering/model';
import {Cube} from '../entities/cube';
import {ParticleSource} from '../source/ParticleSource';
import Vector3 from '../utils/maths';
import {ParticleGun} from '../gun/ParticleGun';
import GunMesh from '../gun/gun';
import DetectorButton from '../detector/Detektor';

class Parser {
    
    static parse(text, canvas, createDetector, createSource, createGun){
        this.detectors = [];
        this.sources = [];
        let gl = canvas.gl;

        var params = "";
        let blocks = text.split("/");
        for(let i = 0;i<blocks.length;i++){
            let words = blocks[i].split("{");
            words[0] = words[0].replace(' ', '');
            let detector = null;
            let source = null;
            let gun = null;

            if(words[0] == 'Detector'){
                detector = new Detector(new Model(Cube.vertices,Cube.normals,gl));
            }
            if(words[0] == 'Source'){
                source = new ParticleSource(new Model(Cube.vertices,Cube.normals,gl),new Vector3(0,0,0),"U235");
            }
            if(words[0] == 'Gun'){
                gun = new ParticleGun(new Model(Cube.vertices, Cube.normals, gl),new Vector3(0,0,0),new Vector3(0,0,0),0);
            }
            for(let j = 0;j<words.length;j++){
                let lines = words[j].split(";");
                for(let k = 0;k<lines.length;k++){
                    if(lines[k].split("(")[0].trim() == 'clear'){
                        
                    }
                    if(lines[k].split(":").length == 1) continue;
                    let attribute = lines[k].split(":")[0].trim();
                    let params = lines[k].split(":")[1].replace(/\n/g, '');
                    if(words[0] == 'Detector'){
                        switch(attribute){
                            case('position'):
                                detector.model.position.x = parseFloat(params.split(',')[0]);
                                detector.model.position.y = parseFloat(params.split(',')[1]);
                                detector.model.position.z = parseFloat(params.split(',')[2]);
                                break;
                            case('rotation'):
                                detector.model.rotation.x = parseFloat(params.split(',')[0]);
                                detector.model.rotation.y = parseFloat(params.split(',')[1]);
                                detector.model.rotation.z = parseFloat(params.split(',')[2]);
                                break;
                            case('scale'):
                                detector.model.scale.x = parseFloat(params.split(',')[0]);
                                detector.model.scale.y = parseFloat(params.split(',')[1]);
                                detector.model.scale.z = parseFloat(params.split(',')[2]);
                                break;
                            case('material'):
                                detector.material = params;
                                break;
                            case('name'):
                                detector.name = params;
                                break;
                        }
                    }
                    if(words[0] == 'Source'){
                        switch(attribute){
                            case('position'):
                                source.model.position.x = parseFloat(params.split(',')[0]);
                                source.model.position.y = parseFloat(params.split(',')[1]);
                                source.model.position.z = parseFloat(params.split(',')[2]);
                                break;
                            case('material'):
                                source.material = params;
                                break;
                            case('name'):
                                source.name = params;
                                break;
                        }
                    }
                    if(words[0] == 'Gun'){
                        switch(attribute){
                            case('position'):
                                gun.model.position.x = parseFloat(params.split(',')[0]);
                                gun.model.position.y = parseFloat(params.split(',')[1]);
                                gun.model.position.z = parseFloat(params.split(',')[2]);
                                break;
                            case('direction'):
                                gun.direction.x = parseFloat(params.split(',')[0]);
                                gun.direction.y = parseFloat(params.split(',')[1]);
                                gun.direction.z = parseFloat(params.split(',')[2]);
                                break;
                            case('energy'):
                                gun.material = parseFloat(params);
                                break;
                            case('name'):
                                gun.name = params;
                                break;
                        }
                    }
                    
                }
                
            }
            if(gun != null){
                createGun(gun.name, gun.model.position.x,gun.model.position.y,gun.model.position.z,gun.direction.x,gun.direction.y, gun.direction.z,gun.energy);
            }
            if(source != null) {
                createSource(source.name,source.model.position.x, source.model.position.y,source.model.position.z,source.material);
            }
            if(detector != null){
                createDetector(detector.name, detector.model.position.x,detector.model.position.y,detector.model.position.z,
                    detector.model.rotation.x,detector.model.rotation.y,detector.model.rotation.z,
                    detector.model.scale.x,detector.model.scale.y,detector.model.scale.z,detector.material,'cube',Cube.vertices);
                    
            }
        } 
    }
}

export default Parser;