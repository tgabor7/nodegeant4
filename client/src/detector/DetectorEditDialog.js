import React, { Component, createRef } from 'react';
import '../App.css';

import { Button, Nav, Navbar, FormControl, Container, Col, Row, Form, Dropdown, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Vector3 } from '../utils/maths';
import MaterialList from './MaterialList';
import ConfirmDialog from '../graphics/ConfirmDialog';
import Parser from '../utils/Parser';
import MaterialTable from '../graphics/MaterialTable';
import STLParser from '../utils/STLParser';
import Model from '../rendering/model';
import UnitConverter from '../utils/UnitConverter';
import Logger from '../utils/Logger';
import VolumeList from '../volume/VolumeList';

class DetectorEditDialog extends Component {
  constructor(props) {
    super(props);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.confirmDialog = React.createRef();
    this.table = React.createRef();
    this.updateMaterial = this.updateMaterial.bind(this);

    this.state = {
      show: false,
      detname: this.props.detector.name,
      detposx: this.props.detector.model.position.x / this.props.detector.units[0],
      detposy: this.props.detector.model.position.y / this.props.detector.units[0],
      detposz: this.props.detector.model.position.z / this.props.detector.units[0],
      detrotx: this.props.detector.model.rotation.x / this.props.detector.units[1],
      detroty: this.props.detector.model.rotation.y / this.props.detector.units[1],
      detrotz: this.props.detector.model.rotation.z / this.props.detector.units[1],
      detscalex: this.props.detector.model.scale.x / this.props.detector.units[2],
      detscaley: this.props.detector.model.scale.y / this.props.detector.units[2],
      detscalez: this.props.detector.model.scale.z / this.props.detector.units[2],
      detmat: this.props.detector.material,
      geomrty: this.props.detector.geometry,
      posme: this.props.detector.units[0],
      rotme: this.props.detector.units[1],
      scaleme: this.props.detector.units[2],
      showError: 'none',
      modeldata: [],
      display: 'none',
      filelabel: "",
      color: this.props.detector.model.color,
      options: []
    }
    this.materials = [];

  }
  updateMaterial(m) {
    this.setState({ detmat: m });
  }
  hexToRgb(hex) {
    hex = hex.substr(1);
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return new Vector3(r / 255, g / 255, b / 255);
  }
  componentDidMount() {

  }
  async showDialog(volumes) {
    this.setState({ showError: 'none' });
    this.setState({show: true});
    
    
    let opt = volumes.map(e=>{
    return <option value={e.name}>{e.name}</option>;
    });
    this.setState({options: opt});
  }
  hideDialog() {
    this.setState({ show: false });
  }
  convert(v){
    switch(v){
      case(".1"):
        return "mm";
      case("1"):
        return "cm";
      case("10"):
        return "dm";
      case("100"):
        return "m";
      default:
        return "cm";
    }
  }
  convertrot(v){
    if(v==1) return "rad";
    else return "deg";
  }
  static id = 0;
  render() {
    const handleDelete = () => {
      this.hideDialog();
      this.props.removebutton(this.props.detector, this.props.button.id);
    }
    let mat = [];
    if (MaterialList.get(this.state.detmat) == this.state.detmat) {
      mat = <th className="tablebutton" onClick={() => { this.table.current.showDialog(); }}><h1 style={{ "font-size": '10px', "font-weight": "bold" }}>{this.state.detmat}</h1></th>;
    } else {
      mat = <th className="tablebutton" onClick={() => { this.table.current.showDialog(); }}>
        <p style={{ "font-size": '12px' }}>{MaterialList.get(this.state.detmat).z}</p>
        <h1 style={{ "font-size": '15px', "font-weight": "bold" }}>{MaterialList.get(this.state.detmat).symbol}</h1>
        <p style={{ "font-size": '12px' }}>{MaterialList.get(this.state.detmat).name}</p></th>;
    }
    return <>
      <MaterialTable ref={this.table} updatematerial={this.updateMaterial}></MaterialTable>
      <ConfirmDialog ref={this.confirmDialog} title="Confirm" content="Are you sure you want to delete this component?" fun={handleDelete}></ConfirmDialog>
      <Modal show={this.state.show} onHide={() => { this.hideDialog(); }}>
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
                  value={this.state.detname}
                  onChange={(event) => { this.setState({ detname: event.target.value }); }} />
                </Col>
              </Row>
              <hr />
              <Row>
                Geometry
            </Row>

              <Form.Control as="select" value={this.state.geomrty} onChange={(evt) => {
                this.setState({ geomrty: evt.target.value });
                if (evt.target.value == "stl") this.setState({ display: 'block' });
                else this.setState({ display: 'none' });
              }}>

                {/* <option value="cube">Cube</option>
            <option value="cylinder">Cylinder</option>
            <option value="sphere">Sphere</option> */}
                {this.state.options}

                <option value="stl">Custom (.STL)</option>
              </Form.Control>

              <Form.File
                style={{ 'display': this.state.display }}
                id="stl-file"
                label={this.state.filelabel}
                data-browse="Open"
                custom
                onChange={(evt) => {


                  var r = new FileReader();

                  r.onload = () => {
                    var data = r.result;
                    this.setState({ modeldata: data });
                  }
                  r.readAsBinaryString(evt.target.files[0]);

                  let path = evt.target.value;
                  path = path.split("\\")[path.split("\\").length - 1];
                  this.setState({ filelabel: path });
                }}
              />
              <hr />
              <Row>Position</Row>
              <Form.Control as="select" style={{"width":"100px","margin-left":"-15px","margin-bottom":"10px"}} value={this.state.posme} onChange={(e)=>{this.setState({posme: e.target.value});}}>
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
                  value={this.state.detposx}
                  onChange={(event) => { this.setState({ detposx: event.target.value }); }} />
                </Col>
            y<Col><Form.Control
                  className="numspinner"
                  required
                  value='0'
                  type="number"
                  maxLength="10"
                  value={this.state.detposy}
                  onChange={(event) => { this.setState({ detposy: event.target.value }); }} />
                </Col>
            z<Col><Form.Control
                  className="numspinner"
                  required
                  value='0'
                  type="number"
                  maxLength="10"
                  value={this.state.detposz}
                  onChange={(event) => { this.setState({ detposz: event.target.value }); }} />
                </Col>
              </Row>
              <br />
              <hr />
              <Row>Rotation</Row>
              <Form.Control as="select" style={{"width":"100px","margin-left":"-15px","margin-bottom":"10px"}} value={this.state.rotme} onChange={(e)=>{this.setState({rotme: e.target.value});}}>
                <option value="0.0174">deg</option>
                <option value="1">rad</option>
                </Form.Control>
              <Row>
                x<Col><Form.Control
                  className="numspinner"
                  required
                  value='0'
                  type="number"
                  maxLength="10"
                  value={this.state.detrotx}
                  onChange={(event) => { this.setState({ detrotx: event.target.value }); }} />
                </Col>
                
            y<Col><Form.Control
                  className="numspinner"
                  required
                  value='0'
                  type="number"
                  maxLength="10"
                  value={this.state.detroty}
                  onChange={(event) => { this.setState({ detroty: event.target.value }); }} />
                </Col>
            z<Col><Form.Control
                  className="numspinner"
                  required
                  value='0'
                  type="number"
                  maxLength="10"
                  value={this.state.detrotz}
                  onChange={(event) => { this.setState({ detrotz: event.target.value }); }} />
                </Col>
              </Row>
              <br />
              <hr />
              <Row>Scale</Row>
              <Form.Control as="select" style={{"width":"100px","margin-left":"-15px","margin-bottom":"10px"}} value={this.state.scaleme} onChange={(e)=>{this.setState({scaleme: e.target.value});}}>
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
                  value={this.state.detscalex}
                  onChange={(event) => { this.setState({ detscalex: event.target.value }); }} />
                </Col>
            y<Col><Form.Control
                  className="numspinner"
                  required
                  value='0'
                  type="number"
                  maxLength="10"
                  value={this.state.detscaley}
                  onChange={(event) => { this.setState({ detscaley: event.target.value }); }} />
                </Col>
            z<Col><Form.Control
                  className="numspinner"
                  required
                  value='0'
                  type="number"
                  maxLength="10"
                  value={this.state.detscalez}
                  onChange={(event) => { this.setState({ detscalez: event.target.value }); }} />
                </Col>
              </Row>
              <br />
              <hr />
              <Row>
                <Form.Group controlId="exampleForm.SelectCustom">
                  <Form.Label>Material</Form.Label>
                  {mat}
                  <Button onClick={() => { this.table.current.showDialog(); }}>Choose</Button>
                </Form.Group>

              </Row>
              <hr />
              <Row>
                Color: <span style={{ 'padding-left': '20px' }}>
                  <input type="color"
                    onInput={(evt) => {
                      this.setState({ color: this.hexToRgb(evt.target.value) });
                    }}></input>
                </span>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            this.confirmDialog.current.showDialog();
          }} style={{ backgroundColor: 'red', color: 'white' }}>
            Delete
          </Button>
          <Button variant="primary" onClick={async () => {
            Logger.log(3, "Modified detector");

            this.hideDialog();
            if (this.state.geomrty == 'stl') {
              //To-DO
              //Create new volume if not in voluems
              this.state.geomrty = this.state.detname + "Volume";
              let modelData = STLParser.parseData(this.state.modeldata);
              this.props.createvolume(this.state.detname + "Volume",this.state.modeldata,this.state.detname + "Volume");
              this.props.detector.model = new Model(modelData.vertices, modelData.normals, this.props.canvas.current.gl);
              this.props.detector.model.drawLines = false;
            } else {
              let data = VolumeList.getVolume(this.state.geomrty).data;
              let modeldata = STLParser.parseData(data);
              this.props.detector.model = new Model(modeldata.vertices, modeldata.normals, this.props.canvas.current.gl);
              this.props.detector.model.drawLines = false;
            }

            this.props.detector.name = this.state.detname;

            this.props.detector.model.position.x = this.state.detposx * this.state.posme;
            this.props.detector.model.position.y = this.state.detposy * this.state.posme;
            this.props.detector.model.position.z = this.state.detposz * this.state.posme;

            this.props.detector.model.rotation.x = this.state.detrotx * this.state.rotme;
            this.props.detector.model.rotation.y = this.state.detroty * this.state.rotme;
            this.props.detector.model.rotation.z = this.state.detrotz * this.state.rotme;

            this.props.detector.model.scale.x = this.state.detscalex * this.state.scaleme;
            this.props.detector.model.scale.y = this.state.detscaley * this.state.scaleme;
            this.props.detector.model.scale.z = this.state.detscalez * this.state.scaleme;

            this.props.detector.material = this.state.detmat;

            this.props.detector.model.color = this.state.color;

            this.props.setname(this.state.detname);

            let text = "";

            let pm = UnitConverter.convertLength(this.state.posme);
            
            let rm = UnitConverter.convertAngle(this.state.rotme);
            let sm = UnitConverter.convertLength(this.state.scaleme);
            
            for (let i = 0; i < Parser.chunks.length; i++) {
              if (this.props.buttonid == Parser.chunks[i].id) {
                Parser.chunks[i].code = "\\Detector{\n" +
                  "\tname: " + '"' + this.state.detname + '";\n' +
                  "\tposition[" + pm + "]: " + this.state.detposx + ", " + this.state.detposy + ", " + this.state.detposz + ";\n" +
                  "\trotation[" + rm + "]: " + this.state.detrotx + ", " + this.state.detroty + ", " + this.state.detrotz + ";\n" +
                  "\tscale[" + sm + "]: " + this.state.detscalex + ", " + this.state.detscaley + ", " + this.state.detscalez + ";\n" +
                  "\tmaterial: " + '"' + this.state.detmat + '";\n' +
                  "\tgeometry: " + '"' + this.state.geomrty + '";\n' + 
                  "}\n";
              }
              text += Parser.chunks[i].code;
            }

            this.props.codeeditor.current.updateText(text);

            this.props.updatedetails(
              <>
                <Row>
                  <Col>Position: </Col>
                </Row>
                <Row>
            <Col>x: {this.state.detposx} {pm}</Col>
            <Col>y: {this.state.detposy} {pm}</Col>
                  <Col>z: {this.state.detposz} {pm}</Col>
                </Row>
                <Row>
                  <Col>Rotation: </Col>
                </Row>
                <Row>
                  <Col>x: {this.state.detrotx} {rm}</Col>
                  <Col>y: {this.state.detroty} {rm}</Col>
                  <Col>z: {this.state.detrotz} {rm}</Col>
                </Row>
                <Row>
                  <Col>Scale: </Col>
                </Row>
                <Row>
                  <Col>x: {this.state.detscalex} {sm}</Col>
                  <Col>y: {this.state.detscaley} {sm}</Col>
                  <Col>z: {this.state.detscalez} {sm}</Col>
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
