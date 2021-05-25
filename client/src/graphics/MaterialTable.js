import React, { Component, createRef } from 'react';
import '../App.css';

import {Modal, Button, Table, Container, Col, FormControl, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MaterialList from '../detector/MaterialList';

/*
React component for showing the table of materials from which the users can choose from
*/
class MaterialTable extends Component{
  constructor(props){
    super(props);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.state = {show: false, materials: [], table: "elements", element: true, compound: false};
    this.changeTable = this.changeTable.bind(this);
  }
  changeTable(s){
    if(s=="elements"){
      this.setState({element: true, compound: false});
    }
    if(s=="compounds"){
      this.setState({element: false, compound: true});
    }
    this.setState({table: s});
    this.updateMaterials("", s);
  }
  componentDidMount(){
   this.updateMaterials("", this.state.table);
    
  }
  showDialog(){
    this.setState({show: true});
    this.updateMaterials("", "elements");
    }
  hideDialog(){
    this.setState({show: false});
  }
  updateMaterials(s, t){
    if(t == "elements"){
      let list = MaterialList.materials.filter(x => x.name.toUpperCase().includes(s.toUpperCase()) || x.symbol.toUpperCase().includes(s.toUpperCase()));
      let tmp_mats = [];
      let rows = Math.ceil(list.length / 5);    
      for(let i = 0;i<rows;i++){
        let tmp = [];
        for(let j = Math.floor((i/rows)*list.length);j<Math.floor((i/rows)*list.length)+5;j++){
              if(list[j] === undefined) break;
              tmp.push(<th className="tablebutton" onClick={e=>{this.props.updatematerial(list[j].symbol);this.hideDialog();}}>
                <p style={{"font-size":'12px'}}>{list[j].z}</p>
                <h1 style={{"font-size":'15px',"font-weight":"bold"}}>{list[j].symbol}</h1>
                <p style={{"font-size":'12px'}}>{list[j].name}</p>
                </th>);
        }
        tmp_mats.push(<tr>{tmp}</tr>);
      }
      this.setState({materials: tmp_mats});
    }
    if(t == "compounds"){
      let list = MaterialList.compounds.filter(x => x.toUpperCase().includes(s.toUpperCase()));
      let tmp_mats = [];
      let rows = Math.ceil(list.length / 3);    
      for(let i = 0;i<rows;i++){
        let tmp = [];
        for(let j = Math.floor((i/rows)*list.length);j<Math.floor((i/rows)*list.length)+3;j++){
              if(list[j] === undefined) break;
              tmp.push(<th className="tablebutton" onClick={e=>{this.props.updatematerial(list[j]);this.hideDialog();}}>
                <h1 style={{"font-size":'10px',"font-weight":"bold"}}>{list[j]}</h1>
                </th>);
        }
        tmp_mats.push(<tr>{tmp}</tr>);
      }
      this.setState({materials: tmp_mats});
    }
    
  }
  render(){
    

    return <>
        <Modal show={this.state.show} onHide={()=>{this.hideDialog();}}>
        <Modal.Header closeButton>
          <Modal.Title>Choose a material</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FormControl type="text" onChange={v=>{this.updateMaterials(v.target.value, this.state.table);}}placeholder="Search" style={{"margin":"20px","width":"200px"}}/>
        <Row style={{"margin" : "auto"}}>
        <Button style={{"background-color":"gray", "color": "white", "border-radius" : "0", "border": "1px solid black"}} disabled={this.state.element} onClick={()=>{this.changeTable("elements");}}>Elements</Button>
        <Button style={{"background-color":"gray", "color": "white", "border-radius" : "0", "border": "1px solid black"}} disabled={this.state.compound} onClick={()=>{this.changeTable("compounds");}}>Compounds</Button>
        </Row>
            <Container style={{"margin" : "auto"}}>
             {this.state.materials}

            </Container>
            
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
    </> 
  }
}

export default MaterialTable;
