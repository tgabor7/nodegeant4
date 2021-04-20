import React, { Component, createRef } from 'react';
import '../App.css';

import {Button, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class DetectorDialog extends Component{
  constructor(props){
    super(props);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.state = {show: false,name: "Untitled"}
     
  }
  componentDidMount(){
   
    
  }
  showDialog(){
      
    this.setState({show: true});
    }
  hideDialog(){
    this.setState({show: false});
  }
  
  render(){
    
    return <>
        <Modal show={this.state.show} onHide={()=>{this.hideDialog();}}>
        <Modal.Header closeButton>
          <Modal.Title>Save as</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Project name: <input type="text" className="saveName" value={this.state.name} onChange={e=>{
            this.setState({name: e.target.value});
        }} ></input>
      
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{this.hideDialog();}}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>{
              this.props.saveonline(this.state.name);
              this.hideDialog();
          }}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </> 
  }
}

export default DetectorDialog;
