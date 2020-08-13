import React, { Component, createRef } from 'react';
import '../App.css';

import {Button, Nav, Navbar, FormControl, Container,Col,Row, Form, Dropdown, OverlayTrigger, Tooltip, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConfirmDialog from '../graphics/ConfirmDialog';
import Parser from '../utils/Parser';

class GunEditDialog extends Component{
  constructor(props){
    super(props);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.confirmDialog = React.createRef();

    this.state = {show: false, 
      detname: this.props.detector.name,
      detposx: this.props.detector.model.position.x,
      detposy: this.props.detector.model.position.y,
      detposz: this.props.detector.model.position.z,
      detdirx: this.props.detector.direction.x,
      detdiry: this.props.detector.direction.y,
      detdirz: this.props.detector.direction.z,
      energy: this.props.detector.energy}
    
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
      this.props.removebutton(this.props.detector, this.props.button);
    }
    return <>
    <ConfirmDialog ref={this.confirmDialog} title="Confirm" content="Are you sure you want to delete this component?" fun={handleDelete}></ConfirmDialog>

        <Modal show={this.state.show} onHide={()=>{this.hideDialog();}}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Detector</Modal.Title>
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
            </Col> keV
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

            this.props.detector.model.position.x = this.state.detposx;
            this.props.detector.model.position.y = this.state.detposy;
            this.props.detector.model.position.z = this.state.detposz;
            
            this.props.detector.direction.x = this.state.detdirx;
            this.props.detector.direction.y = this.state.detdiry;
            this.props.detector.direction.z = this.state.detdirz;
            
            
            this.props.detector.energy = this.state.energy;

            let text = "";
            for(let i = 0;i<Parser.chunks.length;i++){
              if(this.props.buttonid == Parser.chunks[i].id){
                Parser.chunks[i].code = "\\Gun{\n" +
                "\tname: " + '"' + this.props.name + '";\n' + 
                "\tposition[cm]: " + this.state.detposx + ", " + this.state.detposy + ", " + this.state.detposz + ";\n" + 
                "\tdirection: " + this.state.detdirx + ", " + this.state.detdiry + ", " + this.state.detdirz + ";\n" + 
                "\tenergy[keV]: " +  this.state.energy + ';\n' + 
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
                    <Col>x: {this.state.detposx} cm</Col>
                    <Col>y: {this.state.detposy} cm</Col>
                    <Col>z: {this.state.detposz} cm</Col>
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
                  <Col>Energy: {this.state.energy} keV</Col>
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
