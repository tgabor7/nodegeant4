import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import {Navbar,Nav, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const Cookies = require('js-cookie');

function App() {
    const user = Cookies.get("login");
    const [projects, setProjects] = useState([]);    

    useEffect(async ()=>{
    let response = await fetch("http://localhost:9000/projectAPI/getNames/" + user, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'GET'
      });
      let json = await response.json();
      setProjects(json.map(e=>{return <div className="project" onClick={()=>{
        window.location = "/?projectid=" + e._id;
      }}
      >
        <span className="projectBody" style={{backgroundImage: "url(/folder.jpg)"}}></span>
        <span className="projectTitle">{e.name}</span></div>;}));
    },[]);
    return (<>
    <Navbar className="navbar" bg="light" variant="light" style={{position: 'fixed', 'z-index': '4'}}>
      <Nav className="mr-auto">
        <Navbar.Brand>Geant4</Navbar.Brand>
        <p style={user == undefined ? {"display":"none"}:{"fontSize":"20px","display":"block","position":"absolute","right":"10%"}}>Logged in as {user}! </p>
        <Button style={user == undefined ? {"display":"block","position":"absolute","right":"2%"}:{"display":"none"}} onClick={()=>{window.location = "../Login"}}>Login</Button>
        <Button style={user == undefined ? {"display":"none"}:{"display":"block","backgroundColor":"#ff0000","position":"absolute","right":"2%"}} onClick={()=>{Cookies.remove("login"); window.location.reload()}}>Logout</Button>
        </Nav>
      </Navbar>
    <div className="App">
      <p>asd</p>
      <div className="project" onClick={()=>{
        window.location = "/";
      }}
      ><span className="projectBody" style={{backgroundImage: "url(/create.jpg)"}}></span>
        <span className="projectTitle">Create New Project</span></div>
      {projects}
    </div>
    </>);
}

export default App;
