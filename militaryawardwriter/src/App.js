import React, { useState, useEffect } from 'react';
import Register from './Components/Register';
import './App.css';
import Login from './Components/Login';
import EmailValidation from './Components/confirmRegistration';
import { Account, AccountContext } from './Components/Account';
import Status from './Components/Status';
import Settings from './Components/Settings';
import LoginHostedUI from './Components/LoginHostedUI';
import LogoutUser from './Components/LogoutUser';
import CallLambda from './Components/CallLambda'; 
function App() {
 
  return (
    
    <Account>
      <Status />
    <Login />
    <br></br>
    <Settings/>
    <br></br>
    <LoginHostedUI />
    <br></br>
    <LogoutUser/>
    <br></br>
    <CallLambda/>
    </Account>
  );
}

export default App;
