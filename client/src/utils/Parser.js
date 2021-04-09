import Detector from '../detector/Detektor';
import Model from '../rendering/model';
import { Cube } from '../entities/cube';
import { ParticleSource } from '../source/ParticleSource';
import { Vector3 } from '../utils/maths';
import { ParticleGun } from '../gun/ParticleGun';
import GunMesh from '../gun/gun';
import DetectorButton from '../detector/DetectorButton';
import React, { Component, createRef } from 'react';
import MaterialList from '../detector/MaterialList';
import VolumeList from '../volume/VolumeList';
import UnitConverter from '../utils/UnitConverter';

//TO-DO
//position[cm]
var m = 100;
var dm = 10;
var cm = 1;
var mm = .1;
var eV = 1;
var keV = 1000;
var MeV = 1000000;
var GeV = 1000000000;
var deg = 0.0174527777777778;
var rad = 1;
class Parser {
    static showVolumeDialog = null;
    static confirmDialog = null;

    static init(f0, f1) {
        Parser.showVolumeDialog = f0;
        Parser.confirmDialog = f1;
    }
    static checkString(s) {
        s = s.trim();
        if (s.split('"').length % 2 == 0) {
            return false;
        }
        if (s[0] != '"') return false;
        if (s[s.length - 1] != '"') return false;
        return true;
    }
    static chunks = [];

    static addDetectorCode(id, name, position, rotation, scale, material, geometry, posu, rotu, scaleu){
        let n = "\\Detector{\n" +
        "\tname: " + '"' + name + '";\n' +
        "\tposition[" + UnitConverter.convertLength(posu) + "]: " + position.x + ", " + position.y + ", " + position.z + ";\n" +
        "\trotation[" + UnitConverter.convertAngle(rotu) + "]: " + rotation.x + ", " + rotation.y + ", " + rotation.z + ";\n" +
        "\tscale[" + UnitConverter.convertLength(scaleu) + "]: " + scale.x + ", " + scale.y + ", " + scale.z + ";\n" +
        "\tmaterial: " + '"' + material + '";\n' +
        "\tgeometry: " + '"' + geometry + '";\n' +
  
        "}\n";
        Parser.chunks.push({id: id, code: n});

        return n;
    }
    static addSourceCode(id, name, position, material, posu){
        let n = "\\Source{\n" +
        "\tname: " + '"' + name + '";\n' +
        "\tposition[" + UnitConverter.convertLength(posu) + "]: " + position.x + ", " + position.y + ", " + position.z + ";\n" +
        "\tmaterial: " + '"' + material + '";\n' +
        "}\n";

        Parser.chunks.push({id: id, code: n});

        return n;
    }
    static addGunCode(id, name, position, direction, energy, posu, energyu){
        let n = "\\Gun{\n" +
        "\tname: " + '"' + name + '";\n' +
        "\tposition[" + UnitConverter.convertLength(posu) + "]: " + position.x + ", " + position.y + ", " + position.z + ";\n" +
        "\tdirection: " + direction.x + ", " + direction.y + ", " + direction.z + ";\n" +
        "\tenergy[" + UnitConverter.convertEnergy(energyu) + "]: " + energy + ';\n' +
        "}\n"

        Parser.chunks.push({id: id, code: n});

        return n;
    }

    static removeChunk(id) {
        let result = " ";

        for (let i = 0; i < Parser.chunks.length; i++) {
            if (Parser.chunks[i].id == id) {
                Parser.chunks.splice(i, 1);
                break;
            }
        }
        for (let i = 0; i < Parser.chunks.length; i++) {
            result += Parser.chunks[i].code;
        }
        return result;
    }
    
