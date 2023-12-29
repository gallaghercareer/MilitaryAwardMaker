import React, { useState, useEffect } from 'react';
import './App.css';
import { Account, AccountContext } from './Components/Account';
import LoginHostedUI from './Components/LoginHostedUI';
import CallLambda from './Components/CallLambda'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import WriteAward from './Components/WriteAward';
function App() {
 
  return (
    <Account>

    <Router>
    <Navbar/>
      <Routes>
        <Route  exact path="/" element={<LoginHostedUI />} />
        <Route path="/formfill" element={<LoginHostedUI />} />
        <Route path="/writeaward" element={<WriteAward/>} />

      </Routes>
  </Router>
    </Account>
  );
}

export default App;
