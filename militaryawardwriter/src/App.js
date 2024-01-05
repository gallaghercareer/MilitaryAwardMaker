import React, { useState, useEffect } from 'react';
import './Css/app.css';
import {Account, AccountContext} from './Context/Account';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import ChatToAiPage from './Pages/CoastGuard/ChatToAiPage';
import Landing from './Pages/Landing';
import CoastGuardHomePage from './Pages/CoastGuard/CoastGuardHomePage';
import NomineeInfoFormPage from './Pages/CoastGuard/NomineeInfoFormPage';
function App() {
 
  return (
    <Account>

    <Router>
   
    <Navbar/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/coastguard" element={<CoastGuardHomePage />} />
        <Route path="/nomineeinfo" element={<NomineeInfoFormPage />} />
        <Route path="/chattoopenai" element={<ChatToAiPage/>} />

      </Routes>
  </Router>
  </Account>

  
  );
}

export default App;
