import React, { Component, createRef } from 'react';
import '../App.css';

import {Button, Card, Accordion, Figure, Col, Row, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from '../images/editicon.png';
import DetectorEditDialog from './DetectorEditDialog';
import RenderSystem from '../rendering/renderSystem';
import UnitConverter from '../utils/UnitConverter';

class DetectorButton extends Component{
  constructor(props){
    super(props);
    this.editdialog = React.createRef();
    this.updateDetails = this.updateDetails.bind(this);
    this.setName = this.setName.bind(this);
    this.state = {details: <Container>
      <Row>
        <Col>Position: </Col>
      </Row>
      <Row>
        <Col>x: {this.props.detector.model.position.x} {UnitConverter.convertLength(this.props.detector.units[0])}</Col>
        <Col>y: {this.props.detector.model.position.y} {UnitConverter.convertLength(this.props.detector.units[0])}</Col>
        <Col>z: {this.props.detector.model.position.z} {UnitConverter.convertLength(this.props.detector.units[0])}</Col>
      </Row>
      <Row>
        <Col>Rotation: </Col>
      </Row>
      <Row>
        <Col>x: {this.props.detector.model.rotation.x} {UnitConverter.convertAngle(this.props.detector.units[1])}</Col>
        <Col>y: {this.props.detector.model.rotation.y} {UnitConverter.convertAngle(this.props.detector.units[1])}</Col>
        <Col>z: {this.props.detector.model.rotation.z} {UnitConverter.convertAngle(this.props.detector.units[1])}</Col>
      </Row>
      <Row>
        <Col>Scale: </Col>
      </Row>
      <Row>
        <Col>x: {this.props.detector.model.scale.x} {UnitConverter.convertLength(this.props.detector.units[2])}</Col>
        <Col>y: {this.props.detector.model.scale.y} {UnitConverter.convertLength(this.props.detector.units[2])}</Col>
        <Col>z: {this.props.detector.model.scale.z} {UnitConverter.convertLength(this.props.detector.units[2])}</Col>
      </Row>
      <Row>
        <Col>Material: </Col>
      </Row>
      <Row>
        <Col>{this.props.detector.material}</Col>
      </Row>
    </Container> ,name: this.props.name};
    this.id = this.props.id;
    this.accordion = React.createRef();
  }
  static id = 0;
  componentDidMount(){
    
  }
  updateDetails(d){
    this.setState({details: d});
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
        <Card.Body>{this.state.details}</Card.Body>
      </Accordion.Collapse>
    </Card>
  </div>
    
  }
}

export default DetectorButton;
