import React, { Component, createRef } from 'react';
import '../App.css';

import {Button, Nav, Navbar, FormControl, Container,Col,Row, Form, Dropdown, OverlayTrigger, Tooltip, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Vector3} from '../utils/maths';
import MaterialList from './MaterialList';
import ConfirmDialog from '../graphics/ConfirmDialog';

class DetectorEditDialog extends Component{
  constructor(props){
    super(props);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.confirmDialog = React.createRef();

    this.state = {show: false, 
      detname: this.props.detector.name,
      detposx: this.props.detector.model.position.x,
      detposy: this.props.detector.model.position.y,
      detposz: this.props.detector.model.position.z,
      detrotx: this.props.detector.model.rotation.x,
      detroty: this.props.detector.model.rotation.y,
      detrotz: this.props.detector.model.rotation.z,
      detscalex: this.props.detector.model.scale.x,
      detscaley: this.props.detector.model.scale.y,
      detscalez: this.props.detector.model.scale.z,
      detmat: this.props.detector.material,
      showError: 'none',
      color: this.props.detector.model.color }
    this.materials = [];
    
  }
  hexToRgb(hex) {
    hex = hex.substr(1);
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return new Vector3(r / 255, g / 255, b / 255);
  }
  componentDidMount(){
    
  }
  showDialog(){
      this.setState({show: true});
      this.setState({showError: 'none'});
  }
  hideDialog(){
    this.setState({show: false});
  }
  
  static id = 0;
  render(){
    const handleDelete = ()=>{
      this.hideDialog();
      this.props.removebutton(this.props.detector, this.props.button);
    }
    return <>
    <ConfirmDialog ref={this.confirmDialog} title="Confirm" content="Are you sure you want to delete this component?" fun={handleDelete}></ConfirmDialog>
        <Modal show={this.state.show} onHide={()=>{this.hideDialog();}}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Detector</Modal.Title>
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
          <Button variant="secondary" onClick={()=>{
            this.confirmDialog.current.showDialog();
          }} style={{backgroundColor: 'red', color: 'white'}}>
            Delete
          </Button>
          <Button variant="primary" onClick={()=>{
            if(!MaterialList.check(this.state.detmat)){
              this.setState({showError: 'block'})
              return;
            } 
            this.hideDialog();

            this.props.detector.model.position.x = this.state.detposx;
            this.props.detector.model.position.y = this.state.detposy;
            this.props.detector.model.position.z = this.state.detposz;
            
            this.props.detector.model.rotation.x = this.state.detrotx;
            this.props.detector.model.rotation.y = this.state.detroty;
            this.props.detector.model.rotation.z = this.state.detrotz;
            
            this.props.detector.model.scale.x = this.state.detscalex;
            this.props.detector.model.scale.y = this.state.detscaley;
            this.props.detector.model.scale.z = this.state.detscalez;
            
            this.props.detector.material = this.state.detmat;

            this.props.detector.model.color = this.state.color;

            this.props.updatedetails(
<>
              <Row>
                    <Col>Position: </Col>
                    </Row>
                    <Row>
                      <Col>x: {this.state.detposx} cm</Col>
                      <Col>y: {this.state.detposy} cm</Col>
                      <Col>z: {this.state.detposz} cm</Col>
                    </Row>
                    <Row>
                    <Col>Rotation: </Col>
                    </Row>
                    <Row>
                      <Col>x: {this.state.detrotx} deg</Col>
                      <Col>y: {this.state.detroty} deg</Col>
                      <Col>z: {this.state.detrotz} deg</Col>
                    </Row>
                    <Row>
                    <Col>Scale: </Col>
                    </Row>
                    <Row>
                      <Col>x: {this.state.detscalex}</Col>
                      <Col>y: {this.state.detscaley}</Col>
                      <Col>z: {this.state.detscalez}</Col>
                    </Row>
                    <Row>
                    <Col>Material: </Col>
                    </Row>
                    <Row>
                      <Col>{this.state.detmat}</Col>
                    </Row>
</>
            );            
            }}>
            Modify
          </Button>
        </Modal.Footer>
      </Modal>
    </> 
  }
}

export default DetectorEditDialog;