import React, { useState, useEffect } from 'react';
import './Css/app.css';
import {Account, AccountContext} from './Context/Account';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import ChatToAiPage from './Pages/CoastGuard/ChatToAiPage';
import Landing from './Pages/Landing';
import CoastGuardHomePage from './Pages/CoastGuard/CoastGuardHomePage';
import NomineeInfoFormPage from './Pages/CoastGuard/NomineeInfoFormPage';
import NavbarCoastGuard from './Components/NavbarCoastGuard';
function App() {
 //
  return (
    <Account>

    <Router>
   
   
      <Routes>
      
        <Route path="/" element={<><Navbar/><Landing /></>} />
        <Route path="/coastguard" element={<> <NavbarCoastGuard /> <CoastGuardHomePage /></>} />     
        <Route path="/nomineeinfo" element={<> <NavbarCoastGuard /> <NomineeInfoFormPage /></>} />
        <Route path="/chattoopenai" element={<> <NavbarCoastGuard /><ChatToAiPage/> </>} />

      </Routes>
  </Router>
  </Account>

  
  );
}

export default App;
