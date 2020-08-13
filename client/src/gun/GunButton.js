import React, { Component, createRef } from 'react';
import '../App.css';

import {Button, Card, Accordion, Figure, Row, Col, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from '../images/editicon.png';
import GunEditDialog from './GunEditDialog';
import RenderSystem from '../rendering/renderSystem';
import DetectorButton from '../detector/DetectorButton';

class GunButton extends Component{
  constructor(props){
    super(props);
    this.editdialog = React.createRef();
    this.updateDetails = this.updateDetails.bind(this);
    this.state = {details: this.props.details};
    this.id = this.props.id;
  }
  static id = 0;
  updateDetails(d){
    this.setState({details: d});
  }
  render(){
    return <div>
    <GunEditDialog buttonid={this.id} codeeditor={this.props.codeeditor} name={this.props.name} updatedetails={this.updateDetails} button={this} removebutton={this.props.removebutton}
      detector={this.props.detector} ref={this.editdialog} buttons={this.props.buttons} details={this.props.details}></GunEditDialog>
    <Card className='button'>
      <Card.Header>
        <Accordion.Toggle as={Button} onClick={()=>{
          if(RenderSystem.acitve_id == this.id){
            RenderSystem.acitve_id = -1;
            return;
          }
          RenderSystem.acitve_id = this.id;
          }} variant="link" eventKey={this.id}>
          {this.props.name}
        </Accordion.Toggle>
        <Button onClick={()=>{this.editdialog.current.showDialog();}} className="editButton">EDIT</Button>
      </Card.Header>
      <Accordion.Collapse eventKey={this.id}>
        <Card.Body><Container>
      <Row>
      <Col>Position: </Col>
      </Row>
      <Row>
        <Col>x: {this.props.detector.model.position.x} cm</Col>
        <Col>y: {this.props.detector.model.position.y} cm</Col>
        <Col>z: {this.props.detector.model.position.z} cm</Col>
      </Row>
      <Row>
      <Col>Direction: </Col>
      </Row>
      <Row>
        <Col>x: {this.props.detector.direction.x} </Col>
        <Col>y: {this.props.detector.direction.y} </Col>
        <Col>z: {this.props.detector.direction.z} </Col>
      </Row>
      <Row>
      <Col>Energy: {this.props.detector.energy} keV</Col>
      </Row>
      </Container></Card.Body>
      </Accordion.Collapse>
    </Card>
  </div>
    
  }
}

export default GunButton;
