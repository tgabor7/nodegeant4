import React, { Component, createRef } from 'react';
import '../App.css';

import {Button, Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class DetectorDialog extends Component{
  constructor(props){
    super(props);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
    this.state = {show: false,content: this.props.content,title: this.props.title }
    this.setTitle = this.setTitle.bind(this);
    this.setContent = this.setContent.bind(this);
  }
  componentDidMount(){
   
    
  }
  setTitle(t){
    this.setState({title: t});
  }
  setContent(c){
      this.setState({content: c});
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
          <Modal.Title>{this.state.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {this.state.content}
      
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={()=>{
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
