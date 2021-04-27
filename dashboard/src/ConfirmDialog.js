import React, { Component } from 'react';
import './App.css';

import {Button, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class DetectorDialog extends Component{
  constructor(props){
    super(props);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.state = {show: false,func: undefined }
     
  }
  componentDidMount(){
   
    
  }
  showDialog(func){
      
    this.setState({show: true, func: func});
    }
  hideDialog(){
    this.setState({show: false});
  }
  
  render(){
    
    return <>
        <Modal show={this.state.show} onHide={()=>{this.hideDialog();}}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {this.props.content}
      
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{this.hideDialog();}}>
            No
          </Button>
          <Button variant="primary" onClick={()=>{
              this.state.func();
              this.hideDialog();
          }}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </> 
  }
}

export default DetectorDialog;
