import logo from './logo.svg';
import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import {Navbar,Nav, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConfirmDialog from './ConfirmDialog';

// const Cookies = require('js-cookie');

function App() {
    const user = window.sessionStorage.getItem('user');
    const [projects, setProjects] = useState([]);    
    const url = "https://radsim.inf.elte.hu/";
    const dialog = useRef(null);
    
    const updateProjects = async ()=>{

      if(user === null) return;
      let response = await fetch(url + "projectAPI/getNames/" + user, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'auth-token': window.sessionStorage.getItem('auth')
          },
          method: 'GET'
        });
        let json = await response.json();
        setProjects(json.map(e=>{return <div className="project" onClick={()=>{
          window.location = "/?projectid=" + e._id;
        }}
        >
          <span className="projectBody" style={{backgroundImage: "url(/folder.jpg)"}}></span>
          <span className="projectTitle">{e.name}</span>
          <span className="deleteProject" onClick={(ev)=>{
            dialog.current.showDialog(()=>{deleteProject(e._id);});
            ev.stopPropagation();
          }}>X</span></div>;}));
    }

    const deleteProject = async (n)=>{
      await fetch(url + "projectAPI/delete/", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'auth-token': window.sessionStorage.getItem('auth')
        },
        body: JSON.stringify({id: n}),
        method: 'POST'
      });
      updateProjects();
    } 

    useEffect(updateProjects,[]);
    //if(user === null) return (<>You are not logged in!</>);
    return (<>
    <ConfirmDialog ref={dialog} fun={()=>{}} title="Delete project" content="Are you sure you want to delete this project?"></ConfirmDialog>
    <Navbar className="navbar" bg="light" variant="light" style={{position: 'fixed', 'z-index': '4'}}>
      <Nav className="mr-auto">
        <Navbar.Brand>Geant4</Navbar.Brand>
        <p style={user == undefined ? {"display":"none"}:{"fontSize":"20px","display":"block","position":"absolute","right":"10%"}}>Logged in as {user}! </p>
        <Button style={user == undefined ? {"display":"block","position":"absolute","right":"2%"}:{"display":"none"}} onClick={()=>{
          window.location = "../Login"
          }}>Login</Button>
        <Button style={user == undefined ? {"display":"none"}:{"display":"block","backgroundColor":"#ff0000","position":"absolute","right":"2%"}} onClick={()=>{
          window.sessionStorage.removeItem('auth');
          window.sessionStorage.removeItem('user');
          window.location = "../Login";
        }}>Logout</Button>
        </Nav>
      </Navbar>
    <div className="App">
      <p>asd</p>
      <div className="project" onClick={()=>{
        window.location = "/";
      }}
      ><span className="projectBody" style={{backgroundImage: "url(/create.jpg)"}}></span>
        <span className="projectTitle">Create New Project</span>
        </div>
      {projects}
    </div>
    </>);
}

export default App;
