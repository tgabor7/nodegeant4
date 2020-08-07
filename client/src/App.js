import React, { Component, createRef } from 'react';
import logo from './logo.svg';
import './App.css';

import Canvas from './graphics/Canvas.js';
import {Button, Card, Accordion,Container, Row, Col, Tabs, Tab, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DetectorButton from './detector/DetectorButton';
import NavigationBar from './graphics/NavigationBar';
import GunButton from './gun/GunButton';
import SourceButton from './source/SourceButton';
import Particle from './entities/Particle';
import {Vector3} from './utils/maths';
import Model from './rendering/model';
import Spectrum from './graphics/spectrum';
import STLParser from './utils/STLParser';
import CodeEditor from './graphics/CodeEditor';

class App extends Component{
  constructor(props){
    super(props);
    this.spectrum = React.createRef();
    this.navbar = React.createRef();
    this.state = {buttons: [], gunbuttons: [], sourcebuttons: [], spectrum: true, page: 'first'}
    this.createDetector = this.createDetector.bind(this);
    this.createSource = this.createSource.bind(this);
    this.createGun = this.createGun.bind(this);

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
  }
  clearRun(){
    this.canvas.current.clearRun();
  }
  runSpectroscopy(number_of_particles, detector, hideDialog, binsize){
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
    for(var i = 0;i<number_of_sources;i++){

        message_data.push(this.sources[i].material);
        //message_data.push(detectors[i].id);

        message_data.push(this.sources[i].model.position.x);
        message_data.push(this.sources[i].model.position.y);
        message_data.push(this.sources[i].model.position.z);
    }
    //guns
    var number_of_guns = this.guns.length;
    message_data.push(number_of_guns);
    for(var i = 0;i<number_of_guns;i++){
        message_data.push(this.guns[i].model.position.x);
        message_data.push(this.guns[i].model.position.y);
        message_data.push(this.guns[i].model.position.z);

        message_data.push(this.guns[i].direction.x);
        message_data.push(this.guns[i].direction.y);
        message_data.push(this.guns[i].direction.z);

        message_data.push(this.guns[i].energy);
    }
    message_data.push(detector); //selected detector id
    message_data.push(number_of_particles); //number of particles
    message_data.push('end');
    this.sendGamma(message_data, hideDialog, binsize);
  }
  runSim(number_of_particles, hidedialog){
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
    for(var i = 0;i<number_of_sources;i++){

        message_data.push(this.sources[i].material);
        //message_data.push(detectors[i].id);

        message_data.push(this.sources[i].model.position.x);
        message_data.push(this.sources[i].model.position.y);
        message_data.push(this.sources[i].model.position.z);
    }
    //guns
    var number_of_guns = this.guns.length;
    message_data.push(number_of_guns);
    for(var i = 0;i<number_of_guns;i++){
        message_data.push(this.guns[i].model.position.x);
        message_data.push(this.guns[i].model.position.y);
        message_data.push(this.guns[i].model.position.z);

        message_data.push(this.guns[i].direction.x);
        message_data.push(this.guns[i].direction.y);
        message_data.push(this.guns[i].direction.z);

        message_data.push(this.guns[i].energy);
    }
    message_data.push(number_of_particles); //number of particles
    message_data.push('end');
    this.send(message_data, hidedialog);
  }
  sendGamma(data, hideDialog, binsize){
    var message = '';
    for(var i = 0;i<data.length;i++){
      message += data[i];
      message += ',';
    }
    fetch('http://localhost:80/gammaAPI',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({data: message})
    })
    .then(response => response.text())
    .then(response => {
      this.processGammaSpectrum(response, binsize);
      hideDialog();
    this.setState({spectrum: false,page: "second"});});
  }
  send(data, hidedialog){
    var message = '';
    for(var i = 0;i<data.length;i++){
      message += data[i];
      message += ',';
    }
    fetch('http://localhost:80/gammaAPI',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({data: message})
    })
    .then(response => response.text())
    .then(response => {
      this.processResponse(response);
      hidedialog();
     });
  }
  processGammaSpectrum(response, binsize){
    
    let message = response;

    message = message.split(" ");
    this.spectrum.current.clear();
    for(var i = 0;i<message.length;i++){
        this.spectrum.current.add(Math.floor(parseFloat(message[i]) / binsize) * binsize);
    }
    this.spectrum.current.sort();
  }
  processResponse(response){
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
            
            particle.color = new Vector3(1,0,0);
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
    
    
    let tmp_particles = [];
    for(var i = 0;i<this.particles.length;i+=Math.ceil(this.particles.length / 10000)){
        tmp_particles.push(this.particles[i]);
    }
    this.particles = tmp_particles.slice();

    function get_average(particles){
        var max = 0;
        for(var i = 0;i<particles.length;i++){
            max += +particles[i].totalEnergy;
        }
        max = max / particles.length;

        return max;
    }
    let max = get_average(this.particles) * 2;

    
    
    
    for(let i = 0;i<this.particles.length;i++){
        if(this.particles[i].totalEnergy > max) this.particles[i].totalEnergy = max;
        this.particles[i].color.x = 2 * (this.particles[i].totalEnergy / max);
        this.particles[i].color.y = 1 - this.particles[i].color.x;

        let d = this.particles[i].color.x / 100;
        this.particles[i].scale = new Vector3(d,d,d);
        this.canvas.current.addParticle(this.particles[i]);
    }
  }
  modifyDetector(detector){
    
  }
  createSource(n,x,y,z,mat){
    if(this.detectors.length > 0) this.navbar.current.showRun(true);
    let bs = this.state.sourcebuttons;
    let details = <Container>
      <Row>
      <Col>Position: </Col>
      </Row>
      <Row>
        <Col>x: {x} cm</Col>
        <Col>y: {y} cm</Col>
        <Col>z: {z} cm</Col>
      </Row>
      
      <Row>
      <Col>Material: {mat}</Col>
      </Row>
      </Container>;

    let source = this.canvas.current.addSource(x,y,z,mat);
    source.id = DetectorButton.id;
    source.name = n;
    this.sources.push(source);
    bs.push(<SourceButton name={n} removebutton={this.removeSource} id={DetectorButton.id} detector={source} details={details} key={++DetectorButton.id} buttons={this.state.buttons}></SourceButton>);
    this.setState({sourcebuttons: bs});
  }
  createGun(n, px, py, pz, dx, dy, dz, energy){
    if(this.detectors.length > 0) this.navbar.current.showRun(true);
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

    let gun = this.canvas.current.addGun(px,py,pz,dx,dy,dz,energy);
    gun.id = DetectorButton.id;
    gun.name = n;
    this.guns.push(gun);
    bs.push(<GunButton name={n} removebutton={this.removeGun} id={DetectorButton.id} detector={gun} details={details} key={++DetectorButton.id} buttons={this.state.buttons}></GunButton>);
    this.setState({gunbuttons: bs});
  }
  createDetector(n, px, py, pz, rx, ry, rz, sx, sy, sz, material, type, data, color){
    if(this.sources.length > 0 || this.guns.length > 0) this.navbar.current.showRun(true);
    let bs = this.state.buttons;
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
      <Col>Rotation: </Col>
      </Row>
      <Row>
        <Col>x: {rx} deg</Col>
        <Col>y: {ry} deg</Col>
        <Col>z: {rz} deg</Col>
      </Row>
      <Row>
      <Col>Scale: </Col>
      </Row>
      <Row>
        <Col>x: {sx}</Col>
        <Col>y: {sy}</Col>
        <Col>z: {sz}</Col>
      </Row>
      <Row>
      <Col>Material: </Col>
      </Row>
      <Row>
        <Col>{material}</Col>
      </Row>
      </Container>;
    let paramterize = (detector) => {
      detector.id = DetectorButton.id;
      detector.name = n;
      detector.model.color = color;
      this.detectors.push(detector);
      bs.push(<DetectorButton name={n} removebutton={this.removeDetector} id={DetectorButton.id} detector={detector} details={details} key={++DetectorButton.id} buttons={this.state.buttons}></DetectorButton>);
      this.setState({buttons: bs});
    }
    let detector = null;
    if(type=="stl"){
      let modelData = STLParser.parseData(data);
      detector = this.canvas.current.addSTLDetector(px,py,pz,rx,ry,rz,sx,sy,sz,material,modelData);
      paramterize(detector);

    }else{
      this.canvas.current.addDetector(px,py,pz,rx,ry,rz,sx,sy,sz,material, type).then(det => {
        paramterize(det);
      });
    }
    
  }
  clearSetup(){
    this.setState({buttons: [], gunbuttons: [], sourcebuttons: []});
    for(let i = 0;i<this.detectors.length;i++){
      this.canvas.current.removeDetector(this.detectors[i]);
    }
    for(let i = 0;i<this.sources.length;i++){
      this.canvas.current.removeSource(this.sources[i]);
    }
    for(let i = 0;i<this.guns.length;i++){
      this.canvas.current.removeGun(this.guns[i]);
    }
    this.clearRun();
  }
  removeSource(source, button){
    if(this.detectors.length < 1 || (this.sources.length < 0 && this.guns.length < 0)) this.navbar.current.showRun(false);

    this.canvas.current.removeSource(source);
    for(var i = 0;i<this.state.sourcebuttons.length;i++){
      if(this.state.sourcebuttons[i].key-1 == button.id){
        let bs = this.state.sourcebuttons;
        bs.splice(i,1);
        this.sources.splice(i,1);
        this.setState({sourcebuttons: bs});
        return;
      }
    }
  }
  removeGun(gun, button){
    if(this.detectors.length < 1 || (this.sources.length < 0 && this.guns.length < 0)) this.navbar.current.showRun(false);

    this.canvas.current.removeGun(gun);
    for(var i = 0;i<this.state.gunbuttons.length;i++){
      if(this.state.gunbuttons[i].key-1 == button.id){
        let bs = this.state.gunbuttons;
        bs.splice(i,1);
        this.guns.splice(i,1);
        this.setState({gunbuttons: bs});
        return;
      }
    }
  }
  removeDetector(detector, button){
    if(this.detectors.length < 1 || (this.sources.length < 0 && this.guns.length < 0)) this.navbar.current.showRun(false);
    this.canvas.current.removeDetector(detector);
    for(var i = 0;i<this.state.buttons.length;i++){
      if(this.state.buttons[i].key-1 == button.id){
        let bs = this.state.buttons;
        bs.splice(i,1);
        this.detectors.splice(i,1);
        this.setState({buttons: bs});
        return;
      }
    }
    
  }
  setShowTracks(b){
    this.canvas.current.setShowTracks(!b);
  }
  setShowParticles(b){
    this.canvas.current.drawParticles = !b;
  }
  setShowAxes(b){
    this.canvas.current.setShowAxes(!b);
  }
  setShowGrid(b){
    this.canvas.current.drawGrid = !b;
  }
  componentDidMount(){
    
  }
  render(){

    const items = this.state.buttons.map(function(item){
      return <div> {item} </div>;
    });
    const gunButtons = this.state.gunbuttons.map(function(item){
      return <div> {item} </div>
    });
    const sourceButtons = this.state.sourcebuttons.map(function(item){
      return <div> {item} </div>
    });
    return <div>
    <Tab.Container id="left-tabs-example" defaultActiveKey="first" activeKey={this.state.page}>
    <Col sm={3}>
      <Nav variant="pills" className="flex-column"  className='page'>
        <Nav.Item>
          <Nav.Link eventKey="first" onClick={()=>{this.setState({page: 'first'});}}>simulation</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="second"  disabled={this.state.spectrum} onClick={()=>{this.setState({page: 'second'});}}>spectrum</Nav.Link>
        </Nav.Item>
      </Nav>
    </Col>
      <Tab.Content>
        <Tab.Pane eventKey="first">
        <Canvas ref={this.canvas} style={{overflow: 'hidden'}}></Canvas>
    <CodeEditor createGun={this.createGun} createSource={this.createSource} createDetector={this.createDetector} canvas={this.canvas} />

        <NavigationBar run={this.runSim} 
        ref={this.navbar}
        className="navbar"
        runspectroscopy={this.runSpectroscopy}
        createbutton={this.createDetector} 
        creategunbutton={this.createGun} 
        createsourcebutton={this.createSource} 
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
        <div className="accordion">
        <Accordion ref={this.accordion} defaultActiveKey="0" className='accordion'>
          <div style={{color: 'white', 'text-align':'center', 'background-color' : 'gray', 'border' : '1px solid white'}}>
          Detectors
          </div>
          {items}
          <div style={{color: 'white', 'text-align':'center', 'background-color' : 'gray', 'border' : '1px solid white'}}>
          Sources
          </div>
          {sourceButtons}
          <div style={{color: 'white', 'text-align':'center', 'background-color' : 'gray', 'border' : '1px solid white'}}>
          Guns
          </div>
          {gunButtons}
        </Accordion>
        </div>
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
