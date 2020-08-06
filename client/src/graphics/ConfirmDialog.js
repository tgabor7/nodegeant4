import React, { Component, createRef } from 'react';
import '../App.css';

import {Button, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class DetectorDialog extends Component{
  constructor(props){
    super(props);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.state = {show: false }
     
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
              this.props.fun();
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
