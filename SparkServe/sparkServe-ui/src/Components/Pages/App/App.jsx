import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import PageRoutes from '../../../Router/PageRoutes';

function App() {
  return (
    <Router>
      <PageRoutes />
    </Router>
  );
}

export default App;