import React, {Component } from "react";
import {Modal} from 'react-bootstrap';
import ReactDOM from "react-dom";
import Graph from "react-graph-vis";

class GraphDialog extends Component {
    constructor(props){
        super(props);
        this.state = {show: false}
    }
    hideDialog(){
        this.setState({show: false});
    }
    showDialog(){
        this.setState({show: true});
    }
    render(){
        const graph = {
            nodes: [
              { id: 1, label: "Node 1", title: "node 1 tootip text" },
              { id: 2, label: "Node 2", title: "node 2 tootip text" },
              { id: 3, label: "Node 3", title: "node 3 tootip text" },
              { id: 4, label: "Node 4", title: "node 4 tootip text" },
              { id: 5, label: "Node 5", title: "node 5 tootip text" }
            ],
            edges: [
              { from: 1, to: 2 },
              { from: 1, to: 3 },
              { from: 2, to: 4 },
              { from: 2, to: 5 }
            ]
          };
         
          const options = {
            layout: {
              hierarchical: true
            },
            edges: {
              color: "#000000"
            },
            height: "500px"
          };
         
          const events = {
            select: function(event) {
              var { nodes, edges } = event;
            }
          };
          return (
          <Modal show={this.state.show} onHide={()=>{this.hideDialog();}}>
        <Modal.Header closeButton>
          <Modal.Title>Run simulation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Graph
              graph={graph}
              options={options}
              events={events}
              getNetwork={network => {
                //  if you want access to vis.js network api you can set the state in a parent component using this property
              }}
            />
        </Modal.Body>
        </Modal>
            );
    }
}

export default GraphDialog;