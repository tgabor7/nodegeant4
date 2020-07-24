import React, { Component, createRef } from 'react';
import {Button, Nav, Navbar, FormControl, Container,Col,Row, Form, Dropdown, OverlayTrigger, Tooltip, Modal, ProgressBar, Spinner} from 'react-bootstrap';

class SpectrumDialog extends Component {
    constructor(props){
        super(props);
        this.state = {numberofparticles: 1000, detector: 0,show: false, loading: false, now: 60, binsize: 1}
        this.hideDialog = this.hideDialog.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.setLoading = this.setLoading.bind(this);
    }
    hideDialog(){
        this.setState({show: false});
    }
    setLoading(b){
        this.setState({loading: b});
    }
    showDialog(){
        this.setState({show: true, loading: false});
    }
    render(){
        if(this.state.loading){
            return <Modal show={this.state.show}>
        <Modal.Header closeButton>
          <Modal.Title>Configure Spectroscopy</Modal.Title>
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
          
        </Modal.Footer>
      </Modal>
        }
        let options = [];
        for(let i = 0;i<this.props.detectors.length;i++){
            options.push(<option value={this.props.detectors[i].id}>{this.props.detectors[i].name}</option>)
        }

        return <>
        <Modal show={this.state.show} onHide={()=>{this.hideDialog();}}>
        <Modal.Header closeButton>
          <Modal.Title>Configure Spectroscopy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row style={{margin: '5px'}}>
                Select detector 
            </Row>
        <Form>
        <Form.Control as="select" value={this.state.detector} onChange={(evt)=>{this.setState({detector: evt.target.value});}}>
            {options}
            </Form.Control>
            <hr />
            <Row style={{margin: '5px'}}>
                Number of particles
            </Row>
        <Form.Control
        className="numspinner"
        required
        value='0'
        type="number"
        maxLength="10"
        value = {this.state.numberofparticles}
        onChange={(event)=>{this.setState({numberofparticles: event.target.value});}} />
        <hr />
        <Row style={{margin: '5px'}}>
                Bin size
            </Row>
            <Row>
            <Form.Control
        className="numspinner"
        required
        value='0'
        type="number"
        maxLength="10"
        value = {this.state.binsize}
        style={{'width':'20%','margin':'15px'}}
        onChange={(event)=>{this.setState({binsize: event.target.value});}} />
        <span style={{'padding':'20px'}}>
        keV

        </span>
            </Row>
        
        </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={()=>{this.hideDialog();}}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=>{
              this.setLoading(true);
              this.props.runsim(this.state.numberofparticles, this.state.detector, this.hideDialog, this.state.binsize);}}>
            Run
          </Button>
        </Modal.Footer>
      </Modal>
    </> 
    }
}
export default SpectrumDialog;