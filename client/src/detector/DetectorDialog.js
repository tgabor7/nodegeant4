import React, { Component, createRef } from 'react';
import '../App.css';

import {Button, Nav, Navbar, FormControl, Container,Col,Row, Form, Dropdown, OverlayTrigger, Tooltip, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DetectorButton from './DetectorButton';
import MaterialList from './MaterialList';
import { Vector3 } from '../utils/maths';
import MaterialTable from '../graphics/MaterialTable';

class DetectorDialog extends Component{
  constructor(props){
    super(props);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.updateMaterial = this.updateMaterial.bind(this);
    this.table = React.createRef();
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
      posme: 1,
      rotme: 1,
      scaleme: 1,
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
  updateMaterial(m){
    this.setState({detmat: m});
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
  async showDialog(volumes){
      this.setState({show: true});
      let detectorName = 'Detector' + this.props.buttons.length;
      this.setState({detname: detectorName});

      
      let opt = volumes.map(e=>{
      return <option value={e.name}>{e.name}</option>;
      });
      this.setState({options: opt});
    }
  hideDialog(){
    this.setState({show: false});
  }
  
  static id = 0;
  render(){
    let mat = [];
    if(MaterialList.get(this.state.detmat) == this.state.detmat){
      mat = <th className="tablebutton" onClick={()=>{this.table.current.showDialog();}}><h1 style={{"font-size":'10px',"font-weight":"bold"}}>{this.state.detmat}</h1></th>;
    }else{
      mat = <th className="tablebutton" onClick={()=>{this.table.current.showDialog();}}>
      <p style={{"font-size":'12px'}}>{MaterialList.get(this.state.detmat).z}</p>
      <h1 style={{"font-size":'15px',"font-weight":"bold"}}>{MaterialList.get(this.state.detmat).symbol}</h1>
      <p style={{"font-size":'12px'}}>{MaterialList.get(this.state.detmat).name}</p></th>;
    }
    return <>
        <MaterialTable ref={this.table} updatematerial={this.updateMaterial}></MaterialTable>

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
            <Form.Control as="select" style={{"width":"100px","margin-left":"-15px","margin-bottom":"10px"}} value={this.state.posme} onChange={(e)=>{this.setState({posme: e.target.value});}}>
                <option value=".1">mm</option>
                <option value="1">cm</option>
                <option value="10">dm</option>
                <option value="100">m</option>
                </Form.Control>
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
          <Form.Control as="select" style={{"width":"100px","margin-left":"-15px","margin-bottom":"10px"}} value={this.state.rotme} onChange={(e)=>{this.setState({rotme: e.target.value});}}>
                <option value="0.0174">deg</option>
                <option value="1">rad</option>
                </Form.Control>
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
          <Form.Control as="select" style={{"width":"100px","margin-left":"-15px","margin-bottom":"10px"}} value={this.state.scaleme} onChange={(e)=>{this.setState({scaleme: e.target.value});}}>
                <option value=".1">mm</option>
                <option value="1">cm</option>
                <option value="10">dm</option>
                <option value="100">m</option>
                </Form.Control>
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
           {mat}
            <Button onClick={()=>{this.table.current.showDialog();}}>Choose</Button>
            
          </Form.Group>
          
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
          
          this.hideDialog();
          this.props.createbutton(this.state.detname, this.state.detposx, this.state.detposy,this.state.detposz,
            this.state.detrotx, this.state.detroty, this.state.detrotz, this.state.detscalex, this.state.detscaley, this.state.detscalez, this.state.detmat, this.state.geomrty,
            this.state.modeldata,this.state.color, false, this.state.posme, this.state.rotme, this.state.scaleme);}}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </> 
  }
}

export default DetectorDialog;
