import React, { Component, createRef } from 'react';
import '../App.css';

import {Button, Card, Accordion, Figure, Row, Container, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SourceEditDialog from './SourceEditDialog';
import RenderSystem from '../rendering/renderSystem';
import UnitConverter from '../utils/UnitConverter';

class SourceButton extends Component{
  constructor(props){
    super(props);
    this.editdialog = React.createRef();
    this.updateDetails = this.updateDetails.bind(this);
    this.state = {details: 
      <Container>
      <Row>
        <Col>Position: </Col>
      </Row>
      <Row>
        <Col>x: {this.props.detector.model.position.x} {UnitConverter.convertLength(this.props.detector.units[0])}</Col>
        <Col>y: {this.props.detector.model.position.y} {UnitConverter.convertLength(this.props.detector.units[0])}</Col>
        <Col>z: {this.props.detector.model.position.z} {UnitConverter.convertLength(this.props.detector.units[0])}</Col>
      </Row>
      <Row>
        <Col>Material: {this.props.detector.material}</Col>
      </Row>
    </Container>
    };
    this.id = this.props.id;
    this.accordion = React.createRef();
  }
  static id = 0;
  componentDidMount(){
  }
  updateDetails(d){
    this.setState({details: d});
  }
  render(){
    return <div>
    <SourceEditDialog codeeditor={this.props.codeeditor} name={this.props.name} buttonid={this.id} updatedetails={this.updateDetails} button={this} removebutton={this.props.removebutton}
      detector={this.props.detector} ref={this.editdialog} buttons={this.props.buttons} details={this.props.details}></SourceEditDialog>
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
      <Card.Body>{this.state.details}</Card.Body>
      </Accordion.Collapse>
    </Card>
  </div>
    
  }
}

export default SourceButton;
