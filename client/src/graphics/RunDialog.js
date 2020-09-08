import React, { Component, createRef } from 'react';
import {Button, Nav, Navbar, FormControl, Container,Col,Row, Form, Dropdown, OverlayTrigger, Tooltip, Modal, Spinner} from 'react-bootstrap';

class RunDialog extends Component {
    constructor(props){
        super(props);
        this.state = {numberOfParticles: 100,show: false, loading: false}
        this.hideDialog = this.hideDialog.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.setLoading = this.setLoading.bind(this);
    }
    hideDialog(){
        this.setState({show: false});
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
            <Spinner animation="border" role="status">
            </Spinner>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={()=>{this.hideDialog();}}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>{
            this.props.runsim(this.state.numberOfParticles);}}>
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
        onChange={(evt)=>{this.setState({numberOfParticles: evt.target.value});}}>
        </Form.Control>
    </Form>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="secondary" onClick={()=>{this.hideDialog();}}>
        Cancel
      </Button>
      <Button variant="primary" onClick={()=>{
        this.setLoading(true);
        this.props.runsim(this.state.numberOfParticles, this.hideDialog);}}>
        Run
      </Button>
    </Modal.Footer>
  </Modal>
</> 
    
      
        
    }
}
export default RunDialog;