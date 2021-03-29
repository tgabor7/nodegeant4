import React, { Component, createRef } from 'react';
import {Button, Nav, Navbar, FormControl, Container,Col,Row, Form, Dropdown, OverlayTrigger, Tooltip, Modal, Spinner, ProgressBar} from 'react-bootstrap';

const User = require("../utils/User");

class RunDialog extends Component {
    constructor(props){
        super(props);
        this.state = {numberOfParticles: 100,show: false, loading: false, progress: 0}
        this.hideDialog = this.hideDialog.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.setLoading = this.setLoading.bind(this);
        this.startProgress = this.startProgress.bind(this);
        this.id = 0;
    }
    hideDialog(){
        this.setState({show: false});
        clearInterval(this.id);
    }
    startProgress(){
      this.setState({progress: 0});
      this.id = setInterval(()=>{
        fetch('http://localhost:9000/gammaAPI/progress', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ id: User.process_id})
        })
          .then(response => response.text())
          .then(response => {
            console.log(response);
            if(response.length > 0) this.setState({progress: parseInt(response)});
          });
        
      },100);
    }
    showDialog(){
        this.setState({show: true,loading: false});
    }
    setLoading(b){
      this.setState({loading: b});
    }
    render(){
      if(this.state.loading){
        return <>
        <Modal show={this.state.show} onHide={()=>{this.hideDialog();}}>
        <Modal.Header closeButton>
          <Modal.Title>Run simulation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row style={{margin: '5px'}}>
                Runnig simulation
            </Row>
            <ProgressBar now={this.state.progress} label={this.state.progress + "%"}></ProgressBar>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={()=>{this.hideDialog();}}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>{
            this.props.runsim(this.state.numberOfParticles);
            }}>
            Run
          </Button>
        </Modal.Footer>
      </Modal>
    </> 
      }
        return <>
    <Modal show={this.state.show} onHide={()=>{this.hideDialog();}}>
    <Modal.Header closeButton>
      <Modal.Title>Run simulation</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Row style={{margin: '5px'}}>
            Number of particles: 
        </Row>
    <Form onSubmit={e=>{e.preventDefault();}}>
        <Form.Control required
        type="number"
        value={this.state.numberOfParticles}
        onChange={(evt)=>{if(evt.target.value.length < 6) this.setState({numberOfParticles: evt.target.value});}}>
        </Form.Control>
    </Form>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="secondary" onClick={()=>{this.hideDialog();}}>
        Cancel
      </Button>
      <Button variant="primary" onClick={()=>{
        this.setLoading(true);
        this.startProgress();
        this.props.runsim(this.state.numberOfParticles, this.hideDialog);}}>
        Run
      </Button>
    </Modal.Footer>
  </Modal>
</> 
    
      
        
    }
}
export default RunDialog;