import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Main from './components/Main.jsx';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Main/>

      
    </Router>
  );
}

export default App;
