import React, { Component, createRef } from 'react';
import '../App.css';

import { Button, Modal, Row, Col, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class VolumeSelectDialog extends Component {
    constructor(props) {
        super(props);
        this.showDialog = this.showDialog.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.addVolume = this.addVolume.bind(this);
        this.removeVolume = this.removeVolume.bind(this);

        this.state = {
            show: false,
            volumes: [],
            fixed: [],
            showConfirm: 'none',
            fun: null
        }

    }
    componentDidMount() {
    }
    /*Updates label of volume */
    updateVolume(v, l){
        let res = this.state.fixed;
        for(let i = 0;i<this.state.fixed.length;i++){
            if(this.state.fixed[i].volume == v){
                res[i].label = l;
            }
        }
        this.setState({fixed: res});
    }
    removeVolume(v) {
        let res = this.state.volumes;
        for (let i = 0; i < this.state.volumes.length; i++) {
            if (this.state.volumes[i] == v) {
                res.splice(i, 1);
            }
        }
        this.setState({ volumes: res });
    }
    addVolume(v, label, data) {
        let res = this.state.fixed;
        res.push({volume: v,label: label,data: data});
        this.setState({ fixed: res });
        if(this.state.volumes.length == 0){
            this.setState({showConfirm: 'block'});
        }
    }
    showDialog(volumes, f) {
        this.setState({ show: true, fun: f });
        this.setState({ volumes: volumes, fixed: [], showConfirm: 'none'});
    }
    hideDialog() {
        this.setState({ show: false });
    }

    static id = 0;
    render() {
        const vs = this.state.volumes.map(e => {
            return <>
                <Row style={{ "padding": "10px", "border": "solid 1px black" }}>
                    <Col>
                        {e}
                    </Col>
                    <Col>
                    <Form.File
                        id="stl-file"
                        data-browse="Open"
                        label=""
                        custom
                        onChange={(evt) => {
                            

                            var r = new FileReader();

                            r.onload = () => {
                                var data = r.result;
                                this.addVolume(e, path, data);
                            }
                            r.readAsBinaryString(evt.target.files[0]);

                            let path = evt.target.value;
                            path = path.split("\\")[path.split("\\").length - 1];
                            this.setState({ filelabel: path });
                            this.removeVolume(e);

                            
                        }}
                    />
                    </Col>
                </Row></>;
        });
        const fs = this.state.fixed.map((e, i) => {
            return <>
                <Row style={{ "padding": "10px", "border": "solid 1px black" }}>

                    <Col>
                        {e.volume}
                    </Col>
                    <Col>
                    <Form.File
                        id="stl-file"
                        data-browse="Open"
                        label={e.label}
                        custom
                        onChange={(evt) => {
                            

                            var r = new FileReader();

                            r.onload = () => {
                                var data = r.result;
                                this.setState({ modeldata: data });
                            }
                            r.readAsBinaryString(evt.target.files[0]);

                            let path = evt.target.value;
                            path = path.split("\\")[path.split("\\").length - 1];
                            this.setState({ filelabel: path });
                            
                            this.updateVolume(e.volume, path);
                        }}
                    />
                    </Col>
                </Row></>;
        });
        return <>
            <Modal show={this.state.show} onHide={() => { this.hideDialog(); }}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose a geometry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Container>
                            Missing volumes
                           {vs}
                            < hr />
                           Fixed volumes
                           {fs}
                        </Container>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { this.hideDialog(); }}>
                        Cancel
          </Button>
                    <Button 
                    style={{"display":this.state.showConfirm}}
                    variant="primary" onClick={() => {
                        if (this.state.volumes != 0) {
                            alert("Select an stl file!");
                            return;
                        }
                        this.hideDialog();
                        for(let i = 0;i<this.state.fixed.length;i++){
                            this.props.createbutton(this.state.fixed[i].volume, this.state.fixed[i].data);
                        }
                        this.state.fun();
                    }}>
                        OK
          </Button>
                </Modal.Footer>
            </Modal>
        </>
    }
}

export default VolumeSelectDialog;
