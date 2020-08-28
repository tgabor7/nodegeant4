import React, { Component, createRef } from 'react';
import '../App.css';

import { Button, Nav, Navbar, FormControl, Container, Col, Row, Form, Dropdown, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class VolumeEditButton extends Component {
  constructor(props) {
    super(props);
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);

    this.state = {
      show: false
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
    </>
  }
}

export default VolumeEditButton;
