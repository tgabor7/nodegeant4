import React, { Component, createRef } from 'react';
import '../App.css';

import {Button, Nav, Navbar, FormControl, Form, Dropdown, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DetectorDialog from '../detector/DetectorDialog';
import GunDialog from '../gun/GunDialog';
import SourceDialog from '../source/SourceDialog';
import RunDialog from './RunDialog';
import SpectrumDialog from './SpectrumDialog';

class NavigationBar extends Component{
  constructor(props){
    super(props);
    this.dialog = React.createRef();
    this.gundialog = React.createRef();
    this.sourcedialog = React.createRef();
    this.rundialog = React.createRef();
    this.spectrumdialog = React.createRef();
    this.state = {showTracks: true, showParticles: true};
  }
  static id = 0;
  render(){

    return <>
   <DetectorDialog ref={this.dialog} createbutton={this.props.createbutton} buttons={this.props.buttons}></DetectorDialog>
   <GunDialog ref={this.gundialog} createbutton={this.props.creategunbutton} buttons={this.props.buttons}></GunDialog>
   <SourceDialog ref={this.sourcedialog} createbutton={this.props.createsourcebutton} buttons={this.props.buttons}></SourceDialog>
   <RunDialog ref={this.rundialog} runsim={this.props.run}></RunDialog>
   <SpectrumDialog ref={this.spectrumdialog} runsim={this.props.runspectroscopy} detectors={this.props.detectors}></SpectrumDialog>
   
   <Navbar bg="light" variant="light" style={{position: 'fixed', 'z-index': '4'}}>
        <Navbar.Brand>Geant4</Navbar.Brand>
        <Button variant="primary" onClick={()=>{
          this.rundialog.current.showDialog();}} >Run</Button>

        <Button variant="primary" style={{backgroundColor: 'green'}} onClick={()=>{
          this.spectrumdialog.current.showDialog();}}>Spectroscopy</Button>

        <Button variant="primary" style={{backgroundColor: 'red'}} onClick={()=>{
                  this.props.clearrun();}}>Clear particles</Button>

        <Button variant="primary" style={{backgroundColor: 'red'}} onClick={()=>{
                  this.props.clearSetup();}}>Clear setup</Button>

        <Nav className="mr-auto">
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor: 'white', border: 'none', color: 'black'}}>
          Add
        </Dropdown.Toggle>

        <Dropdown.Menu>
        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Detector Geometry</Tooltip>}>
        <span className="d-inline-block">
          <Dropdown.Item className='detectoroption' onClick={()=>{this.dialog.current.showDialog();}}>Detector</Dropdown.Item>
          </span>
        </OverlayTrigger>
        <br/>
        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">General Particle Source</Tooltip>}>
        <span className="d-inline-block">
          <Dropdown.Item className='detectoroption' onClick={()=>{this.sourcedialog.current.showDialog();}}>GPS</Dropdown.Item>
          </span>
        </OverlayTrigger>
        <br/>
        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Directed Particle Gun</Tooltip>}>
        <span className="d-inline-block">
          <Dropdown.Item className='detectoroption' onClick={()=>{this.gundialog.current.showDialog();}}>Gun</Dropdown.Item>
          </span>
        </OverlayTrigger>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor: 'white', border: 'none', color: 'black'}}>
          View
        </Dropdown.Toggle>

        <Dropdown.Menu>
        <Form.Check type="checkbox" label="Show Tracks" checked={this.state.showTracks} onChange={(evt)=>{
          this.setState({showTracks: evt.target.checked});
          this.props.setshowtracks(this.state.showTracks);}} style={{margin: '12px'}} />
        <Form.Check type="checkbox" label="Show Particles" checked={this.state.showParticles} onChange={(evt)=>{
          this.setState({showParticles: evt.target.checked});
          this.props.setshowparticles(this.state.showParticles);}}
          style={{margin: '12px'}}/>
        

        </Dropdown.Menu>
      </Dropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-primary">Search</Button>
        </Form>
      </Navbar>
    </> 
  }
}

export default NavigationBar;
