import React, { Component, createRef } from 'react';
import '../App.css';

import {Button, Card, Accordion, Figure, Row, Col, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import GunEditDialog from './GunEditDialog';
import RenderSystem from '../rendering/renderSystem';
import UnitConverter from '../utils/UnitConverter';

class GunButton extends Component{
  constructor(props){
    super(props);
    this.editdialog = React.createRef();
    this.updateDetails = this.updateDetails.bind(this);
    this.state = {detector: this.props.detector};
    this.id = this.props.id;
    this.accordion = React.createRef();

  }
  static id = 0;
  updateDetails(d){
    this.setState({detector: d});
  }
  render(){
    return <div>
    <GunEditDialog buttonid={this.id} codeeditor={this.props.codeeditor} name={this.props.name} updatedetails={this.updateDetails} button={this} removebutton={this.props.removebutton}
      detector={this.props.detector} ref={this.editdialog} buttons={this.props.buttons} details={this.props.details}></GunEditDialog>
    <Card className='button'>
      <Card.Header>
      <Accordion.Toggle ref={this.accordion} as={Button} onClick={()=>{
          if(RenderSystem.active_id == this.props.detector.id){
            RenderSystem.active_id = -1;
            return;
          }
          RenderSystem.active_id = this.props.detector.id;
          }} variant="link" eventKey={this.id}>
          {this.props.name}
        </Accordion.Toggle>
        <Button onClick={()=>{this.editdialog.current.showDialog();}} className="editButton">EDIT</Button>
      </Card.Header>
      <Accordion.Collapse eventKey={this.id}>
      <Card.Body>
      <Container>
      <Row>
        <Col>Position: </Col>
      </Row>
      <Row>
        <Col>x: {this.state.detector.model.position.x} {UnitConverter.convertLength(this.state.detector.units[0])}</Col>
        <Col>y: {this.state.detector.model.position.y} {UnitConverter.convertLength(this.state.detector.units[0])}</Col>
        <Col>z: {this.state.detector.model.position.z} {UnitConverter.convertLength(this.state.detector.units[0])}</Col>
      </Row>
      <Row>
        <Col>Direction: </Col>
      </Row>
      <Row>
        <Col>x: {this.state.detector.direction.x} </Col>
        <Col>y: {this.state.detector.direction.y} </Col>
        <Col>z: {this.state.detector.direction.z} </Col>
      </Row>
      <Row>
        <Col>Energy: {this.state.detector.energy} {UnitConverter.convertEnergy(this.state.detector.units[1])}</Col>
      </Row>
    </Container>
    </Card.Body>
      </Accordion.Collapse>
    </Card>
  </div>
    
  }
}

export default GunButton;
