import React, { Component, createRef } from 'react';
import '../App.css';

import {Modal, Button, Table, Container, Col, FormControl, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MaterialList from '../detector/MaterialList';

class SourceTable extends Component{
  constructor(props){
    super(props);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.state = {show: false, materials: []};
  }
  componentDidMount(){
   this.updateMaterials("", this.state.table);
    
  }
  showDialog(){
    this.setState({show: true});
    }
  hideDialog(){
    this.setState({show: false});
  }
  updateMaterials(s, t){
      let list = MaterialList.sources.filter(x => x.toUpperCase().includes(s.toUpperCase()));
      let tmp_mats = [];
      let rows = Math.ceil(list.length / 5);    
      for(let i = 0;i<rows;i++){
        let tmp = [];
        for(let j = Math.floor((i/rows)*list.length);j<Math.floor((i/rows)*list.length)+5;j++){
              if(list[j] === undefined) break;
              tmp.push(<th className="tablebutton" onClick={e=>{this.props.updatematerial(list[j]);this.hideDialog();}}>
                
                <h1 style={{"font-size":'15px',"font-weight":"bold"}}>{list[j]}</h1>
               
                </th>);
        }
        tmp_mats.push(<tr>{tmp}</tr>);
      }
      this.setState({materials: tmp_mats});
    
    
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

export default SourceTable;
