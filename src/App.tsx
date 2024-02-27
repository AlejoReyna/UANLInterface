import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar/>
    </Router>
  );
}

export default App;
