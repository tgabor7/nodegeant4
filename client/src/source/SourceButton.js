import React, { Component, createRef } from 'react';
import '../App.css';

import {Button, Card, Accordion, Figure, Row, Container, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from '../images/editicon.png';
import SourceEditDialog from './SourceEditDialog';
import RenderSystem from '../rendering/renderSystem';
import DetectorButton from '../detector/DetectorButton';

class SourceButton extends Component{
  constructor(props){
    super(props);
    this.editdialog = React.createRef();
    this.updateDetails = this.updateDetails.bind(this);
    this.state = {details: this.props.details};
    this.id = this.props.id;
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
      <Card.Body>{this.state.details}</Card.Body>
      </Accordion.Collapse>
    </Card>
  </div>
    
  }
}

export default SourceButton;
