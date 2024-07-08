import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

window.App = App;

const root = document.createElement('div');
root.id = 'react-chrome-app';
document.body.appendChild(root);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);

// Inject custom styles
const style = document.createElement('style');
style.textContent = `
  body {
    background-color: #f0f0f0;
  }
  /* More custom styles */
`;
document.head.appendChild(style);