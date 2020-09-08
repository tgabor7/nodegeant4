import React, { Component, createRef } from 'react';
import '../App.css';

import {Button, Nav, Navbar, FormControl, Container,Col,Row, Form, Dropdown, OverlayTrigger, Tooltip, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import GunButton from '../gun/GunButton';

class GunDialog extends Component{
  constructor(props){
    super(props);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.state = {show: false, 
      detname: 'Gun',
      detposx: 0,
      detposy: 0,
      detposz: 0,
      detdirx: 1,
      detdiry: 0,
      detdirz: 0,
      posu: 1,
      energyu: 1000,
      energy: 100 }
    
  }
  componentDidMount(){
    
  }
  showDialog(){
      this.setState({show: true});
  }
  hideDialog(){
    this.setState({show: false});
  }
  
  static id = 0;
  render(){
    
    return <>
        <Modal show={this.state.show} onHide={()=>{this.hideDialog();}}>
        <Modal.Header closeButton>
          <Modal.Title>Create Particle Gun</Modal.Title>
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
            <Form.Control as="select" style={{"width":"100px","margin-left":"-15px","margin-bottom":"10px"}} value={this.state.posu} onChange={(e)=>{this.setState({posu: e.target.value});}}>
                <option value=".1">mm</option>
                <option value="1">cm</option>
                <option value="10">dm</option>
                <option value="100">m</option>
                </Form.Control>
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
          <Row>Direction</Row>
          <Row>
            x<Col><Form.Control
            className="numspinner"
            required
            value='0'
            type="number"
            maxLength="10"
            value = {this.state.detdirx}
            onChange={(event)=>{this.setState({detdirx: event.target.value});}} />
            </Col>
            y<Col><Form.Control
            className="numspinner"
            required
            value='0'
            type="number"
            maxLength="10"
            value = {this.state.detdiry}
            onChange={(event)=>{this.setState({detdiry: event.target.value});}} />
            </Col>
            z<Col><Form.Control
            className="numspinner"
            required
            value='0'
            type="number"
            maxLength="10"
            value = {this.state.detdirz}
            onChange={(event)=>{this.setState({detdirz: event.target.value});}} />
            </Col>
          </Row>
          <br/>
          
          <Row>
            Energy <Col><Form.Control
            className="numspinner"
            required
            value='0'
            type="number"
            maxLength="10"
            value = {this.state.energy}
            onChange={(event)=>{this.setState({energy: event.target.value});}} />
            </Col>
            <Form.Control as="select" style={{"width":"100px","margin-left":"-15px","margin-bottom":"10px"}} value={this.state.energyu} onChange={(e)=>{this.setState({energyu: e.target.value});}}>
                <option value="1">eV</option>
                <option value="1000">keV</option>
                <option value="1000000">MeV</option>
                <option value="1000000000">GeV</option>
                </Form.Control>
          </Row>
          </Container>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{this.hideDialog();}}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>{this.hideDialog();this.props.createbutton(this.state.detname, this.state.detposx, this.state.detposy, this.state.detposz,
            this.state.detdirx, this.state.detdiry, this.state.detdirz, this.state.energy, false, this.state.posu, this.state.energyu);}}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </> 
  }
}

export default GunDialog;
