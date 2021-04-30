import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';

// const Cookies = require("js-cookie");

function App() {
  const [page, setPage] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmEmailError, setConfirmEmailError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const url = "http://radsim.inf.elte.hu/";

  let validateUsername = ()=>{
    if(username == ""){
      setNameError("Enter username");
      return false;
    }else{
      setNameError("");
      return true;
    }
  }

  let validateEmail = ()=>{
    if(email == "" || !email.includes('@')){
      setEmailError("Enter a valid email.");
      return false;
    }else{
      setEmailError("");
      return true;
    }
  }

  let validatePassword = ()=>{
    if(password == ""){
      setPasswordError("Enter password");
      return false;
    }else if(password.length < 8){
      setPasswordError("Password needs to be at least 8 characters");
      return false;
    }else{
      setPasswordError("");
      return true;
    }
  }
  let login = ()=>{
    if(!validate()) {
      return;
    }
    fetch(url + 'userAPI/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ name: username, password: password })
    })
      .then(response => response.text())
      .then(response => {

        if(response !== "Failed to login!" && response !== 'User not found'){
          //Cookies.set('login', username, { expires: 1 });
          window.sessionStorage.setItem('auth', response);
          window.sessionStorage.setItem('user', username);
          window.location = "/";
        } else{
          setPasswordError(response);
        } 
      });
  }
  let validate = ()=>{
    return validateUsername() || validatePassword();
  }
  if(window.sessionStorage.getItem('auth') != undefined){

    return (<div>
      You are already signed in!
    </div>)
  }
  if(page === 'login'){
    return (<><div style={{backgroundImage: "url(/background.jpg)"}} className="body" onMouseMove={e=>{
      e.target.style.transform = "translate(" + e.clientX / 100.0 + "px, " + e.clientY / 100.0 + "px)"
      e.target.style.overflow = "hidden";
    }}></div>
    <div className="center">
      <h1>Login</h1>
      <form method="post">
        <div className="text_field" style={nameError != "" ? {"borderBottom": "2px solid #ff0000"}: {}}>
          <input type="text" required value={username} onChange={e=>{setUsername(e.target.value);}} onBlur={()=>{validateUsername();}} maxLength="12">
          </input>
          <span></span>
          <label>Username</label>
        </div>
        <div className="error">{nameError}</div>
        <div className="text_field" style={passwordError != "" ? {"borderBottom": "2px solid #ff0000"}: {}}>
          <input type="password" onKeyPress={e=>{
            if(e.key == 'Enter')login();
          }}required value={password} onChange={e=>{setPassword(e.target.value);}} onBlur={()=>{validatePassword();}} maxLength="16">
          </input>
          <span></span>
          <label>Password</label>
        </div>
        <div className="error">{passwordError}</div>
        <div className="pass">Forgot password?</div>
        <input type="button" value="Login" onClick={()=>{
          login();
        }}></input>
        <div className="signup_link">
          Don't have an account? <div className="register_link" onClick={()=>{setPage("register")}}>Register</div>
        </div>
      </form>
    </div></>
  );
  }else{
    return (<div className="body">
    <div className="center">
      <h1>Register</h1>
      <form method="post">
      <div className="text_field" style={nameError != "" ? {"borderBottom": "2px solid #ff0000"}: {}}>
          <input type="text" required value={username} onChange={e=>{setUsername(e.target.value);}} onBlur={()=>{validateUsername();}} maxLength="12">
          </input>
          <span></span>
          <label>Username</label>
        </div>
        <div className="error">{nameError}</div>
        {/* <div className="text_field" style={emailError != "" ? {"borderBottom":"2px solid #ff0000"}:{}}>
          <input type="text" required value={email} onChange={e=>{setEmail(e.target.value);}} onBlur={()=>{validateEmail();}} maxLength="20">
          </input>
          <span></span>
          <label>e-mail</label>
        </div>
        <div className="error">{emailError}</div>
        <div className="text_field" style={confirmEmailError != "" ? {"borderBottom": "2px solid #ff0000"}: {}}>
          <input type="text" required onBlur={e=>{
            if(e.target.value != email){
             setConfirmEmailError("confirm email has to be the same as email");
          }else{
              setConfirmEmailError("");
          }}}>
          </input>
          <span></span>
          <label>Confirm e-mail</label>
        </div>
        <div className="error">{confirmEmailError}</div> */}
        <div className="text_field" style={passwordError != "" ? {"borderBottom": "2px solid #ff0000"}: {}}>
          <input type="password" required value={password} onChange={e=>{setPassword(e.target.value);}} onBlur={()=>{validatePassword();}} maxLength="16">
          </input>
          <span></span>
          <label>Password</label>
        </div>
        <div className="error">{passwordError}</div>
        <div className="text_field" style={confirmPasswordError != "" ? {"borderBottom": "2px solid #ff0000"}: {}}>
          <input type="password" required onBlur={e=>{
            if(e.target.value != password){
             setConfirmPasswordError("confirm password has to be the same as password");
          }else{
            setConfirmPasswordError("");
          }}}>
          </input>
          <span></span>
          <label>Confirm Password</label>
        </div>
        <div className="error">{confirmPasswordError}</div>
        <div className="pass">Forgot password?</div>
        <input type="button" value="Register" onClick={()=>{
          if(validate) fetch(url + 'userAPI/register', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ name: username, password: password })
          })
            .then(response => response.text())
            .then(response => {
              if(response !== "Username taken") window.location = "/dashboard";
              //alert(response);
            });
        }}></input>
        <div className="signup_link">
          Already have an account? <div className="register_link" onClick={()=>{setPage("login")}}>Login</div>
        </div>
      </form>
    </div>
    </div>);
  }
  
}

export default App;
