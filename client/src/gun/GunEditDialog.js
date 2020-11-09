import React, { Component, createRef } from 'react';
import '../App.css';

import {Button, Nav, Navbar, FormControl, Container,Col,Row, Form, Dropdown, OverlayTrigger, Tooltip, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConfirmDialog from '../graphics/ConfirmDialog';
import Parser from '../utils/Parser';
import UnitConverter from "../utils/UnitConverter";

class GunEditDialog extends Component{
  constructor(props){
    super(props);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.confirmDialog = React.createRef();

    this.state = {show: false, 
      detname: this.props.detector.name,
      detposx: this.props.detector.model.position.x / this.props.detector.units[0],
      detposy: this.props.detector.model.position.y / this.props.detector.units[0],
      detposz: this.props.detector.model.position.z / this.props.detector.units[0],
      detdirx: this.props.detector.direction.x,
      detdiry: this.props.detector.direction.y,
      detdirz: this.props.detector.direction.z,
      posu: this.props.detector.units[0],
      energyu: this.props.detector.units[1],
      energy: this.props.detector.energy / this.props.detector.units[1]}
    
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
    const handleDelete = ()=>{
      this.hideDialog();
      this.props.removebutton(this.props.detector, this.props.button.id);
    }
    return <>
    <ConfirmDialog ref={this.confirmDialog} title="Confirm" content="Are you sure you want to delete this component?" fun={handleDelete}></ConfirmDialog>

        <Modal show={this.state.show} onHide={()=>{this.hideDialog();}}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Gun</Modal.Title>
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
          <Button variant="secondary" onClick={()=>{
            this.confirmDialog.current.showDialog();
          }} style={{backgroundColor: 'red', color: 'white'}}>
            Delete
          </Button>
          <Button variant="primary" onClick={()=>{this.hideDialog();

            this.props.detector.name = this.state.name;

            this.props.detector.model.position.x = this.state.detposx * this.state.posu;
            this.props.detector.model.position.y = this.state.detposy * this.state.posu;
            this.props.detector.model.position.z = this.state.detposz * this.state.posu;
            
            this.props.detector.direction.x = this.state.detdirx;
            this.props.detector.direction.y = this.state.detdiry;
            this.props.detector.direction.z = this.state.detdirz;
            
            
            this.props.detector.energy = this.state.energy * this.state.energyu;

            let text = "";
            for(let i = 0;i<Parser.chunks.length;i++){
              if(this.props.buttonid == Parser.chunks[i].id){
                Parser.chunks[i].code = "\\Gun{\n" +
                "\tname: " + '"' + this.props.name + '";\n' + 
                "\tposition[" + UnitConverter.convertLength(this.state.posu) + "]: " + this.state.detposx + ", " + this.state.detposy + ", " + this.state.detposz + ";\n" + 
                "\tdirection: " + this.state.detdirx + ", " + this.state.detdiry + ", " + this.state.detdirz + ";\n" + 
                "\tenergy[" + UnitConverter.convertEnergy(this.state.energyu) + "]: " +  this.state.energy + ';\n' + 
                "}\n";
              }
              text += Parser.chunks[i].code;
            }

            this.props.codeeditor.current.updateText(text);

            this.props.updatedetails(
            <Container>
                  <Row>
                  <Col>Position: </Col>
                  </Row>
                  <Row>
                    <Col>x: {this.state.detposx} {UnitConverter.convertLength(this.state.posu)}</Col>
                    <Col>y: {this.state.detposy} {UnitConverter.convertLength(this.state.posu)}</Col>
                    <Col>z: {this.state.detposz} {UnitConverter.convertLength(this.state.posu)}</Col>
                  </Row>
                  <Row>
                  <Col>Direction: </Col>
                  </Row>
                  <Row>
                    <Col>x: {this.state.detdirx} </Col>
                    <Col>y: {this.state.detdiry} </Col>
                    <Col>z: {this.state.detdirz} </Col>
                  </Row>
                  <Row>
                  <Col>Energy: {this.state.energy} {UnitConverter.convertEnergy(this.state.energyu)}</Col>
                  </Row>
                  </Container>
            );            
            }}>
            Modify
          </Button>
        </Modal.Footer>
      </Modal>
    </> 
  }
}

export default GunEditDialog;
