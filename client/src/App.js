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
import MousePicker from './utils/mousePicker';
import RenderSystem from './rendering/renderSystem';
import NumberSpinner from './graphics/NumberSpinner';
import GraphDialog from './graphics/GraphDialog';
import MaterialList from './detector/MaterialList';
import SaveLoad from './utils/SaveLoad';
import ErrorDialog from './graphics/ErrorDialog';
import User from './utils/User';
import SaveOnlineDialog from './graphics/SaveOnlineDialog';

import Requests from './utils/Reqs';
import WindowParams from './utils/WindowParameters';
import Error from './utils/Error';

class App extends Component {
  constructor(props) {
    super(props);
    this.spectrum = React.createRef();
    this.navbar = React.createRef();
    this.codeeditor = React.createRef();
    this.volumedialog = React.createRef();
    this.popup = React.createRef();
    this.volumeselect = React.createRef();
    this.graphdialog = React.createRef();
    this.loadfile = React.createRef();
    this.errordialog = React.createRef();
    this.confirmdialog = React.createRef();


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
    this.save = this.save.bind(this);
    this.load = this.load.bind(this);
    this.saveOnline = this.saveOnline.bind(this);
    this.showSaveDialog = this.showSaveDialog.bind(this);
    this.updateProject = this.updateProject.bind(this);

    this.accordion = React.createRef();
    this.canvas = React.createRef();

    this.detectors = [];
    this.guns = [];
    this.sources = [];
    this.particles = [];
    this.tracks = [];
    this.volumes = [];
  }
  checkRunnable(){
    this.navbar.current.showRun((this.detectors.length > 0 && this.sources.length > 0) || (this.detectors.length > 0 && this.guns.length > 0));
  }
  clearRun() {
    this.canvas.current.clearRun();
    this.canvas.current.updateColorHint("0 keV","0 keV");
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
  async sendGamma(data, hideDialog, binsize) {
    var message = '';
    for (var i = 0; i < data.length; i++) {
      message += data[i];
      message += ',';
    }
    Requests.post("gammaAPI",{data: message}).then(response => response.text()).then(response=>{
      this.processGammaSpectrum(response, binsize);
      hideDialog();
      this.setState({ spectrum: false, page: "second" });
      Logger.log(1, "Finished spectrum simulation");
    });
    
  }
  async send(data, hidedialog) {
    var message = '';
    for (var i = 0; i < data.length; i++) {
      message += data[i];
      message += ',';
    }
    let pdata = await Requests.get("gammaAPI/getid");
    User.process_id = await pdata.json();
    //alert("id: " + User.process_id);
    Requests.post("gammaAPI",{data: message}).then(response => response.text())
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


        if(i>0) this.particles.push(particle); //ignore source particle for now
      }
      index += numberOfSteps * 7 + 2;

      var t_norm = [];
      for (var k = 0; k < track_data.length; k++) {
        t_norm.push(1);
      }

      var tm = this.canvas.current.addModel(track_data, t_norm);
      tm.color = new Vector3(1,0,0);
      if (definition == "e-") tm.color = new Vector3(1, 0, 1);
      if (definition == "gamma") tm.color = new Vector3(1, 1, 1);
      if (definition == "e+") tm.color = new Vector3(1, 1, 0);
      tm.drawLines = true;
      this.tracks.push(tm);

    }
    // if(this.particles.length > 1000){
    //   this.popup.current.showDialog("Too many particles!","Low energy particles will be ommited!",()=>{});
    //   this.particles = this.particles.sort((a,b)=>{return b.energyDeposit - a.energyDeposit});
    //   this.particles.length = 1000;
    //   //this.particles.splice(1000, this.particles.length-1000);
    // } 
    let tmp_particles = [];
    for (var i = 0; i < this.particles.length; i ++) {
      tmp_particles.push(this.particles[i]);
    }
    
