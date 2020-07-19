import React, { Component, createRef } from 'react';
import '../App.css';

import {Button, Nav, Navbar, FormControl, Container,Col,Row, Form, Dropdown, OverlayTrigger, Tooltip, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class DetectorEditDialog extends Component{
  constructor(props){
    super(props);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.state = {show: false, 
      detname: 'Detector',
      detposx: this.props.detector.model.position.x,
      detposy: this.props.detector.model.position.y,
      detposz: this.props.detector.model.position.z,
      detrotx: this.props.detector.model.rotation.x,
      detroty: this.props.detector.model.rotation.y,
      detrotz: this.props.detector.model.rotation.z,
      detscalex: this.props.detector.model.scale.x,
      detscaley: this.props.detector.model.scale.y,
      detscalez: this.props.detector.model.scale.z,
      detmat: this.props.detector.material}
    this.materials = [];
    this.addMaterial('G4_H','Hidrogen');
    this.addMaterial('G4_Fe','Iron');
    this.addMaterial('G4_Pb','Lead');
    this.addMaterial('G4_Pb','Lead');
    
  }
  componentDidMount(){
    
  }
  addMaterial(ann, mat){
    this.materials.push(<option value={ann}>{mat}</option>)
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
          <Row>Rotation</Row>
          <Row>
            x<Col><Form.Control
            className="numspinner"
            required
            value='0'
            type="number"
            maxLength="10"
            value = {this.state.detrotx}
            onChange={(event)=>{this.setState({detrotx: event.target.value});}} />
            </Col>
            y<Col><Form.Control
            className="numspinner"
            required
            value='0'
            type="number"
            maxLength="10"
            value = {this.state.detroty}
            onChange={(event)=>{this.setState({detroty: event.target.value});}} />
            </Col>
            z<Col><Form.Control
            className="numspinner"
            required
            value='0'
            type="number"
            maxLength="10"
            value = {this.state.detrotz}
            onChange={(event)=>{this.setState({detrotz: event.target.value});}} />
            </Col>
          </Row>
          <br/>
          <Row>Scale</Row>
          <Row>
            x<Col><Form.Control
            className="numspinner"
            required
            value='0'
            type="number"
            maxLength="10"
            value = {this.state.detscalex}
            onChange={(event)=>{this.setState({detscalex: event.target.value});}} />
            </Col>
            y<Col><Form.Control
            className="numspinner"
            required
            value='0'
            type="number"
            maxLength="10"
            value = {this.state.detscaley}
            onChange={(event)=>{this.setState({detscaley: event.target.value});}} />
            </Col>
            z<Col><Form.Control
            className="numspinner"
            required
            value='0'
            type="number"
            maxLength="10"
            value = {this.state.detscalez}
            onChange={(event)=>{this.setState({detscalez: event.target.value});}} />
            </Col>
          </Row>
          <br/>
          <Row>
          <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Material</Form.Label>
            <Form.Control
            className="material"
            required
            value='0'
            type="text"
            maxLength="10"
            value = {this.state.detmat}
            onChange={(event)=>{this.setState({detmat: event.target.value});}} />
          </Form.Group>
          </Row>
          </Container>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{
            this.hideDialog();
            this.props.removebutton(this.props.detector, this.props.button);
          }} style={{backgroundColor: 'red', color: 'white'}}>
            Delete
          </Button>
          <Button variant="primary" onClick={()=>{this.hideDialog();

            this.props.detector.model.position.x = this.state.detposx;
            this.props.detector.model.position.y = this.state.detposy;
            this.props.detector.model.position.z = this.state.detposz;
            
            this.props.detector.model.rotation.x = this.state.detrotx;
            this.props.detector.model.rotation.y = this.state.detroty;
            this.props.detector.model.rotation.z = this.state.detrotz;
            
            this.props.detector.model.scale.x = this.state.detscalex;
            this.props.detector.model.scale.y = this.state.detscaley;
            this.props.detector.model.scale.z = this.state.detscalez;
            
            this.props.detector.material = this.state.detmat;

            this.props.updatedetails(
<>
              <Row>
                    <Col>Position: </Col>
                    </Row>
                    <Row>
                      <Col>x: {this.state.detposx} cm</Col>
                      <Col>y: {this.state.detposy} cm</Col>
                      <Col>z: {this.state.detposz} cm</Col>
                    </Row>
                    <Row>
                    <Col>Rotation: </Col>
                    </Row>
                    <Row>
                      <Col>x: {this.state.detrotx} deg</Col>
                      <Col>y: {this.state.detroty} deg</Col>
                      <Col>z: {this.state.detrotz} deg</Col>
                    </Row>
                    <Row>
                    <Col>Scale: </Col>
                    </Row>
                    <Row>
                      <Col>x: {this.state.detscalex}</Col>
                      <Col>y: {this.state.detscaley}</Col>
                      <Col>z: {this.state.detscalez}</Col>
                    </Row>
                    <Row>
                    <Col>Material: </Col>
                    </Row>
                    <Row>
                      <Col>{this.state.detmat}</Col>
                    </Row>
</>
            );            
            }}>
            Modify
          </Button>
        </Modal.Footer>
      </Modal>
    </> 
  }
}

export default DetectorEditDialog;
