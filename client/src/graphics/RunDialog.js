import React, { Component, createRef } from 'react';
import {Button, Nav, Navbar, FormControl, Container,Col,Row, Form, Dropdown, OverlayTrigger, Tooltip, Modal} from 'react-bootstrap';

class RunDialog extends Component {
    constructor(props){
        super(props);
        this.state = {numberOfParticles: 1,show: false}
        this.hideDialog = this.hideDialog.bind(this);
        this.showDialog = this.showDialog.bind(this);
    }
    hideDialog(){
        this.setState({show: false});
    }
    showDialog(){
        this.setState({show: true});
    }
    render(){
        return <>
        <Modal show={this.state.show} onHide={()=>{this.hideDialog();}}>
        <Modal.Header closeButton>
          <Modal.Title>Run simulation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row style={{margin: '5px'}}>
                Number of particles: 
            </Row>
        <Form>
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
          <Button variant="primary" onClick={()=>{this.props.runsim(this.state.numberOfParticles);}}>
            Run
          </Button>
        </Modal.Footer>
      </Modal>
    </> 
    }
}
export default RunDialog;