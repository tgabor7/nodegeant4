import React, { Component, createRef } from 'react';
import '../App.css';

import {Button, Nav, Navbar, FormControl, Container,Col,Row, Form, Dropdown, OverlayTrigger, Tooltip, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DetectorButton from './DetectorButton';

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
      geomrty: 'Cube',
      display: 'none',
      filelabel: 'Path to STL',
      modeldata: null }
    
  }
  componentDidMount(){
    
  }
  addMaterial(ann, mat){
    this.materials.push(<option value={ann}>{mat}</option>)
  }
  showDialog(){
      this.setState({show: true});
      let detectorName = 'Detector' + this.props.buttons.length;
      this.setState({detname: detectorName});
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
            <option value="cube">Cube</option>
            <option value="cylinder">Cylinder</option>
            <option value="sphere">Sphere</option>
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
          </Row>
          </Container>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{this.hideDialog();}}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>{this.hideDialog();this.props.createbutton(this.state.detname, this.state.detposx, this.state.detposy,this.state.detposz,
            this.state.detrotx, this.state.detroty, this.state.detrotz, this.state.detscalex, this.state.detscaley, this.state.detscalez, this.state.detmat, this.state.geomrty,
            this.state.modeldata);}}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </> 
  }
}

export default DetectorDialog;
