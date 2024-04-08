import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Main from './components/Main.tsx';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Main/>

      
    </Router>
  );
}

export default App;
