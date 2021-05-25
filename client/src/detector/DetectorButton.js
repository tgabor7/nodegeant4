import React, { Component, createRef } from 'react';
import '../App.css';

import {Button, Card, Accordion, Figure, Col, Row, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from '../images/editicon.png';
import DetectorEditDialog from './DetectorEditDialog';
import RenderSystem from '../rendering/renderSystem';
import UnitConverter from '../utils/UnitConverter';

/*
Class handling detector buttons, clicking it shows an accordion containing the detectors parameters.
Clicking edit shows a dialog where you can modify the detector.
*/

class DetectorButton extends Component{
  constructor(props){
    super(props);
    this.editdialog = React.createRef();
    this.updateDetails = this.updateDetails.bind(this);
    this.setName = this.setName.bind(this);
    this.state = {position: this.props.detector.model.position, rotation: this.props.detector.model.rotation, scale: this.props.detector.model.scale,
    deposit: this.props.detector.deposit, material: this.props.detector.material, punit: this.props.detector.units[0], runit: this.props.detector.units[1],
  sunit: this.props.detector.units[2], name: this.props.name}
    
    this.id = this.props.id;
    this.accordion = React.createRef();
  }
  static id = 0;
  componentDidMount(){
    
  }
  updateDetails(d){
    this.setState({deposit: d.deposit, name: d.name, position: d.model.position, rotation: d.model.rotation, scale: d.model.scale, material: d.material, punit: d.units[0], runit: d.units[1], sunit: d.units[2]});
  }
  updateGeometry(g){
    this.editdialog.updateGeometry(g);
  }
  setName(n){
    this.setState({name: n});
  }
  render(){
    return <div>
    <DetectorEditDialog createvolume = {this.props.createvolume} setname={this.setName} canvas={this.props.canvas} name={this.props.name} buttonid={this.id} codeeditor={this.props.codeeditor} updatedetails={this.updateDetails} button={this} removebutton={this.props.removebutton}
      detector={this.props.detector} ref={this.editdialog} buttons={this.props.buttons} details={this.props.details}></DetectorEditDialog>
    <Card className='button'>
      <Card.Header>
        <Accordion.Toggle ref={this.accordion} as={Button} onClick={()=>{
          if(RenderSystem.active_id == this.props.detector.id){
            RenderSystem.active_id = -1;
            return;
          }
          RenderSystem.active_id = this.props.detector.id;
          }} variant="link" eventKey={this.id}>
          {this.state.name}
        </Accordion.Toggle>
        <Button onClick={()=>{this.editdialog.current.showDialog(this.props.volumes,this.props.detector);}} className="editButton">EDIT</Button>
      </Card.Header>
      <Accordion.Collapse eventKey={this.id}>
        <Card.Body>
        <Container>
      <Row>
        <Col>Position: </Col>
      </Row>
      <Row>
        <Col>x: {this.state.position.x} {UnitConverter.convertLength(this.state.punit)}</Col>
        <Col>y: {this.state.position.y} {UnitConverter.convertLength(this.state.punit)}</Col>
        <Col>z: {this.state.position.z} {UnitConverter.convertLength(this.state.punit)}</Col>
      </Row>
      <Row>
        <Col>Rotation: </Col>
      </Row>
      <Row>
        <Col>x: {this.state.rotation.x} {UnitConverter.convertAngle(this.state.runit)}</Col>
        <Col>y: {this.state.rotation.y} {UnitConverter.convertAngle(this.state.runit)}</Col>
        <Col>z: {this.state.rotation.z} {UnitConverter.convertAngle(this.state.runit)}</Col>
      </Row>
      <Row>
        <Col>Scale: </Col>
      </Row>
      <Row>
        <Col>x: {this.state.scale.x} {UnitConverter.convertLength(this.state.sunit)}</Col>
        <Col>y: {this.state.scale.y} {UnitConverter.convertLength(this.state.sunit)}</Col>
        <Col>z: {this.state.scale.z} {UnitConverter.convertLength(this.state.sunit)}</Col>
      </Row>
      <Row>
        <Col>Material: </Col>
      </Row>
      <Row>
        <Col>{this.state.material}</Col>
      </Row>
      <Row>
        <Col>Deposit: </Col>
        <Col>{this.state.deposit} keV</Col>
      </Row>
    </Container>
          </Card.Body>
      </Accordion.Collapse>
    </Card>
  </div>
    
  }
}

export default DetectorButton;
