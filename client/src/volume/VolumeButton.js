import React, { Component, createRef } from 'react';
import '../App.css';

import {Button, Card, Accordion, Figure} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import image from '../images/editicon.png';
import VolumeEditButton from './VolumeEditButton';
import RenderSystem from '../rendering/renderSystem';
import ModelCanvas from '../graphics/ModelCanvas';

class VolumeButton extends Component{
  constructor(props){
    super(props);
    this.editdialog = React.createRef();
    this.updateDetails = this.updateDetails.bind(this);
    this.setName = this.setName.bind(this);
    this.state = {details: this.props.details,name: this.props.name};
    this.canvas = React.createRef();
  }
  static id = 0;
  componentDidMount(){
    
  }
  updateDetails(d){
    this.setState({details: d});
  }
  setName(n){
    this.setState({name: n});
  }
  render(){
    return <div>
    <ModelCanvas modeldata={this.props.modeldata} ref={this.canvas}></ModelCanvas>
    <VolumeEditButton></VolumeEditButton>
    <Card className='button'>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey={this.id} onClick={()=>{
          this.canvas.current.showDialog();
          }}>
          {this.state.name}
        </Accordion.Toggle>
        <Button onClick={()=>{this.editdialog.current.showDialog();}} className="editButton">EDIT</Button>
      </Card.Header>
    </Card>
  </div>
    
  }
}

export default VolumeButton;
