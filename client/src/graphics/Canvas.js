import React, { Component, createRef } from 'react';
import '../App.css';
import { GridRenderer } from '../rendering/grid.js';
import { Maths,Camera,Vector3 } from '../utils/maths.js';
import RenderSystem from '../rendering/renderSystem';
import { render } from '@testing-library/react';
import Detector from '../detector/Detektor.js';
import Model from '../rendering/model';
import {Cube} from '../entities/cube';
import {ParticleGun} from '../gun/ParticleGun';
import {GunMesh} from '../gun/gun';
import {ParticleSource} from '../source/ParticleSource';
import { InstanceRenderer } from '../rendering/InstanceRenderer';
import ColorSpectrum from '../graphics/ColorSpectrum';
import AxisRenderer from '../rendering/axisRenderer';
import STLParser from '../utils/STLParser';
import VolumeList from '../volume/VolumeList';

class Canvas extends Component{
  constructor(props){
    super(props);
    this.state = ({hint: " ", colorMinHint: "0 keV", colorMaxHint: "0 keV"});
    this.canvas = createRef();
    this.camera = new Camera(45, -45, 100, new Vector3(0, 0, 0), new Vector3(0, 0, 0));
    this.oldX = 0;
    this.oldY = 0;
    this.move = false;
    this.x = 0;
    this.y = 0;
    this.keyDown = ` ${0}`;
    this.down = false;
    this.rightclick = false;
    this.renderer = null;
    this.instanceRenderer = null;
    this.axisRenderer = null;
    this.particles = [];
    this.drawTracks = false;
    this.drawParticles = true;
    this.drawGrid = false;
    this.gl = null;
    this.detector_buttons = [];
    this.source_buttons = [];
    this.gun_buttons = [];
    this.updateHint = this.updateHint.bind(this);
    this.updateColorHint = this.updateColorHint.bind(this);
  }
  updateColorHint(s, ms){
    this.setState({colorMaxHint: s, colorMinHint: ms});
  }
  updateHint(s){
    this.setState({hint: s});
  }
  setShowTracks(b){
    this.renderer.drawTracks = b;
  }
  setShowAxes(b){
    this.renderer.drawAxes = b;
  }
  getMouseXd(){
    return this.oldX - this.x;
  }
  getMouseYd(){
    return this.oldY - this.y;
  }
  clearRun(){
    this.particles = [];
    this.renderer.clearTracks();
  }
  
