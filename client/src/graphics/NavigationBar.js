import React, { Component, createRef } from 'react';
import '../App.css';

import {Button, Nav, Navbar, FormControl, Form, Dropdown, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DetectorDialog from '../detector/DetectorDialog';
import GunDialog from '../gun/GunDialog';
import SourceDialog from '../source/SourceDialog';
import RunDialog from './RunDialog';
import SpectrumDialog from './SpectrumDialog';
import ConfirmDialog from './ConfirmDialog';
import VolumeDialog from '../volume/VolumeDialog';
import Logger from '../utils/Logger';

const Cookies = require("js-cookie");

class NavigationBar extends Component{
  constructor(props){
    super(props);
    this.dialog = React.createRef();
    this.gundialog = React.createRef();
    this.sourcedialog = React.createRef();
    this.rundialog = React.createRef();
    this.spectrumdialog = React.createRef();
    this.confirmDialog = React.createRef();
    this.volumedialog = React.createRef();
    this.showRun = this.showRun.bind(this);
    this.state = {showTracks: true, showParticles: true, showAxes: true, showGrid: false, showrun: "none", showclearsetup: "none", showclearparticles: "none", login: Cookies.get("login"),projectname: this.props.projectname};
  }
  componentDidMount(){
  }
  static id = 0;
  showRun(b){
    if(b) this.setState({showrun: "block"});
    else this.setState({showrun: "none"});
  }
  showClearParticles(b){
    if(b) this.setState({showclearparticles: "block"});
    else this.setState({showclearparticles: "none"});
  }
  showClearSetup(b){
    if(b) this.setState({showclearsetup: "block"});
    else this.setState({showclearsetup: "none"});
  }
  render(){

    const handleDelete = ()=>{
      this.props.clearSetup();
      this.showClearSetup(false);
    }
    const login = this.state.login;

    return <>

    <ConfirmDialog ref={this.confirmDialog} title="Confirm" content="Are you sure you want to delete all components?" fun={handleDelete}>

    </ConfirmDialog>
   <DetectorDialog ref={this.dialog} createbutton={this.props.createbutton} buttons={this.props.buttons}></DetectorDialog>
   <GunDialog ref={this.gundialog} createbutton={this.props.creategunbutton} buttons={this.props.buttons}></GunDialog>
   <SourceDialog ref={this.sourcedialog} createbutton={this.props.createsourcebutton} buttons={this.props.buttons}></SourceDialog>
   <RunDialog ref={this.rundialog} runsim={this.props.run}></RunDialog>
   <SpectrumDialog ref={this.spectrumdialog} runsim={this.props.runspectroscopy} detectors={this.props.detectors}></SpectrumDialog>
   <VolumeDialog ref={this.volumedialog} createbutton={this.props.createvolume}></VolumeDialog>

   <Navbar bg="light" variant="light" style={{position: 'fixed', 'z-index': '4'}}>
        <Navbar.Brand>{this.props.projectname}</Navbar.Brand>
        <Button style={{"display": this.state.showrun, "borderRadius" : 0}} variant="primary" onClick={()=>{
          this.rundialog.current.showDialog();}} >Run</Button>

        <Button variant="primary" style={{backgroundColor: 'green', "display" : this.state.showrun, "borderRadius" : 0}} onClick={()=>{
          this.spectrumdialog.current.showDialog();}}>Spectroscopy</Button>

        <Button variant="primary" style={{"display" : this.state.showclearparticles, backgroundColor: 'red',"borderRadius" : 0}} onClick={()=>{
                  this.props.clearrun();
                  this.showClearParticles(false);
                  }}>Clear particles</Button>

        <Button variant="primary" style={{"display" : this.state.showclearsetup, backgroundColor: 'red',"borderRadius" : 0}} onClick={()=>{
                  this.confirmDialog.current.showDialog();
                  
                  }}>Clear setup</Button>

        <Button variant="primary" style={{backgroundColor: 'gray',"borderRadius" : 0}} onClick={()=>{
                  Logger.log(1, "asd");
                  }}>Send log</Button>

        <Nav className="mr-auto">
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor: 'white', border: 'none', color: 'black'}}>
          File
        </Dropdown.Toggle>

        <Dropdown.Menu>
        <Dropdown.Item className='exportoption' onClick={()=>{this.props.save();}}>Export</Dropdown.Item>
        <Dropdown.Item className='importoption' onClick={()=>{this.props.load();}}>Import</Dropdown.Item>
        <Dropdown.Item className='saveoption' style={login == undefined ? {"display":"none"}:{"display":"block"}} onClick={()=>{
          this.props.updateproject();
        }}>Save</Dropdown.Item>
        <Dropdown.Item className='saveoption' style={login == undefined ? {"display":"none"}:{"display":"block"}} onClick={()=>{
          this.props.saveonline();
        }}>Save as</Dropdown.Item>
        </Dropdown.Menu>
        
      </Dropdown>
        <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor: 'white', border: 'none', color: 'black'}}>
          Add
        </Dropdown.Toggle>

        <Dropdown.Menu>
        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Particle Detector</Tooltip>}>
        <span className="d-inline-block">
          <Dropdown.Item className='detectoroption' onClick={()=>{this.dialog.current.showDialog(this.props.volumes);}}>Detector</Dropdown.Item>
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
        <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Detector volume</Tooltip>}>
        <span className="d-inline-block">
          <Dropdown.Item className='detectoroption' onClick={()=>{
            this.volumedialog.current.showDialog();
            }}>Volume</Dropdown.Item>
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

<Form.Check type="checkbox" label="Show Axes" checked={this.state.showAxes} onChange={(evt)=>{
          this.setState({showAxes: evt.target.checked});
          this.props.setshowaxes(this.state.showAxes);}}
          style={{margin: '12px'}}/>

<Form.Check type="checkbox" label="Show Grid" checked={this.state.showGrid} onChange={(evt)=>{
          this.setState({showGrid: evt.target.checked});
          if(this.state.showGrid) this.props.canvas.current.updateHint(" ");
          this.props.setshowgrid(this.state.showGrid);}}
          style={{margin: '12px'}}/>
        

        </Dropdown.Menu>
      </Dropdown>
      <Button onClick={()=>{
        window.location = "../Dashboard";
      }}>Dashboard</Button>
      <p style={login == undefined ? {"display":"none"}:{"fontSize":"20px","display":"block","position":"absolute","right":"10%"}}>Logged in as {login}! </p>
      <Button style={login == undefined ? {"display":"block","position":"absolute","right":"2%"}:{"display":"none"}} onClick={()=>{window.location = "Login"}}>Login</Button>
      <Button style={login == undefined ? {"display":"none"}:{"display":"block","backgroundColor":"#ff0000","position":"absolute","right":"2%"}} onClick={()=>{Cookies.remove("login"); window.location.reload()}}>Logout</Button>
     
        </Nav>
        
      </Navbar>
    </> 
  }
}

export default NavigationBar;