    this.particles = tmp_particles.slice();
    function get_max(particles){
      var max = 0;
      for (var i = 0; i < particles.length; i++) {
        if(particles[i].energyDeposit > max) max = particles[i].energyDeposit;
      }
      return max;
    }
    function get_min(particles){
      var min = 0;
      for (var i = 0; i < particles.length; i++) {
        if(particles[i].energyDeposit <= max) min = particles[i].energyDeposit;
      }
      return min;
    }
    let max = get_max(this.particles);
    var min = get_min(this.particles);
    this.canvas.current.updateColorHint(Math.ceil(max * 1000) + " keV",Math.ceil(min * 1000) + " keV");
    this.canvas.current.instanceRenderer.maxenergy = max;

    function get_average(particles) {
      var max = 0;
      for (var i = 0; i < particles.length; i++) {
        max += +particles[i].energyDeposit;
      }
      max = max / particles.length;

      return max;
    }
    
    //let max = get_average(this.particles) * 2;

    for (let i = 0; i < this.particles.length; i++) {
      //if (this.particles[i].totalEnergy > max) this.particles[i].totalEnergy = max;
      
      this.particles[i].color.x = this.particles[i].energyDeposit;
      //this.particles[i].color.y = 1 - this.particles[i].color.x;

      let d = Math.sqrt(this.particles[i].color.x / max);
      this.particles[i].scale = new Vector3(d*.03,d*.03,d*.03);
      this.canvas.current.addParticle(this.particles[i]);
    }
    if (this.particles.length > 0) this.navbar.current.showClearParticles(true);
    let ind = floats.length - this.detectors.length - 1;
    this.detectors.forEach(e=>{
      e.deposit = parseFloat(floats[ind]);
      ind++;
      this.canvas.current.detector_buttons.forEach(b=>{
        // alert(b.current.id);
        // alert(e.id);

        if(e.id == b.current.id) b.current.updateDetails(e);
      });
    });
    console.log(floats);
  }
  
  modifyDetector(detector) {

  }
  createVolume(name, data, label) {
    let modeldata = STLParser.parseData(data);
    if(modeldata == null){
      alert("Geometry too complicated.");
      return;
    }
    let bs = this.state.volumebuttons;
    VolumeList.addVolume({ name: name, data: data });
    let vol = { name: name, data: data };
    this.volumes.push(vol);
    bs.push(<VolumeButton detectors={this.detectors} name={name} volumes={this.volumes} modeldata={modeldata} filelabel={label} volume={vol}></VolumeButton>);
    this.setState({ volumebuttons: bs });
  }
  async createSource(n, x, y, z, mat, code, posu) {
   this.checkRunnable();
    this.navbar.current.showClearSetup(true);
    if (!code) this.codeeditor.current.addSourceCode(n, new Vector3(x,y,z), mat, posu);

    let bs = this.state.sourcebuttons;
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
    var b = React.createRef();
    bs.push(<SourceButton ref={b} codeeditor={this.codeeditor} name={n} removebutton={this.removeSource} id={DetectorButton.id} detector={source} key={++DetectorButton.id} buttons={this.state.sourcebuttons}></SourceButton>);
    this.setState({ sourcebuttons: bs });
    this.canvas.current.source_buttons.push(b);
    Logger.log(1, "Created source");
    this.checkRunnable();

    return [source, DetectorButton.id];
  }
  async createGun(n, px, py, pz, dx, dy, dz, energy, code, posu, energyu) {
    this.checkRunnable();
    this.navbar.current.showClearSetup(true);

    if (!code) this.codeeditor.current.addGunCode(n, new Vector3(px, py, pz), new Vector3(dx, dy, dz), energy, posu, energyu);

    let bs = this.state.gunbuttons;

    let gun = this.canvas.current.addGun(px*posu, py*posu, pz*posu, dx, dy, dz, energy*energyu);
    gun.id = +DetectorButton.id;
    gun.name = n;
    gun.units[0] = posu;
    gun.units[1] = energyu;
    Parser.addGunCode(gun.id, n, new Vector3(px, py, pz),new Vector3(dx, dy, dz),energy, posu, energyu);

    this.guns.push(gun);
    var b = React.createRef();
    bs.push(<GunButton ref={b} codeeditor={this.codeeditor} name={n} removebutton={this.removeGun} id={DetectorButton.id} detector={gun} key={++DetectorButton.id} buttons={this.state.gunbuttons}></GunButton>);
    this.setState({ gunbuttons: bs });
    this.canvas.current.gun_buttons.push(b);
    Logger.log(1, "Created gun");
    this.checkRunnable();

    return [gun, DetectorButton.id];
  }
  /*Create detector object
    name string
    position vector3
    rotation vector3
    scale vector3
    material string
    the geometry of the detector its selected from the geometries list string
    data if stl is selected the data contains the vertices of the detector's geometry
    code generate code for the codeeditor boolean
    measurements
  */
  async createDetector(n, px, py, pz, rx, ry, rz, sx, sy, sz, material, type, data, color, code, posu, rotu, scaleu) {
    this.navbar.current.showClearSetup(true);
    let bs = this.state.buttons;
    if(!code) this.codeeditor.current.addDetectorCode(0, n, new Vector3(px,py,pz), new Vector3(rx,ry,rz), new Vector3(sx, sy, sz), material,
    type, posu, rotu, scaleu);
    let paramterize = (detector) => {
      detector.id = +DetectorButton.id;
      detector.geometry = type;
      
      Parser.addDetectorCode(detector.id, n, new Vector3(px,py,pz), new Vector3(rx,ry,rz), new Vector3(sx, sy, sz), material,
      type, posu, rotu, scaleu);
      
    //   this.codeeditor.current.addDetectorCode(detector.id, n, new Vector3(px,py,pz), new Vector3(rx,ry,rz), new Vector3(sx, sy, sz), material,
    // type, posu, rotu, scaleu, code);

      detector.name = n;
      detector.model.color = color;
      detector.units[0] = posu;
      detector.units[1] = rotu;
      detector.units[2] = scaleu;
      this.detectors.push(detector);
      var b = React.createRef();
      bs.push(<DetectorButton createvolume={this.createVolume} ref={b} volumes={this.volumes} canvas={this.canvas} codeeditor={this.codeeditor} name={n} removebutton={this.removeDetector} id={DetectorButton.id} detector={detector} key={++DetectorButton.id} buttons={this.state.buttons}></DetectorButton>);
      this.canvas.current.detector_buttons.push(b);
      this.setState({ buttons: bs });
    }
    let detector = null;
    if (type == "stl") {
      //let modelData = STLParser.parseData(data);
      //detector = this.canvas.current.addSTLDetector(px*posu, py*posu, pz*posu, rx*rotu, ry*rotu, rz*rotu, sx*scaleu, sy*scaleu, sz*scaleu, material, modelData);
      //paramterize(detector);
      this.createVolume(n + "Volume", data, n + "Volume");
      this.createDetector(n, px, py, pz, rx, ry, rz, sx, sy, sz, material, n + "Volume", data, color, code, posu, rotu, scaleu);
    } else {
      detector = await this.canvas.current.addDetector(px*posu, py*posu, pz*posu, rx*rotu, ry*rotu, rz*rotu, sx*scaleu, sy*scaleu, sz*scaleu, material, type, this.volumes);
      paramterize(detector);
    }
    Logger.log(1, "Created detector");
    this.checkRunnable();

    return [detector, DetectorButton.id];
  }
  clearSetup() {
    Parser.chunks = [];
    this.codeeditor.current.updateText(" ");
    this.codeeditor.current.text = "";
    //DetectorButton.id = 0;
    this.setState({ buttons: [], gunbuttons: [], sourcebuttons: [] });
    this.canvas.current.clearSetup();
    RenderSystem.active_id = -1;
    this.detectors = [];
    this.sources = [];
    this.guns = [];
    this.state.buttons = [];
    this.state.gunbuttons = [];
    this.state.sourcebuttons = [];
    this.canvas.current.detector_buttons = [];
    this.canvas.current.source_buttons = [];
    this.canvas.current.gun_buttons = [];

    this.clearRun();
    this.checkRunnable();
    Logger.log(1, "Cleared setup")
  }
  removeVolumes(){
    this.volumes = [];
    this.setState({volumebuttons: []});
    VolumeList.removeAll();
  }
  /*
  Remove particle source
  */
  removeSource(source, buttonid) {

    if (this.sources.length == 0 && this.guns.length == 0 && this.detectors.length == 0) this.navbar.current.showClearSetup(false);
    this.canvas.current.removeSource(source);
    this.codeeditor.current.updateText(Parser.removeChunk(source.id));

    for (var i = 0; i < this.state.sourcebuttons.length; i++) {
      if (this.state.sourcebuttons[i].key - 1 == buttonid) {
        let bs = this.state.sourcebuttons;
        bs.splice(i, 1);
        this.sources.splice(i, 1);
        this.canvas.current.source_buttons.splice(i, 1);
        this.setState({ sourcebuttons: bs });
        Logger.log(1, "Removed source")
        this.checkRunnable();

        return;
      }
    }
  }
  /*
  Remove particle gun
  */
  removeGun(gun, buttonid) {

    if (this.sources.length == 0 && this.guns.length == 0 && this.detectors.length == 0) this.navbar.current.showClearSetup(false);
    Logger.log(1, "Removed gun");

    this.canvas.current.removeGun(gun);
    this.codeeditor.current.updateText(Parser.removeChunk(gun.id));

    for (var i = 0; i < this.state.gunbuttons.length; i++) {
      if (this.state.gunbuttons[i].key - 1 == buttonid) {
        let bs = this.state.gunbuttons;
        bs.splice(i, 1);
        this.guns.splice(i, 1);
        this.canvas.current.gun_buttons.splice(i, 1);
        this.setState({ gunbuttons: bs });
        this.checkRunnable();

        return;
      }
    }
  }
  /*
  Remove detector
  */
  removeDetector(detector, buttonid) {
    if (this.sources.length == 0 && this.guns.length == 0 && this.detectors.length == 0) this.navbar.current.showClearSetup(false);
    RenderSystem.active_id = -1;
    this.canvas.current.removeDetector(detector);
    this.codeeditor.current.updateText(Parser.removeChunk(detector.id));

    for (var i = 0; i < this.state.buttons.length; i++) {
      if (this.state.buttons[i].key - 1 == buttonid) {
        let bs = this.state.buttons;
        bs.splice(i, 1);
        this.canvas.current.detector_buttons.splice(i, 1);
        this.detectors.splice(i, 1);
        this.setState({ buttons: bs });
        Logger.log(1, "Removed detector");
        this.checkRunnable();

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
  load(){
    this.loadfile.current.click();
  }
  saveOnline(name){
    SaveLoad.saveonline(this.codeeditor.current.state.text,this.volumes,name);
  }
  updateProject(){
    const id = WindowParams.get("projectid");
    // const windowUrl = window.location.search;
    // const params = new URLSearchParams(windowUrl);
    // const id = params.get("projectid");
    SaveLoad.update(id, this.codeeditor.current.state.text,this.volumes);
  }
  save(){
    SaveLoad.save(this.codeeditor.current.state.text,this.volumes);
  }
  async componentDidMount() {

    Requests.get("");

    await MaterialList.init();

    //setup volumes from the database
    Parser.init(this.volumeselect.current, this.popup.current.showDialog);
    Error.init(this.errordialog.current);

    let json = 0;
    while(json.length == undefined){
      
      let response = await Requests.get("geometryAPI/get");
      json = await response.json();
    }
    
    for (let i = 0; i < json.length; i++) {
      var str = '';
      for (let j = 0; j < json[i].data.data.length; j++) {
        str += String.fromCharCode(json[i].data.data[j]);
      }
      this.createVolume(json[i].name, str, "");
    }
    //setup first detector
    this.createDetector("Cube", 0, 0, 0, 0, 0, 0, 10, 10, 10, "Pb", 'cube', null, new Vector3(.5, .5, .5), false, 1, 1, 1);
    VolumeList.init(this.codeeditor.current);
    //setup first source
    this.createSource("GPS",0,0,0,"Co60",false,1);

     //run a few tests
     //CodeTests.langTest([this.codeeditor.current.onclickfunction,this.createDetector, this.createSource, this.createGun,this.removeDetector,this.removeSource,this.removeGun, this.clearSetup]);
    
    //init project
    // const windowUrl = window.location.search;
    // const params = new URLSearchParams(windowUrl);
    // const id = params.get("projectid");
    const id = WindowParams.get("projectid");
    if(id != null){
      //load project
      await SaveLoad.loadonline(id).then(e=>{
            
        if(e[1][0].content != "Created at radsim.inf.elte.hu"){
          this.errordialog.current.setContent("Invalid project file selected.");
          this.errordialog.current.showDialog();
          return;
        }
        this.removeVolumes();
        this.codeeditor.current.updateText(e[1][1].content+""); 
        for(let i = 2;i<e[1].length;i++){
          this.createVolume(e[1][i].name.split("/")[1].split(".")[0]+"", e[1][i].content+"", e[1][i].name+"");
        }
        this.codeeditor.current.run();
        alert(e[0]);
        this.navbar.current.setProjectName(e[0]);
      });
    }  
  }
  showSaveDialog(){
    this.confirmdialog.current.showDialog();
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
      <ErrorDialog ref={this.errordialog} title="ERROR" content="Choose a zip file."></ErrorDialog>
      <input ref={this.loadfile} style={{"display": "none"}} type="file" onChange={e=>{
        var r = new FileReader();

        r.onload = async ()=>{
          var data = r.result;
          await SaveLoad.load(data).then(e=>{
            
            if(e[0].content != "Created at radsim.inf.elte.hu"){
              this.errordialog.current.setContent("Invalid project file selected.");
              this.errordialog.current.showDialog();
              return;
            }
            this.removeVolumes();
            this.codeeditor.current.updateText(e[1].content+""); 
            for(let i = 2;i<e.length;i++){
              this.createVolume(e[i].name.split("/")[1].split(".")[0]+"", e[i].content+"", e[i].name+"");
            }
            this.codeeditor.current.run();
          });
          
        }
        if(e.target.files[0].name.split(".")[e.target.files[0].name.split(".").length-1] != "zip"){
          this.errordialog.current.showDialog();
          return;
        }
        r.readAsBinaryString(e.target.files[0]);
        e.target.value = null;
      }}></input>
      
      <VolumeSelectDialog ref={this.volumeselect} createbutton={this.createVolume}></VolumeSelectDialog>
      <VolumeDialog ref={this.volumedialog} createbutton={this.createVolume}></VolumeDialog>
      <PopupDialog ref={this.popup}></PopupDialog>
      <GraphDialog ref={this.graphdialog}></GraphDialog>
      <SaveOnlineDialog saveonline={this.saveOnline} ref={this.confirmdialog}></SaveOnlineDialog>
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
            <Canvas ref={this.canvas} style={{ "overflow": "hidden" }} buttons={this.state.buttons}></Canvas>
            <CodeEditor save={this.save} ref={this.codeeditor} createGun={this.createGun} clearSetup={this.clearSetup} createSource={this.createSource} createDetector={this.createDetector} canvas={this.canvas} />
            <NavigationBar run={this.runSim}
              save = {this.save}
              load = {this.load}
              saveonline = {this.showSaveDialog}
              updateproject={this.updateProject}
              ref={this.navbar}
              canvas={this.canvas}
              projectname={this.state.projectName}
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