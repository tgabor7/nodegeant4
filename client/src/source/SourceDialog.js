import React, { Component, createRef } from 'react';
import '../App.css';

import {Button, Nav, Navbar, FormControl, Container,Col,Row, Form, Dropdown, OverlayTrigger, Tooltip, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SourceButton from '../source/SourceButton';

class SourceDialog extends Component{
  constructor(props){
    super(props);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.state = {show: false, 
      detname: 'Detector',
      detposx: 0,
      detposy: 0,
      detposz: 0,
      material: 'Co60' }
    
  }
  componentDidMount(){
    
  }
  showDialog(){
      this.setState({show: true});
      let detectorName = 'Source' + this.props.buttons.length;
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
          <Modal.Title>Create Particle Source</Modal.Title>
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
          
          <Row>
            Material <Col><Form.Control
            className="numspinner"
            required
            value='0'
            type="text"
            maxLength="10"
            value = {this.state.material}
            onChange={(event)=>{this.setState({material: event.target.value});}} />
            </Col>
          </Row>
          </Container>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{this.hideDialog();}}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>{this.hideDialog();this.props.createbutton(this.state.detname,  this.state.detposx, this.state.detposy, this.state.detposz,
            this.state.material);}}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </> 
  }
}

export default SourceDialog;
