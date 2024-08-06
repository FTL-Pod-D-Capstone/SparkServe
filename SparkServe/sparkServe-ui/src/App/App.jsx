import React from 'react';
import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import PageRoutes from '../Router/PageRoutes';

import { CombinedAuthProvider } from '../Components/CombinedAuthContext/CombinedAuthContext';


function App() {
  return (
    <CombinedAuthProvider>
      <Router>
      <PageRoutes />
    </Router>
    </CombinedAuthProvider>
  );
}

export default App;