    static checkFloat(s, v, me) {
        if (isNaN(parseFloat(s.split(',')[0]))) return false;
        if (isNaN(parseFloat(s.split(',')[1]))) return false;
        if (isNaN(parseFloat(s.split(',')[2]))) return false;
        v.x = parseFloat(s.split(',')[0]) * me;
        v.y = parseFloat(s.split(',')[1]) * me;
        v.z = parseFloat(s.split(',')[2]) * me;
        return true;
    }
    static parse(text, canvas, clearSetup, createDetector, createSource, createGun) {
        let detectors = [];
        let sources = [];
        let guns = [];
        let gl = canvas.gl;
        let blocks = text.split("\\");
        let error = false;
        let failed_detectors = [];
        for (let i = 0; i < blocks.length; i++) {
            let words = blocks[i].split("{");
            words[0] = words[0].replace(' ', '');
            let detector = null;
            let source = null;
            let gun = null;
            let detector_geometry = 'cube';
            if (words[0] == 'Detector') {
                detector = new Detector(new Model(Cube.vertices, Cube.normals, gl));
            }
            if (words[0] == 'Source') {
                source = new ParticleSource(new Model(Cube.vertices, Cube.normals, gl), new Vector3(0, 0, 0), "U235");
            }
            if (words[0] == 'Gun') {
                gun = new ParticleGun(new Model(Cube.vertices, Cube.normals, gl), new Vector3(0, 0, 0), new Vector3(0, 0, 0), 0);
            }
            for (let j = 0; j < words.length; j++) {
                let lines = words[j].split(";");
                for (let k = 0; k < lines.length; k++) {
                    if (lines[k].split("(")[0].trim() == 'clear') {

                    }
                    if (lines[k].split(":").length == 1) continue;
                    let attribute = lines[k].split(":")[0].trim();
                    let measurement = cm;
                    switch (attribute.substring(attribute.indexOf("[") + 1, attribute.indexOf("]"))) {
                        case ("eV"):
                            measurement = eV;
                            break;
                        case ("keV"):
                            measurement = keV;
                            break;
                        case ("MeV"):
                            measurement = MeV;
                            break;
                        case ("GeV"):
                            measurement = GeV;
                            break;
                        case ("mm"):
                            measurement = mm;
                            break;
                        case ("deg"):
                            measurement = deg;
                            break;
                        case ("rad"):
                            measurement = rad;
                            break;
                        case ("cm"):
                            measurement = cm;
                            break;
                        case ("dm"):
                            measurement = dm;
                            break;
                        case ("m"):
                            measurement = m;
                            break;
                        default:
                            measurement = cm;
                    }
                    if (attribute.includes("[")) attribute = attribute.substr(0, attribute.indexOf("["));
                    let params = lines[k].split(":")[1].replace(/\n/g, '');
                    if (words[0] == 'Detector') {
                        switch (attribute) {
                            case ('geometry'):
                                detector_geometry = params.trim().substring(1, params.trim().length - 1);
                                detector.geometry = detector_geometry;
                                if (VolumeList.getVolume(detector_geometry) == undefined) {
                                    error = true;
                                    if(!failed_detectors.includes(detector_geometry))failed_detectors.push(detector_geometry);
                                }
                                break;
                            case ('position'):
                                if (!this.checkFloat(params, detector.model.position, measurement)) alert("position incorrect format");
                                break;
                            case ('rotation'):
                                if (!this.checkFloat(params, detector.model.rotation, measurement)) alert("rotation incorrect format");
                                break;
                            case ('scale'):
                                if (!this.checkFloat(params, detector.model.scale, measurement)) alert("scale incorrect format");

                                break;
                            case ('material'):
                                if (!this.checkString(params)) alert("meterial incorrect format");
                                detector.material = params.trim().substring(1, params.trim().length - 1);
                                MaterialList.checkMaterial(detector.material, () => {
                                    alert("No material named: " + detector.material + "\nMaterial set to Lead(Pb)!");
                                    detector.material = "Pb";
                                });
                                break;
                            case ('name'):
                                if (!this.checkString(params)) alert("name incorrect format");
                                detector.name = params.trim().substring(1, params.trim().length - 1);
                                if(detector.name.length > 15){
                                    this.confirmDialog("Name too long","The name you've given to detector " + detector.name + " was too long, maximum length is 15 characters.",()=>{

                                    });
                                    return;
                                }
                                break;

                            default:
                                alert("No such property: " + attribute);
                                break;
                        }
                    }
                    if (words[0] == 'Source') {
                        switch (attribute) {
                            case ('position'):
                                if (!this.checkFloat(params, source.model.position, measurement)) alert("position incorrec format");
                                break;
                            case ('material'):
                                if (!this.checkString(params)) alert("material incorrect format");
                                source.material = params.trim().substring(1, params.trim().length - 1);
                                MaterialList.checkSource(source.material, () => {
                                    alert("No source named: " + source.material + "\nSource set to Cobalt(Co60)!");
                                    source.material = "Co60";
                                });
                                break;
                            case ('name'):
                                if (!this.checkString(params)) alert("name incorrect format");
                                source.name = params.trim().substring(1, params.trim().length - 1);
                                if(source.name.length > 15){
                                    this.confirmDialog("Name too long","The name you've given to source " + source.name + " was too long, maximum length is 15 characters.",()=>{

                                    });
                                    return;
                                }
                                break;
                            default:
                                alert("No such property: " + attribute);
                                break;
                        }
                    }
                    if (words[0] == 'Gun') {
                        switch (attribute) {
                            case ('position'):
                                if (!this.checkFloat(params, gun.model.position, measurement)) alert("position incorrect format");
                                break;
                            case ('direction'):
                                if (!this.checkFloat(params, gun.direction, measurement)) alert("direction incorrect format");
                                break;
                            case ('energy'):
                                gun.energy = parseFloat(params) * measurement;
                                break;
                            case ('name'):
                                if (!this.checkString(params)) alert("name incorrect format");
                                gun.name = params.trim().substring(1, params.trim().length - 1);
                                if(gun.name.length > 15){
                                    this.confirmDialog("Name too long","The name you've given to gun " + gun.name + " was too long, maximum length is 15 characters.",()=>{

                                    });
                                    return;
                                }
                                break;
                            default:
                                alert("No such property: " + attribute);
                                break;
                        }
                    }

                }

            }
            if (gun != null) {
                //createGun(gun.name, gun.model.position.x, gun.model.position.y, gun.model.position.z, gun.direction.x, gun.direction.y, gun.direction.z, gun.energy, false);
                guns.push(gun);
            }
            if (source != null) {
                //createSource(source.name, source.model.position.x, source.model.position.y, source.model.position.z, source.material, false);
                sources.push(source);
            }
            if (detector != null) {
                // createDetector(detector.name, detector.model.position.x, detector.model.position.y, detector.model.position.z,
                //     detector.model.rotation.x, detector.model.rotation.y, detector.model.rotation.z,
                //     detector.model.scale.x, detector.model.scale.y, detector.model.scale.z, detector.material, 'stl', VolumeList.getVolume(detector_geometry).data, new Vector3(.5, .5, .5), false);
                if (VolumeList.getVolume(detector_geometry) != undefined) detectors.push(detector);
            }
        }
        //TO_DO
        if (error) {

            Parser.confirmDialog("Volume not found!", "Add the volume to the volume list before referencing it in the script then click 'Run script' again.",
                () => {
                    Parser.showVolumeDialog.showDialog(failed_detectors, () => {
                        //Parser.parse(text, canvas, clearSetup, createDetector, createSource, createGun);
                    });

                });
            return;
        }
        clearSetup();
        guns.forEach(gun => {
            createGun(gun.name, gun.model.position.x, gun.model.position.y, gun.model.position.z, gun.direction.x, gun.direction.y, gun.direction.z, gun.energy, false,1,1,1);
        });

        sources.forEach(source => {
            createSource(source.name, source.model.position.x, source.model.position.y, source.model.position.z, source.material, false,1,1,1);
        });

        detectors.forEach(detector => {
            createDetector(detector.name, detector.model.position.x, detector.model.position.y, detector.model.position.z,
                detector.model.rotation.x, detector.model.rotation.y, detector.model.rotation.z,
                detector.model.scale.x, detector.model.scale.y, detector.model.scale.z, detector.material, detector.geometry, VolumeList.getVolume(detector.geometry).data, new Vector3(.5, .5, .5), false,1,1,1);
        });


    }
}

export default Parser;