  componentDidMount() {
    this.canvas.current.oncontextmenu = (e)=> {
      this.rightclick = true;
      //if(RenderSystem.hover_id == -1) RenderSystem.active_id = -1;
      let selected = -1;
      for(var i = 0;i<this.detector_buttons.length;i++){
        if(this.detector_buttons[i].current.id == RenderSystem.hover_id){
          this.detector_buttons[i].current.accordion.current.click();
          selected = this.detector_buttons[i].current.id;
        }
      }
      console.log(this.source_buttons.length);
      for(var i = 0;i<this.source_buttons.length;i++){
        if(this.source_buttons[i].current.id == RenderSystem.hover_id){
          this.source_buttons[i].current.accordion.current.click();
          selected = this.source_buttons[i].current.id;
        }
      }
      for(var i = 0;i<this.gun_buttons.length;i++){
        if(this.gun_buttons[i].current.id == RenderSystem.hover_id){
          this.gun_buttons[i].current.accordion.current.click();
          selected = this.gun_buttons[i].current.id;
        }
      }
      if(selected == -1){
        for(var i = 0;i<this.detector_buttons.length;i++){
          if(this.detector_buttons[i].current.id == RenderSystem.active_id){
            this.detector_buttons[i].current.accordion.current.click();
            //selected = this.detector_buttons[i].current.id;
          }
        }
        for(var i = 0;i<this.source_buttons.length;i++){
          if(this.source_buttons[i].current.id == RenderSystem.active_id){
            this.source_buttons[i].current.accordion.current.click();
            //selected = this.source_buttons[i].current.id;
          }
        }
        for(var i = 0;i<this.gun_buttons.length;i++){
          if(this.gun_buttons[i].current.id == RenderSystem.active_id){
            this.gun_buttons[i].current.accordion.current.click();
            //selected = this.source_buttons[i].current.id;
          }
        }
      }
      //alert(this.detector_buttons[0].current.accordion.current.click());
      e.preventDefault(); e.stopPropagation();}

    function updateCamera(camera) {
      if (camera.y > 89.0) {
          camera.y = 89.0;
      }
      if (camera.y < -89.0) {
          camera.y = -89.0;
      }
  
      camera.p.x = (camera.d * -Math.sin(Maths.toRad(camera.x))
          * Math.cos(Maths.toRad(camera.y)) + camera.a.x);
      camera.p.y = (camera.d * -Math.sin(Maths.toRad(camera.y))
          + camera.a.y);
      camera.p.z = (-camera.d * Math.cos(Maths.toRad(camera.x))
          * Math.cos(Maths.toRad(camera.y)) + camera.a.z);
  

      return camera;
  }
    this.gl = this.canvas.current.getContext("webgl2");
    let gridRenderer = new GridRenderer(this.gl);
    this.renderer = new RenderSystem(this.gl);
    this.instanceRenderer = new InstanceRenderer(Cube.vertices, this.gl);
    this.guiRenderer = new ColorSpectrum(this.gl);
    this.axisRenderer = new AxisRenderer(this.gl);
    var draw = ()=>{
      this.gl.clearColor(.2,.2,.2,1.0);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
      

      let projection = Maths.createProjectionMatrix(70,.1 * this.camera.d,1000 * this.camera.d, this.canvas.current.offsetWidth,this.canvas.current.offsetHeight);
      if(this.down && this.move){
        if (this.keyDown === 17) {
          this.camera.a.y -= .01 * (this.getMouseYd() * .01 * this.camera.d * ((89.0 - Math.abs(this.camera.y)) / 89.0));

          this.camera.a.x -= .01 * (Math.cos(this.camera.x / (180 / Math.PI)) * this.getMouseXd() * .01 * this.camera.d * ((89.0 - Math.abs(this.camera.y)) / 89.0));
          this.camera.a.z += .01 * (Math.sin(this.camera.x / (180 / Math.PI)) * this.getMouseXd() * .01 * this.camera.d * ((89.0 - Math.abs(this.camera.y)) / 89.0));

          this.camera.a.x -= .01 * (Math.cos(this.camera.x / (180 / Math.PI)) * this.getMouseXd() * .01 * this.camera.d +
              Math.sin(this.camera.x / (180 / Math.PI)) * this.getMouseYd() * .01 * this.camera.d);

              this.camera.a.z -= .01 * (Math.cos(this.camera.x / (180 / Math.PI)) * this.getMouseYd() * .01 * this.camera.d +
              Math.sin(this.camera.x / (180 / Math.PI)) * -this.getMouseXd() * .01 * this.camera.d);



      } else {
        this.camera.x += this.getMouseXd() / 2;
        this.camera.y += this.getMouseYd() / 2;
      }
      }
      updateCamera(this.camera);
      
      if(this.drawGrid) gridRenderer.draw(projection, this.camera, this.canvas.current.offsetWidth,this.canvas.current.offsetHeight, this.camera.d, this.updateHint);
      this.renderer.draw(projection, this.camera, (this.x/ this.canvas.current.offsetWidth) * 2.0 - 1.0, 
      ((this.canvas.current.offsetHeight-this.y)/ this.canvas.current.offsetHeight) * 2.0 - 1.0,this.rightclick,this.move);
      //console.log((this.y-50)/window.innerHeight);
      //console.log(this.x);
      //this.renderer.draw(projection, this.camera, this.x, this.y);
      if(this.drawParticles) this.instanceRenderer.render(this.particles, Maths.createViewMatrix(this.camera),projection, this.camera.d, this.gl);
      this.guiRenderer.draw();
      this.axisRenderer.draw(projection,this.camera);
      
      this.move = false;
      //console.log(this.rightclick);
      this.rightclick = false;
      requestAnimationFrame(draw);
      
    }
    requestAnimationFrame(draw);
  }
  addSource(x,y,z,mat){
    let source = new ParticleSource(new Model(Cube.vertices, Cube.normals,this.gl),new Vector3(x,y,z),mat);
    source.model.drawLines = false;
    source.model.position = new Vector3(x,y,z);
    this.renderer.addSource(source);

    return source;
  }
  addParticle(particle){
    this.particles.push(particle);
  }
  addSTLDetector(x,y,z,rx,ry,rz,sx,sy,sz,mat,data){
    let detector = new Detector(new Model(data.vertices, data.normals, this.gl));
    detector.model.drawLines = false;
    detector.model.color = new Vector3(1,1,1);
    detector.model.position.x = x;
    detector.model.position.y = y;
    detector.model.position.z = z;

    detector.model.rotation.x = rx;
    detector.model.rotation.y = ry;
    detector.model.rotation.z = rz;

    detector.model.scale.x = sx;
    detector.model.scale.y = sy;
    detector.model.scale.z = sz;
    
    detector.material = mat;

    this.renderer.addDetector(detector);
    
    return detector;
  }
  async addDetector(x,y,z,rx,ry,rz,sx,sy,sz, mat, type, volumes){
    let detector = null;
    let parameterize = ()=>{
      detector.model.drawLines = false;
      detector.model.color = new Vector3(1,1,1);
      detector.model.position.x = x;
      detector.model.position.y = y;
      detector.model.position.z = z;
  
      detector.model.rotation.x = rx;
      detector.model.rotation.y = ry;
      detector.model.rotation.z = rz;
  
      detector.model.scale.x = sx;
      detector.model.scale.y = sy;
      detector.model.scale.z = sz;
      
      detector.material = mat;
  
      this.renderer.addDetector(detector);
    };
      let str = "";
        for(let i = 0;i<volumes.length;i++){
          str = VolumeList.getVolume(type).data;
        }
        let modeldata = STLParser.parseData(str);
        detector = new Detector(new Model(modeldata.vertices, modeldata.normals, this.gl));
    parameterize();
    return detector;
    
  }
  addModel(vertices, normals){
    let model = new Model(vertices, normals, this.gl);

    this.renderer.addModel(model);

    return model;
  }
  addGun(x,y,z,dx,dy,dz,energy){
    let gun_model = new Model(GunMesh.vertices, GunMesh.normals, this.gl);
    gun_model.drawLines = false;
    let gun = new ParticleGun(gun_model,new Vector3(x,y,z),new Vector3(dx,dy,dz),energy);
    gun.model.position = new Vector3(x,y,z);
    
    this.renderer.addGun(gun);

    return gun;

  }
  clearSetup(){
    this.renderer.clearSetup()
  }
  removeSource(source){
    this.renderer.removeSource(source);
  }
  removeDetector(detector){
    this.renderer.removeDetector(detector);
  }
  removeGun(gun){
    this.renderer.removeGun(gun);
  }
  render(){
    return <div>
      <p ref={this.hint} style={{"position":"fixed", "bottom" : "10%", "left" : "20%", "z-index" : "4", "color" : "white"}}>{this.state.hint}</p>
      <p ref={this.colorMinHint} style={{"position":"fixed", "bottom" : "0%", "left" : "71%", "z-index" : "4", "color" : "white"}}>{this.state.colorMinHint}</p>
      <p ref={this.colorMaxHint} style={{"position":"fixed", "bottom" : "15%", "left" : "71%", "z-index" : "4", "color" : "white"}}>{this.state.colorMaxHint}</p>
    <canvas ref={this.canvas} onMouseMove={(e)=>{ 
      
      this.move = true;
      this.oldX = this.x;
      this.oldY = this.y;
      this.x = e.pageX;
      this.y = e.pageY;
    }}
    tabIndex="0" 
    width='2000'
    height='2000'
    style={{position: 'fixed', right: 0, left: 0, width: '100%', height: '100%'}}
    onKeyDown={(e)=>{this.keyDown = e.keyCode;}}
    onKeyUp={(e)=>{this.keyDown = ` ${0}`;}}
    onMouseDown={()=>{this.down = true;}} 
    onMouseUp={()=>{this.down = false;}}
    onWheel={(e)=>{
      let delta = 0;
      if(e.deltaY > 0) delta = 1;
      else delta = -1;
      this.camera.d += (this.camera.d / (delta*100)) * 10;
      }}/>
  </div>
    
   
  }
}

export default Canvas;
