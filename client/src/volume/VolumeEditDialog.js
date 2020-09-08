import React, { Component, createRef } from 'react';
import '../App.css';

import { Button, Nav, Navbar, FormControl, Container, Col, Row, Form, Dropdown, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class VolumeEditDialog extends Component {
  constructor(props) {
    super(props);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);

    this.state = {
      show: false,
      name: this.props.name,
      filelabel: this.props.filelabel,
      modeldata: this.props.modeldata
    }

  }
  componentDidMount() {

  }
  async showDialog() {
    this.setState({ show: true });

  }
  hideDialog() {
    this.setState({ show: false });
  }

  render() {
    return <>
      <Modal show={this.state.show} onHide={() => { this.hideDialog(); }}>
        <Modal.Header closeButton>
          <Modal.Title>Modify geometry</Modal.Title>
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
            if (this.state.modeldata.length == 0) {
              alert("Select an stl file!");
              return;
            }
            this.hideDialog();

            this.props.volume.name = this.state.name;
            this.props.setname(this.state.name);
            this.props.volume.data = this.state.modeldata;
            

          }}>
            Modify
  </Button>
        </Modal.Footer>
      </Modal>
    </>
  }
}

export default VolumeEditDialog;
