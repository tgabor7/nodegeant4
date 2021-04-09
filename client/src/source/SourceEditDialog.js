import React, { Component, createRef } from 'react';
import '../App.css';

import {Button, Nav, Navbar, FormControl, Container,Col,Row, Form, Dropdown, OverlayTrigger, Tooltip, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConfirmDialog from '../graphics/ConfirmDialog';
import Parser from '../utils/Parser';
import SourceTable from '../graphics/SourceTable';
import UnitConverter from "../utils/UnitConverter";

class SourceEditDialog extends Component{
  constructor(props){
    super(props);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.updateMaterial = this.updateMaterial.bind(this);

    this.confirmDialog = React.createRef();
    this.table = React.createRef();
    this.state = {show: false, 
      detname: this.props.detector.name,
      detposx: this.props.detector.model.position.x / this.props.detector.units[0],
      detposy: this.props.detector.model.position.y / this.props.detector.units[0],
      detposz: this.props.detector.model.position.z / this.props.detector.units[0],
      posu: this.props.detector.units[0],
      material: this.props.detector.material}
    
  }
  updateMaterial(m){
    this.setState({material: m});
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
        <SourceTable ref={this.table} updatematerial={this.updateMaterial}></SourceTable>

    <ConfirmDialog ref={this.confirmDialog} title="Confirm" content="Are you sure you want to delete this component?" fun={handleDelete}></ConfirmDialog>

        <Modal show={this.state.show} onHide={()=>{this.hideDialog();}}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Source</Modal.Title>
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
            
            
            this.props.detector.material = this.state.material;

            let text = "";
            for(let i = 0;i<Parser.chunks.length;i++){
              if(this.props.buttonid == Parser.chunks[i].id){
                Parser.chunks[i].code = "\\Source{\n" +
                "\tname: " + '"' + this.props.name + '";\n' + 
                "\tposition[" + UnitConverter.convertLength(this.state.posu) + "]: " + this.state.detposx + ", " + this.state.detposy + ", " + this.state.detposz + ";\n" + 
                "\tmaterial: " + '"' + this.state.material + '";\n' + 
              "}\n";
              }
              text += Parser.chunks[i].code;
            }

            this.props.codeeditor.current.updateText(text);

            this.props.updatedetails(this.props.detector);            
            }}>
            Modify
          </Button>
        </Modal.Footer>
      </Modal>
    </> 
  }
}

export default SourceEditDialog;
