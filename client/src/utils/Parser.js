import Detector from '../detector/Detektor';
import Model from '../rendering/model';
import {Cube} from '../entities/cube';
import {ParticleSource} from '../source/ParticleSource';
import {Vector3} from '../utils/maths';
import {ParticleGun} from '../gun/ParticleGun';
import GunMesh from '../gun/gun';
import DetectorButton from '../detector/DetectorButton';
import React, { Component, createRef } from 'react';

//TO-DO
//position[cm]
var m = 100;
var dm = 10;
var cm = 1;
var mm = .1;
var eV = .001;
var keV = 1;
var MeV = 1000;
var GeV = 1000000;
var deg = 0.0174527777777778;
var rad = 1;
class Parser {
    static checkString(s){
        s = s.trim();
        if(s.split('"').length % 2 == 0){
            return false;
        }
        if(s[0] != '"') return false;
        if(s[s.length-1] != '"') return false;
        return true;
    }
    static chunks = [];

    static removeChunk(id){
        let result = " ";
        
        for(let i = 0;i<Parser.chunks.length;i++){
            if(Parser.chunks[i].id == id){
                Parser.chunks.splice(i, 1);
                break;
            } 
        }
        alert(id);
        for(let i = 0;i<Parser.chunks.length;i++){
            alert(Parser.chunks[i].code);
            alert(Parser.chunks[i].id);
            result += Parser.chunks[i].code;
        }
        return result;
    }
    static checkFloat(s, v, me){
        if(isNaN(parseFloat(s.split(',')[0]))) return false;
        if(isNaN(parseFloat(s.split(',')[1]))) return false;
        if(isNaN(parseFloat(s.split(',')[2]))) return false;
        v.x = parseFloat(s.split(',')[0]) * me;
        v.y = parseFloat(s.split(',')[1]) * me;
        v.z = parseFloat(s.split(',')[2]) * me;
        return true;
    }
    static parse(text, canvas, clearSetup, createDetector, createSource, createGun){
        this.detectors = [];
        this.sources = [];
        let gl = canvas.gl;
        let blocks = text.split("\\");
        clearSetup();
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
                    let measurement = cm;
                    switch(attribute.substring(attribute.indexOf("[")+1,attribute.indexOf("]"))){
                        case("eV"):
                            measurement = eV;
                            break;
                        case("keV"):
                            measurement = keV;
                            break;
                        case("MeV"):
                            measurement = MeV;
                            break;
                        case("GeV"):
                            measurement = GeV;
                            break;
                        case("mm"):
                            measurement = mm;
                            break;
                        case("deg"):
                            measurement = deg;
                            break;
                        case("rad"):
                            measurement = rad;
                            break;
                        case("cm"):
                            measurement = cm;
                            break;
                        case("dm"):
                            measurement = dm;
                            break;
                        case("m"):
                            measurement = m;
                            break;
                        default:
                            measurement = cm;
                    }
                    if(attribute.includes("[")) attribute = attribute.substr(0, attribute.indexOf("["));
                    let params = lines[k].split(":")[1].replace(/\n/g, '');
                    if(words[0] == 'Detector'){
                        switch(attribute){
                            case('position'):
                                if(!this.checkFloat(params, detector.model.position, measurement)) alert("position incorrec format");
                                break;
                            case('rotation'):
                                if(!this.checkFloat(params, detector.model.rotation, measurement)) alert("rotation incorrec format");

                                break;
                            case('scale'):
                                if(!this.checkFloat(params, detector.model.scale, measurement)) alert("scale incorrec format");

                                break;
                            case('material'):
                                if(!this.checkString(params)) alert("meterial incorrect format");
                                detector.material = params.trim().substring(1,params.trim().length-1);
                                break;
                            case('name'):
                                if(!this.checkString(params)) alert("name incorrect format");
                                detector.name = params.trim().substring(1,params.trim().length-1);
                                break;
                            default:
                                alert("No such property: " + attribute);
                                break;
                        }
                    }
                    if(words[0] == 'Source'){
                        switch(attribute){
                            case('position'):
                                if(!this.checkFloat(params, source.model.position, measurement)) alert("position incorrec format");
                                break;
                            case('material'):
                                if(!this.checkString(params)) alert("material incorrect format");
                                source.material = params.trim().substring(1,params.trim().length-1);
                                break;
                            case('name'):
                                if(!this.checkString(params)) alert("name incorrect format");
                                source.name = params.trim().substring(1,params.trim().length-1);
                                break;
                            default:
                                alert("No such property: " + attribute);
                                break;
                        }   
                    }
                    if(words[0] == 'Gun'){
                        switch(attribute){
                            case('position'):
                                if(!this.checkFloat(params, gun.model.position, measurement)) alert("position incorrec format");
                                break;
                            case('direction'):
                                if(!this.checkFloat(params, gun.direction, measurement)) alert("direction incorrec format");
                                break;
                            case('energy'):
                                alert(measurement);
                                gun.energy = parseFloat(params) * measurement;
                                break;
                            case('name'):
                                if(!this.checkString(params)) alert("name incorrect format");
                                gun.name = params.trim().substring(1,params.trim().length-1);
                                break;
                            default:
                                alert("No such property: " + attribute);
                                break;
                        }
                    }
                    
                }
                
            }

            if(gun != null){

                createGun(gun.name, gun.model.position.x,gun.model.position.y,gun.model.position.z,gun.direction.x,gun.direction.y, gun.direction.z,gun.energy, false);
            }
            if(source != null) {

                createSource(source.name,source.model.position.x, source.model.position.y,source.model.position.z,source.material,false);
            }
            if(detector != null){

                createDetector(detector.name, detector.model.position.x,detector.model.position.y,detector.model.position.z,
                    detector.model.rotation.x,detector.model.rotation.y,detector.model.rotation.z,
                    detector.model.scale.x,detector.model.scale.y,detector.model.scale.z,detector.material,'cube',Cube.vertices, new Vector3(.5,.5,.5), false);
                
            }
        } 
    }
}

export default Parser;