import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import PageRoutes from '../Router/PageRoutes';

function App() {
  return (
    <div>
      <Router>
        <PageRoutes />
      </Router>
    </div>
  );
}

export default App;
