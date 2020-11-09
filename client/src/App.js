import React, { Component, createRef } from 'react';
import './App.css';

import Canvas from './graphics/Canvas.js';
import { Button, Card, Accordion, Container, Row, Col, Tabs, Tab, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DetectorButton from './detector/DetectorButton';
import NavigationBar from './graphics/NavigationBar';
import GunButton from './gun/GunButton';
import SourceButton from './source/SourceButton';
import Particle from './entities/Particle';
import { Vector3 } from './utils/maths';
import Model from './rendering/model';
import Spectrum from './graphics/spectrum';
import STLParser from './utils/STLParser';
import CodeEditor from './graphics/CodeEditor';
import Parser from './utils/Parser';
import ModelCanvas from './graphics/ModelCanvas';
import VolumeButton from './volume/VolumeButton';
import VolumeList from './volume/VolumeList';
import VolumeDialog from './volume/VolumeDialog';
import PopupDialog from './graphics/PopupDialog';
import VolumeSelectDialog from './volume/VolumeSelectDialog';
import { Element } from 'react-scroll';
import UnitConverter from './utils/UnitConverter';
import Logger from './utils/Logger';
import CodeTests from './utils/codeTests';

class App extends Component {
  constructor(props) {
    super(props);
    this.spectrum = React.createRef();
    this.navbar = React.createRef();
    this.codeeditor = React.createRef();
    this.volumedialog = React.createRef();
    this.popup = React.createRef();
    this.volumeselect = React.createRef();

    this.state = {
      buttons: [], gunbuttons: [], sourcebuttons: [], volumebuttons: [], spectrum: true, page: 'first',
      volumebuttonheight: "100%"
    }
    this.createDetector = this.createDetector.bind(this);
    this.createSource = this.createSource.bind(this);
    this.createGun = this.createGun.bind(this);
    this.createVolume = this.createVolume.bind(this);
    this.removeDetector = this.removeDetector.bind(this);
    this.removeGun = this.removeGun.bind(this);
    this.removeSource = this.removeSource.bind(this);

    this.runSim = this.runSim.bind(this);
    this.runSpectroscopy = this.runSpectroscopy.bind(this);

    this.setShowParticles = this.setShowParticles.bind(this);
    this.setShowTracks = this.setShowTracks.bind(this);
    this.setShowAxes = this.setShowAxes.bind(this);
    this.setShowGrid = this.setShowGrid.bind(this);

    this.clearRun = this.clearRun.bind(this);
    this.clearSetup = this.clearSetup.bind(this);


    this.accordion = React.createRef();
    this.canvas = React.createRef();



    this.detectors = [];
    this.guns = [];
    this.sources = [];
    this.particles = [];
    this.tracks = [];
    this.volumes = [];
  }
  clearRun() {
    this.canvas.current.clearRun();
  }
  runSpectroscopy(number_of_particles, detector, hideDialog, binsize) {
    Logger.log(1, "Started spectrum simulation");
    let message_data = [];

    // particle gun stuff
    message_data.push(0);

    message_data.push(1);


    message_data.push(0);
    message_data.push(0);
    message_data.push(0);

    message_data.push(0);
    message_data.push(0);
    message_data.push(0);

    message_data.push(0);

    // detector stuff
    var number_of_detectors = this.detectors.length;

    message_data.push(number_of_detectors);

    for (var i = 0; i < number_of_detectors; i++) {

      message_data.push("G4_" + this.detectors[i].material);
      message_data.push(this.detectors[i].id);
      message_data.push(this.detectors[i].model.position.x);
      message_data.push(this.detectors[i].model.position.y);
      message_data.push(this.detectors[i].model.position.z);

      message_data.push(this.detectors[i].model.rotation.x);
      message_data.push(this.detectors[i].model.rotation.y);
      message_data.push(this.detectors[i].model.rotation.z);

      message_data.push(this.detectors[i].model.scale.x);
      message_data.push(this.detectors[i].model.scale.y);
      message_data.push(this.detectors[i].model.scale.z);

      message_data.push(this.detectors[i].model.vertices.length);
      for (var j = 0; j < this.detectors[i].model.vertices.length; j++) {
        message_data.push(this.detectors[i].model.vertices[j]);
      }
    }
    //sources
    var number_of_sources = this.sources.length;
    message_data.push(number_of_sources);
    for (var i = 0; i < number_of_sources; i++) {

      message_data.push(this.sources[i].material);
      //message_data.push(detectors[i].id);

      message_data.push(this.sources[i].model.position.x);
      message_data.push(this.sources[i].model.position.y);
      message_data.push(this.sources[i].model.position.z);
    }
    //guns
    var number_of_guns = this.guns.length;
    message_data.push(number_of_guns);
    for (var i = 0; i < number_of_guns; i++) {
      message_data.push(this.guns[i].model.position.x);
      message_data.push(this.guns[i].model.position.y);
      message_data.push(this.guns[i].model.position.z);

      message_data.push(this.guns[i].direction.x);
      message_data.push(this.guns[i].direction.y);
      message_data.push(this.guns[i].direction.z);

      message_data.push(this.guns[i].energy);
    }
    message_data.push(this.detectors[detector].id); //selected detector id
    message_data.push(number_of_particles); //number of particles
    message_data.push('end');
    this.sendGamma(message_data, hideDialog, binsize);
  }
  runSim(number_of_particles, hidedialog) {
    this.clearRun();
    Logger.log(1, "Started simulation");
    let message_data = [];

    // particle gun stuff
    message_data.push(1);

    message_data.push(1);


    message_data.push(0);
    message_data.push(0);
    message_data.push(0);

    message_data.push(0);
    message_data.push(0);
    message_data.push(0);

    message_data.push(0);

    // detector stuff
    var number_of_detectors = this.detectors.length;

    message_data.push(number_of_detectors);

    for (var i = 0; i < number_of_detectors; i++) {

      message_data.push("G4_" + this.detectors[i].material);
      message_data.push(this.detectors[i].id);
      message_data.push(this.detectors[i].model.position.x);
      message_data.push(this.detectors[i].model.position.y);
      message_data.push(this.detectors[i].model.position.z);

      message_data.push(this.detectors[i].model.rotation.x);
      message_data.push(this.detectors[i].model.rotation.y);
      message_data.push(this.detectors[i].model.rotation.z);

      message_data.push(this.detectors[i].model.scale.x);
      message_data.push(this.detectors[i].model.scale.y);
      message_data.push(this.detectors[i].model.scale.z);

      message_data.push(this.detectors[i].model.vertices.length);
      for (var j = 0; j < this.detectors[i].model.vertices.length; j++) {
        message_data.push(this.detectors[i].model.vertices[j]);
      }
    }
    //sources
    var number_of_sources = this.sources.length;
    message_data.push(number_of_sources);
    for (var i = 0; i < number_of_sources; i++) {

      message_data.push(this.sources[i].material);
      //message_data.push(detectors[i].id);

      message_data.push(this.sources[i].model.position.x);
      message_data.push(this.sources[i].model.position.y);
      message_data.push(this.sources[i].model.position.z);
    }
    //guns
    var number_of_guns = this.guns.length;
    message_data.push(number_of_guns);
    for (var i = 0; i < number_of_guns; i++) {
      message_data.push(this.guns[i].model.position.x);
      message_data.push(this.guns[i].model.position.y);
      message_data.push(this.guns[i].model.position.z);

      message_data.push(this.guns[i].direction.x);
      message_data.push(this.guns[i].direction.y);
      message_data.push(this.guns[i].direction.z);

      message_data.push(this.guns[i].energy);
    }
    message_data.push(number_of_particles); //number of particles
    //alert(number_of_particles);
    message_data.push('end');
    this.send(message_data, hidedialog);
  }
  sendGamma(data, hideDialog, binsize) {
    var message = '';
    for (var i = 0; i < data.length; i++) {
      message += data[i];
      message += ',';
    }
    fetch('http://localhost:9000/gammaAPI', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ data: message })
    })
      .then(response => response.text())
      .then(response => {
        this.processGammaSpectrum(response, binsize);
        hideDialog();
        this.setState({ spectrum: false, page: "second" });
        Logger.log(1, "Finished spectrum simulation");
      });
  }
  send(data, hidedialog) {
    var message = '';
    for (var i = 0; i < data.length; i++) {
      message += data[i];
      message += ',';
    }
    fetch('http://localhost:9000/gammaAPI', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ data: message })
    })
      .then(response => response.text())
      .then(response => {
        this.processResponse(response);
        hidedialog();
        Logger.log(1, "Finished simulation");

      });
  }
  processGammaSpectrum(response, binsize) {

    let message = response;

    message = message.split(" ");
    this.spectrum.current.clear(binsize);
    for (var i = 0; i < message.length; i++) {
      this.spectrum.current.add(Math.floor(parseFloat(message[i]) / binsize) * binsize);
    }
    this.spectrum.current.sort(binsize);
  }
  processResponse(response) {
    var message = response;
    var floats = message.split(' ');
    var index = 0;
    var j = 0;
    function toNode(p, l) {
      if (p == 'gamma') return '"' + l + '"';
      if (p == 'e-') return '"' + l + '"';
      if (p == 'e+') return '"' + l + '"';
    }
    this.particles = [];
    while (index < floats.length - 1 - this.detectors.length - 1) {
      var track_data = [];
      var numberOfSteps = parseInt(floats[index]);
      if (numberOfSteps == 0) break;
      var definition = floats[index + 1];
      for (var i = 0; i < numberOfSteps; i++) {
        var particle = new Particle();
        particle.position.x = parseFloat(floats[index + i * 7 + 2]) * .1;
        particle.position.y = parseFloat(floats[index + i * 7 + 3]) * .1;
        particle.position.z = parseFloat(floats[index + i * 7 + 4]) * .1;

        track_data.push(parseFloat(floats[index + i * 7 + 2]) * .1);
        track_data.push(parseFloat(floats[index + i * 7 + 3]) * .1);
        track_data.push(parseFloat(floats[index + i * 7 + 4]) * .1);

        particle.definition = definition;
        particle.track_id = parseInt(floats[index + i * 7 + 5]);
        particle.parent_id = parseInt(floats[index + i * 7 + 6]);
        particle.totalEnergy = parseFloat(floats[index + i * 7 + 7]);
        particle.energyDeposit = parseFloat(floats[index + i * 7 + 8]);

        particle.color = new Vector3(1, 0, 0);
        particle.id = j;


        j++;


        this.particles.push(particle);
      }
      index += numberOfSteps * 7 + 2;

      var t_norm = [];
      for (var k = 0; k < track_data.length; k++) {
        t_norm.push(1);
      }

      var tm = this.canvas.current.addModel(track_data, t_norm);
      if (definition == "e-") tm.color = new Vector3(1, 0, 1);
      if (definition == "gamma") tm.color = new Vector3(1, 1, 1);
      if (definition == "e+") tm.color = new Vector3(1, 1, 0);
      tm.drawLines = true;
      this.tracks.push(tm);
    }

    if(this.particles.length > 1000){
      this.popup.current.showDialog("Too many particles!","Low energy particles will be ommited!",()=>{});
      this.particles = this.particles.sort((a,b)=>{return b.totalEnergy - a.totalEnergy});
      this.particles.length = 1000;
      //this.particles.splice(1000, this.particles.length-1000);
    } 
    let tmp_particles = [];
    for (var i = 0; i < this.particles.length; i ++) {
      tmp_particles.push(this.particles[i]);
    }
    
    this.particles = tmp_particles.slice();
    function get_max(particles){
      var max = 0;
      for (var i = 0; i < particles.length; i++) {
        if(particles[i].totalEnergy > max) max = particles[i].totalEnergy;
      }
      return max;
    }
    let max = get_max(this.particles);
    this.canvas.current.instanceRenderer.maxenergy = max;

    function get_average(particles) {
      var max = 0;
      for (var i = 0; i < particles.length; i++) {
        max += +particles[i].totalEnergy;
      }
      max = max / particles.length;

      return max;
    }
    
    //let max = get_average(this.particles) * 2;

    for (let i = 0; i < this.particles.length; i++) {
      //if (this.particles[i].totalEnergy > max) this.particles[i].totalEnergy = max;
      
      this.particles[i].color.x = this.particles[i].totalEnergy;
      //this.particles[i].color.y = 1 - this.particles[i].color.x;

      let d = Math.sqrt(this.particles[i].color.x / max);
      this.particles[i].scale = new Vector3(d*.03,d*.03,d*.03);
      this.canvas.current.addParticle(this.particles[i]);
    }
    if (this.particles.length > 0) this.navbar.current.showClearParticles(true);
  }
  modifyDetector(detector) {

  }
  createVolume(name, data, label) {
    let modeldata = STLParser.parseData(data);
    let bs = this.state.volumebuttons;
    VolumeList.addVolume({ name: name, data: data });
    let vol = { name: name, data: data };
    this.volumes.push(vol);
    bs.push(<VolumeButton name={name} volume={vol} modeldata={modeldata} filelabel={label}></VolumeButton>);
    this.setState({ volumebuttons: bs });
  }
  async createSource(n, x, y, z, mat, code, posu) {
    if (this.detectors.length > 0) this.navbar.current.showRun(true);
    this.navbar.current.showClearSetup(true);
    if (!code) this.codeeditor.current.updateText(
      this.codeeditor.current.state.text +
      "\\Source{\n" +
      "\tname: " + '"' + n + '";\n' +
      "\tposition[" + UnitConverter.convertLength(posu) + "]: " + x + ", " + y + ", " + z + ";\n" +
      "\tmaterial: " + '"' + mat + '";\n' +
      "}\n"
    );

    let bs = this.state.sourcebuttons;
    let details = <Container>
      <Row>
        <Col>Position: </Col>
      </Row>
      <Row>
        <Col>x: {x} {UnitConverter.convertLength(posu)}</Col>
        <Col>y: {y} {UnitConverter.convertLength(posu)}</Col>
        <Col>z: {z} {UnitConverter.convertLength(posu)}</Col>
      </Row>
      <Row>
        <Col>Material: {mat}</Col>
      </Row>
    </Container>;
    let source = this.canvas.current.addSource(x*posu, y*posu, z*posu, mat);
    source.id = +DetectorButton.id;
    Parser.chunks.push({
      id: source.id, code: "\\Source{\n" +
        "\tname: " + '"' + n + '";\n' +
        "\tposition[" + UnitConverter.convertLength(posu) + "]: " + x + ", " + y + ", " + z + ";\n" +
        "\tmaterial: " + '"' + mat + '";\n' +
        "}\n"
    });
    source.name = n;
    source.units[0] = posu;
    this.sources.push(source);
    bs.push(<SourceButton codeeditor={this.codeeditor} name={n} removebutton={this.removeSource} id={DetectorButton.id} detector={source} details={details} key={++DetectorButton.id} buttons={this.state.sourcebuttons}></SourceButton>);
    this.setState({ sourcebuttons: bs });
    Logger.log(1, "Created source");
    return [source, DetectorButton.id];
  }
  async createGun(n, px, py, pz, dx, dy, dz, energy, code, posu, energyu) {
    if (this.detectors.length > 0) this.navbar.current.showRun(true);
    this.navbar.current.showClearSetup(true);

    if (!code) this.codeeditor.current.updateText(
      this.codeeditor.current.state.text +
      "\\Gun{\n" +
      "\tname: " + '"' + n + '";\n' +
      "\tposition[" + UnitConverter.convertLength(posu) + "]: " + px + ", " + py + ", " + pz + ";\n" +
      "\tdirection: " + dx + ", " + dy + ", " + dz + ";\n" +
      "\tenergy[" + UnitConverter.convertEnergy(energyu) + "]: " + energy + ';\n' +
      "}\n"
    );

    let bs = this.state.gunbuttons;
    let details = <Container>
      <Row>
        <Col>Position: </Col>
      </Row>
      <Row>
        <Col>x: {px} cm</Col>
        <Col>y: {py} cm</Col>
        <Col>z: {pz} cm</Col>
      </Row>
      <Row>
        <Col>Direction: </Col>
      </Row>
      <Row>
        <Col>x: {dx} </Col>
        <Col>y: {dy} </Col>
        <Col>z: {dz} </Col>
      </Row>
      <Row>
        <Col>Energy: {energy} keV</Col>
      </Row>
    </Container>;

    let gun = this.canvas.current.addGun(px*posu, py*posu, pz*posu, dx, dy, dz, energy*energyu);
    gun.id = +DetectorButton.id;
    Parser.chunks.push({
      id: gun.id, code: "\\Gun{\n" +
        "\tname: " + '"' + n + '";\n' +
        "\tposition[cm]: " + px + ", " + py + ", " + pz + ";\n" +
        "\tdirection: " + dx + ", " + dy + ", " + dz + ";\n" +
        "\tenergy[keV]: " + energy + ';\n' +
        "}\n"
    });
    gun.name = n;
    gun.units[0] = posu;
    gun.units[1] = energyu;
    this.guns.push(gun);
    bs.push(<GunButton codeeditor={this.codeeditor} name={n} removebutton={this.removeGun} id={DetectorButton.id} detector={gun} details={details} key={++DetectorButton.id} buttons={this.state.buttons}></GunButton>);
    this.setState({ gunbuttons: bs });
    Logger.log(1, "Created gun");
    return [gun, DetectorButton.id];
  }
  async createDetector(n, px, py, pz, rx, ry, rz, sx, sy, sz, material, type, data, color, code, posu, rotu, scaleu) {
    if (this.sources.length > 0 || this.guns.length > 0) this.navbar.current.showRun(true);
    this.navbar.current.showClearSetup(true);
    if (!code) this.codeeditor.current.updateText(
      this.codeeditor.current.state.text +
      "\\Detector{\n" +
      "\tname: " + '"' + n + '";\n' +
      "\tposition[" + UnitConverter.convertLength(posu) + "]: " + px + ", " + py + ", " + pz + ";\n" +
      "\trotation[" + UnitConverter.convertAngle(rotu) + "]: " + rx + ", " + ry + ", " + rz + ";\n" +
      "\tscale[" + UnitConverter.convertLength(scaleu) + "]: " + sx + ", " + sy + ", " + sz + ";\n" +
      "\tmaterial: " + '"' + material + '";\n' +
      "\tgeometry: " + '"' + type + '";\n' +

      "}\n"
    );

    let bs = this.state.buttons;
    let details = <Container>
      <Row>
        <Col>Position: </Col>
      </Row>
      <Row>
        <Col>x: {px} {UnitConverter.convertLength(posu)}</Col>
        <Col>y: {py} {UnitConverter.convertLength(posu)}</Col>
        <Col>z: {pz} {UnitConverter.convertLength(posu)}</Col>
      </Row>
      <Row>
        <Col>Rotation: </Col>
      </Row>
      <Row>
        <Col>x: {rx} {UnitConverter.convertAngle(rotu)}</Col>
        <Col>y: {ry} {UnitConverter.convertAngle(rotu)}</Col>
        <Col>z: {rz} {UnitConverter.convertAngle(rotu)}</Col>
      </Row>
      <Row>
        <Col>Scale: </Col>
      </Row>
      <Row>
        <Col>x: {sx} {UnitConverter.convertLength(scaleu)}</Col>
        <Col>y: {sy} {UnitConverter.convertLength(scaleu)}</Col>
        <Col>z: {sz} {UnitConverter.convertLength(scaleu)}</Col>
      </Row>
      <Row>
        <Col>Material: </Col>
      </Row>
      <Row>
        <Col>{material}</Col>
      </Row>
    </Container>;
    let paramterize = (detector) => {
      detector.id = +DetectorButton.id;
      detector.geometry = type;
      Parser.chunks.push({
        id: detector.id, code: "\\Detector{\n" +
          "\tname: " + '"' + n + '";\n' +
          "\tposition[cm]: " + px + ", " + py + ", " + pz + ";\n" +
          "\trotation[rad]: " + rx + ", " + ry + ", " + rz + ";\n" +
          "\tscale[cm]: " + sx + ", " + sy + ", " + sz + ";\n" +
          "\tmaterial: " + '"' + material + '";\n' +
          "\tgeometry: " + '"' + type + '";\n' +
          "}\n"
      });
      detector.name = n;
      detector.model.color = color;
      detector.units[0] = posu;
      detector.units[1] = rotu;
      detector.units[2] = scaleu;
      this.detectors.push(detector);
      bs.push(<DetectorButton volumes={this.volumes} canvas={this.canvas} codeeditor={this.codeeditor} name={n} removebutton={this.removeDetector} id={DetectorButton.id} detector={detector} details={details} key={++DetectorButton.id} buttons={this.state.buttons}></DetectorButton>);
      this.setState({ buttons: bs });
    }
    let detector = null;
    if (type == "stl") {
      let modelData = STLParser.parseData(data);
      detector = this.canvas.current.addSTLDetector(px*posu, py*posu, pz*posu, rx*rotu, ry*rotu, rz*rotu, sx*scaleu, sy*scaleu, sz*scaleu, material, modelData);
      paramterize(detector);
    } else {
      detector = await this.canvas.current.addDetector(px*posu, py*posu, pz*posu, rx*rotu, ry*rotu, rz*rotu, sx*scaleu, sy*scaleu, sz*scaleu, material, type, this.volumes);
      paramterize(detector);
    }
    Logger.log(1, "Created detector");
    return [detector, DetectorButton.id];
  }
  clearSetup() {
    Parser.chunks = [];
    this.codeeditor.current.updateText(" ");
    this.codeeditor.current.text = "";
    DetectorButton.id = 0;
    this.setState({ buttons: [], gunbuttons: [], sourcebuttons: [] });
    this.canvas.current.clearSetup()
    this.detectors = [];
    this.sources = [];
    this.guns = [];
    this.state.buttons = [];
    this.state.gunbuttons = [];
    this.state.sourcebuttons = [];
    this.clearRun();
    Logger.log(1, "Cleared setup")
  }
  removeSource(source, buttonid) {
    if (this.detectors.length < 1 || (this.sources.length < 1 && this.guns.length < 1)) this.navbar.current.showRun(false);

    if (this.sources.length == 0 && this.guns.length == 0 && this.detectors.length == 0) this.navbar.current.showClearSetup(false);
    

    this.canvas.current.removeSource(source);
    this.codeeditor.current.updateText(Parser.removeChunk(source.id));

    for (var i = 0; i < this.state.sourcebuttons.length; i++) {
      if (this.state.sourcebuttons[i].key - 1 == buttonid) {
        let bs = this.state.sourcebuttons;
        bs.splice(i, 1);
        this.sources.splice(i, 1);
        this.setState({ sourcebuttons: bs });
        Logger.log(1, "Removed source")

        return;
      }
    }
  }
  removeGun(gun, buttonid) {
    if (this.detectors.length < 1 || (this.sources.length < 1 && this.guns.length < 1)) this.navbar.current.showRun(false);

    if (this.sources.length == 0 && this.guns.length == 0 && this.detectors.length == 0) this.navbar.current.showClearSetup(false);
    Logger.log(1, "Removed gun");

    this.canvas.current.removeGun(gun);
    this.codeeditor.current.updateText(Parser.removeChunk(gun.id));

    for (var i = 0; i < this.state.gunbuttons.length; i++) {
      if (this.state.gunbuttons[i].key - 1 == buttonid) {
        let bs = this.state.gunbuttons;
        bs.splice(i, 1);
        this.guns.splice(i, 1);
        this.setState({ gunbuttons: bs });
        return;
      }
    }
  }
  removeDetector(detector, buttonid) {
    if (this.detectors.length < 1 || (this.sources.length < 1 && this.guns.length < 1)) this.navbar.current.showRun(false);
    if (this.sources.length == 0 && this.guns.length == 0 && this.detectors.length == 0) this.navbar.current.showClearSetup(false);

    this.canvas.current.removeDetector(detector);
    this.codeeditor.current.updateText(Parser.removeChunk(detector.id));

    for (var i = 0; i < this.state.buttons.length; i++) {
      if (this.state.buttons[i].key - 1 == buttonid) {
        let bs = this.state.buttons;
        bs.splice(i, 1);
        this.detectors.splice(i, 1);
        this.setState({ buttons: bs });
        Logger.log(1, "Removed detector")

        return;
      }
    }

  }
  setShowTracks(b) {
    this.canvas.current.setShowTracks(!b);
  }
  setShowParticles(b) {
    this.canvas.current.drawParticles = !b;
  }
  setShowAxes(b) {
    this.canvas.current.setShowAxes(!b);
  }
  setShowGrid(b) {
    this.canvas.current.drawGrid = !b;
  }
  async componentDidMount() {

   

    //setup volumes from the database


    Parser.init(this.volumeselect.current, this.popup.current.showDialog);

    let response = await fetch("http://localhost:9000/database", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ name: "" })
    });
    let json = await response.json();
    for (let i = 0; i < json.length; i++) {
      var str = '';
      for (let j = 0; j < json[i].data.data.length; j++) {
        str += String.fromCharCode(json[i].data.data[j]);
      }
      this.createVolume(json[i].name, str, "");
    }
    //setup first detector
    this.createDetector("Cube", 0, 0, 0, 0, 0, 0, 10, 10, 10, "Pb", 'cube', null, new Vector3(1, 1, 1), false, 1, 1, 1);

     //run a few tests
     //CodeTests.langTest([this.codeeditor.current.onclickfunction,this.createDetector, this.createSource, this.createGun,this.removeDetector,this.removeSource,this.removeGun, this.clearSetup]);
  }
  render() {


    const items = this.state.buttons.map(function (item) {
      return <div style={{ "z-index": "3", "color": "black" }}> {item} </div>;
    });
    const gunButtons = this.state.gunbuttons.map(function (item) {
      return <div> {item} </div>
    });
    const sourceButtons = this.state.sourcebuttons.map(function (item) {
      return <div> {item} </div>
    });
    let volumeButtons = this.state.volumebuttons.map(function (item) {
      return <div style={{ "z-index": "3", "color": "black" }}> {item} </div>
    });

    return <div>
      <VolumeSelectDialog ref={this.volumeselect} createbutton={this.createVolume}></VolumeSelectDialog>
      <VolumeDialog ref={this.volumedialog} createbutton={this.createVolume}></VolumeDialog>
      <PopupDialog ref={this.popup}></PopupDialog>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first" activeKey={this.state.page}>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column" className='page'>
            <Nav.Item>
              <Nav.Link eventKey="first" onClick={() => { this.setState({ page: 'first' }); }}>simulation</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second" disabled={this.state.spectrum} onClick={() => { this.setState({ page: 'second' }); }}>spectrum</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Tab.Content>
          <Tab.Pane eventKey="first" style={{ "overflow": "hidden" }}>
            <Canvas ref={this.canvas} style={{ "overflow": "hidden" }}></Canvas>
            <CodeEditor ref={this.codeeditor} createGun={this.createGun} clearSetup={this.clearSetup} createSource={this.createSource} createDetector={this.createDetector} canvas={this.canvas} />

            <NavigationBar run={this.runSim}
              ref={this.navbar}
              canvas={this.canvas}
              className="navbar"
              volumes={this.volumes}
              runspectroscopy={this.runSpectroscopy}
              createbutton={this.createDetector}
              creategunbutton={this.createGun}
              createsourcebutton={this.createSource}
              createvolume={this.createVolume}
              setshowtracks={this.setShowTracks}
              setshowparticles={this.setShowParticles}
              setshowaxes={this.setShowAxes}
              setshowgrid={this.setShowGrid}
              clearrun={this.clearRun}
              clearSetup={this.clearSetup}
              detectors={this.detectors}
              buttons={this.state.buttons}></NavigationBar>
            <div className='buttonbackground'>
            </div>
            <Accordion ref={this.accordion} defaultActiveKey="0" className='accordion' style={{ "maxHeight": window.innerHeight - 50, "height": window.innerHeight - 50, "overflow-y": "scroll" }}>
              <div style={{ color: 'white', 'text-align': 'center', 'background-color': 'gray', 'border': '1px solid white' }}>
                Volumes
          </div>
              {volumeButtons}
              <div style={{ color: 'white', 'text-align': 'center', 'background-color': 'gray', 'border': '1px solid white' }}>
                Detectors
          </div>
              {items}
              <div style={{ color: 'white', 'text-align': 'center', 'background-color': 'gray', 'border': '1px solid white' }}>
                Sources
          </div>
              {sourceButtons}
              <div style={{ color: 'white', 'text-align': 'center', 'background-color': 'gray', 'border': '1px solid white' }}>
                Guns
          </div>
              {gunButtons}
            </Accordion>
          </Tab.Pane>
          <Tab.Pane eventKey="second">
            <Spectrum ref={this.spectrum}></Spectrum>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>


    </div>

  }
}

export default App;