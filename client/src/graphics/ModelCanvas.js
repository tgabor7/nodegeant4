import React, { Component, createRef } from 'react';
import '../App.css';
import { Button, Modal } from 'react-bootstrap';
import RenderSystem from '../rendering/renderSystem';
import { Maths, Camera, Vector3 } from '../utils/maths.js';
import Detector from '../detector/Detektor';
import Model from '../rendering/model';


class ModelCanvas extends Component {
  constructor(props) {
    super(props);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.updateCanvas = this.updateCanvas.bind(this);
    this.state = ({ show: false });
    this.canvas = React.createRef();
    this.camera = new Camera(45, -45, 10, new Vector3(0, 0, 0), new Vector3(0, 0, 0));
    this.oldX = 0;
    this.oldY = 0;
    this.move = false;
    this.x = 0;
    this.y = 0;
    this.keyDown = ` ${0}`;
    this.down = false;
  }
  componentDidMount() {
  }
  updateCanvas(){
    this.gl = this.canvas.current.getContext("webgl2");
    this.renderer = new RenderSystem(this.gl);
    
    function updateCamera(camera) {
      if (camera.y > 89.0) {
          camera.y = 89.0;
      }
      if (camera.y < -89.0) {
          camera.y = -89.0;
      }
  
      camera.p.x = (camera.d * -Math.sin(camera.x * Math.PI / 180.0)
          * Math.cos(camera.y * Math.PI / 180.0) + camera.a.x);
      camera.p.y = (camera.d * -Math.sin(camera.y * Math.PI / 180.0)
          + camera.a.y);
      camera.p.z = (-camera.d * Math.cos(camera.x * Math.PI / 180.0)
          * Math.cos(camera.y * Math.PI / 180.0) + camera.a.z);
  

      return camera;
  }
    this.renderer = new RenderSystem(this.gl);
    this.renderer.drawAxes = false;
    let model = new Model(this.props.modeldata.vertices, this.props.modeldata.normals, this.gl);
    model.drawLines = false;
    model.color = new Vector3(.8,.8,.8);
    this.renderer.addDetector(new Detector(model));
    this.renderer.models = [];
    var draw = ()=>{
      if(this.state.show == false) return;
      this.gl.clearColor(.1,1,.1,1.0);
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
      this.renderer.draw(projection, this.camera);
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  }
  showDialog() {
    this.setState({ show: true });

  }
  hideDialog() {
    this.setState({ show: false });
  }
  
  getMouseXd(){
    return this.oldX - this.x;
  }
  getMouseYd(){
    return this.oldY - this.y;
  }
  render() {
    return <div>
      <Modal show={this.state.show} onHide={() => { this.hideDialog(); }} onShow={this.updateCanvas}>
        <canvas ref={this.canvas}
        width='2000'
        height='2000'
        style={{"width":"600px", "height": "600px"}}
        onKeyDown={(e)=>{this.keyDown = e.keyCode;}}
        onKeyUp={(e)=>{this.keyDown = ` ${0}`;}}
        onMouseMove={(e)=>{ 
          this.move = true;
          this.oldX = this.x;
          this.oldY = this.y;
          this.x = e.pageX;
          this.y = e.pageY;
        }}
        onMouseDown={()=>{this.down = true;}} 
        onMouseUp={()=>{this.down = false;}}
        onWheel={(e)=>{
          let delta = 0;
          if(e.deltaY > 0) delta = 1;
          else delta = -1;
          this.camera.d += (this.camera.d / (delta*100)) * 10;
          }}></canvas>
      </Modal>
    </div>
  }
}

export default ModelCanvas;
