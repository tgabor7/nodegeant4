import React, { Component, createRef } from 'react';
import '../App.css';

import {Button, Nav, Navbar, FormControl, Container,Col,Row, Form, Dropdown, OverlayTrigger, Tooltip, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DetectorButton from './DetectorButton';
import MaterialList from './MaterialList';
import { Vector3 } from '../utils/maths';

class DetectorDialog extends Component{
  constructor(props){
    super(props);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.state = {show: false, 
      detname: 'Detector',
      detposx: 0,
      detposy: 0,
      detposz: 0,
      detrotx: 0,
      detroty: 0,
      detrotz: 0,
      detscalex: 10,
      detscaley: 10,
      detscalez: 10,
      detmat: 'Pb',
      geomrty: 'cube',
      display: 'none',
      filelabel: 'Path to STL',
      modeldata: null,
      showError: 'none',
      color: new Vector3(.5,.5,.5),
      options: []
     }
     
  }
  componentDidMount(){
   
    
  }
  hexToRgb(hex) {
    hex = hex.substr(1);
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return new Vector3(r / 255, g / 255, b / 255);
  }
  addMaterial(ann, mat){
    this.materials.push(<option value={ann}>{mat}</option>)
  }
  async showDialog(){
      this.setState({show: true});
      let detectorName = 'Detector' + this.props.buttons.length;
      this.setState({detname: detectorName});

      let response = await fetch("http://localhost/database", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({name: ""})
      });
      let json = await response.json();
      let opt = [];
      for(var i = 0;i<json.length;i++){
        opt.push(<option value={json[i].name}>{json[i].name}</option>);
      }
      this.setState({options: opt});
    }
  hideDialog(){
    this.setState({show: false});
  }
  
  static id = 0;
  render(){
    
    return <>
        <Modal show={this.state.show} onHide={()=>{this.hideDialog();}}>
        <Modal.Header closeButton>
          <Modal.Title>Create detector</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Container>
          <Row>
            Name <Col><Form.Control
            className="name"
            required
            type="text"
            maxLength="10"
            value = {this.state.detname}
            onChange={(event)=>{this.setState({detname: event.target.value});}} />
            </Col>
            </Row>
            <hr />
            <Row>
              Geometry
            </Row>

            <Form.Control as="select" value={this.state.geomrty} onChange={(evt)=>{
              this.setState({geomrty: evt.target.value});
              if(evt.target.value == "stl") this.setState({display: 'block'});
              else this.setState({display: 'none'});}}>

            {/* <option value="cube">Cube</option>
            <option value="cylinder">Cylinder</option>
            <option value="sphere">Sphere</option> */}
            {this.state.options}

            <option value="stl">Custom (.STL)</option>
            </Form.Control>

            <Form.File 
            style={{'display':this.state.display}}
            id="stl-file"
            label={this.state.filelabel}
            data-browse="Open"
            custom
            onChange={(evt)=>{

              alert(evt.target.files[0]);

              var r = new FileReader();

              r.onload = ()=>{
                var data = r.result;
                this.setState({modeldata: data});
              }
              r.readAsBinaryString(evt.target.files[0]);

              let path = evt.target.value;
              path = path.split("\\")[path.split("\\").length-1];
              this.setState({filelabel: path});
            }}
          />
            <hr />
            <Row>Position</Row>
          <Row>
            x<Col><Form.Control
            className="numspinner"
            required
            value='0'
            type="number"
            maxLength="10"
            value = {this.state.detposx}
            onChange={(event)=>{this.setState({detposx: event.target.value});}} />
            </Col>
            y<Col><Form.Control
            className="numspinner"
            required
            value='0'
            type="number"
            maxLength="10"
            value = {this.state.detposy}
            onChange={(event)=>{this.setState({detposy: event.target.value});}} />
            </Col>
            z<Col><Form.Control
            className="numspinner"
            required
            value='0'
            type="number"
            maxLength="10"
            value = {this.state.detposz}
            onChange={(event)=>{this.setState({detposz: event.target.value});}} />
            </Col>
          </Row>
          <br/>
          <hr />
          <Row>Rotation</Row>
          <Row>
            x<Col><Form.Control
            className="numspinner"
            required
            value='0'
            type="number"
            maxLength="10"
            value = {this.state.detrotx}
            onChange={(event)=>{this.setState({detrotx: event.target.value});}} />
            </Col>
            y<Col><Form.Control
            className="numspinner"
            required
            value='0'
            type="number"
            maxLength="10"
            value = {this.state.detroty}
            onChange={(event)=>{this.setState({detroty: event.target.value});}} />
            </Col>
            z<Col><Form.Control
            className="numspinner"
            required
            value='0'
            type="number"
            maxLength="10"
            value = {this.state.detrotz}
            onChange={(event)=>{this.setState({detrotz: event.target.value});}} />
            </Col>
          </Row>
          <br/>
          <hr />
          <Row>Scale</Row>
          <Row>
            x<Col><Form.Control
            className="numspinner"
            required
            value='0'
            type="number"
            maxLength="10"
            value = {this.state.detscalex}
            onChange={(event)=>{this.setState({detscalex: event.target.value});}} />
            </Col>
            y<Col><Form.Control
            className="numspinner"
            required
            value='0'
            type="number"
            maxLength="10"
            value = {this.state.detscaley}
            onChange={(event)=>{this.setState({detscaley: event.target.value});}} />
            </Col>
            z<Col><Form.Control
            className="numspinner"
            required
            value='0'
            type="number"
            maxLength="10"
            value = {this.state.detscalez}
            onChange={(event)=>{this.setState({detscalez: event.target.value});}} />
            </Col>
          </Row>
          <br/>
          <hr />
          <Row>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Material</Form.Label>
            <Form.Control
            className="material"
            required
            value='0'
            type="text"
            maxLength="10"
            value = {this.state.detmat}
            onChange={(event)=>{this.setState({detmat: event.target.value});}} />
          </Form.Group>
          <span style={{'display': this.state.showError, 'color' : 'red', 'font-weight': 'bold'}}>
            No such material
          </span>
          </Row>
          <hr />
          <Row>
          Color: <span style={{'padding-left':'20px'}}>
          <input type="color"
          onInput={(evt)=>{
            this.setState({color: this.hexToRgb(evt.target.value)});
          }}></input>
            </span>
        </Row>
          </Container>
        </Form>
      
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{this.hideDialog();}}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>{
          if(!MaterialList.check(this.state.detmat)){
            this.setState({showError: 'block'})
            return;
          } 
          this.hideDialog();
          this.props.createbutton(this.state.detname, this.state.detposx, this.state.detposy,this.state.detposz,
            this.state.detrotx, this.state.detroty, this.state.detrotz, this.state.detscalex, this.state.detscaley, this.state.detscalez, this.state.detmat, this.state.geomrty,
            this.state.modeldata,this.state.color);}}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </> 
  }
}

export default DetectorDialog;
