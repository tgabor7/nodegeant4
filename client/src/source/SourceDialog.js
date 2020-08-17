import React, { Component, createRef } from 'react';
import '../App.css';

import {Button, Nav, Navbar, FormControl, Container,Col,Row, Form, Dropdown, OverlayTrigger, Tooltip, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SourceButton from '../source/SourceButton';
import SourceTable from '../graphics/SourceTable';

class SourceDialog extends Component{
  constructor(props){
    super(props);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.updateMaterial = this.updateMaterial.bind(this);
    this.table = React.createRef();
    this.state = {show: false, 
      detname: 'Detector',
      detposx: 0,
      detposy: 0,
      detposz: 0,
      material: 'Co60' }
    
  }
  componentDidMount(){
    
  }
  updateMaterial(m){
    this.setState({material: m});
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
        <SourceTable ref={this.table} updatematerial={this.updateMaterial}></SourceTable>

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
            <hr />
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
          <br/>
          <hr />
          <Form.Group>
          Material 
                <th className="tablebutton" onClick={e=>{this.table.current.showDialog();}}>
                <h1 style={{"font-size":'15px',"font-weight":"bold","vertical-align":"middle"}}>{this.state.material}</h1>
                </th>
          </Form.Group>
           
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
