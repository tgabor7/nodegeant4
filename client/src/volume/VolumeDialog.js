import React, { Component, createRef } from 'react';
import '../App.css';

import { Button, Modal, Row, Col, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Error from '../utils/Error';

class VolumeDialog extends Component {
    constructor(props) {
        super(props);
        this.showDialog = this.showDialog.bind(this);
        this.hideDialog = this.hideDialog.bind(this);
        this.state = {
            show: false,
            name: "model",
            filelabel: "",
            modeldata: []
        }

    }
    componentDidMount() {


    }
    showDialog(name) {
        this.setState({ show: true });
        if(name==undefined) return;
        this.setState({name: name});
        
    }
    hideDialog() {
        this.setState({ show: false });
    }

    static id = 0;
    render() {
        return <>
            <Modal show={this.state.show} onHide={() => { this.hideDialog(); }}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose a geometry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Container>
                        Name
                            <Row>
                                
                       
                                <Col><Form.Control
                                    className="name"
                                    required
                                    type="text"
                                    maxLength="10"
                                    value={this.state.name}
                                    onChange={(event) => { this.setState({ name: event.target.value }); }} />
                                </Col>
                            </Row>
                        <hr />

                            STL File
                            <Form.File
                                id="stl-file"
                                label={this.state.filelabel}
                                data-browse="Open"
                                custom
                                onChange={(evt) => {


                                    var r = new FileReader();

                                    r.onload = () => {
                                        var data = r.result;
                                        this.setState({ modeldata: data });
                                        if(this.state.filelabel.split(".")[this.state.filelabel.split(".").length - 1].toUpperCase() !== 'STL'){
                                            //To do error handling
                                            this.setState({filelabel: "",modeldata: []});
                                            Error.showError("Bad format","Select an .stl file!");
                                        }
                                    }
                                    r.readAsBinaryString(evt.target.files[0]);

                                    let path = evt.target.value;
                                    path = path.split("\\")[path.split("\\").length - 1];
                                    this.setState({ filelabel: path });
                                    
                                }}
                            />
                        </Container>
                   </Form>
                </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { this.hideDialog(); }}>
                            Cancel
          </Button>
                        <Button variant="primary" onClick={() => {
                            if(this.state.modeldata.length == 0){
                                Error.showError("No file selected","Select an .stl file!");
                                return;
                            }
                            this.hideDialog(); 
                            this.props.createbutton(this.state.name, this.state.modeldata, this.state.filelabel);
                        }}>
                            Create
          </Button>
                    </Modal.Footer>
            </Modal>
        </>
    }
}

export default VolumeDialog;