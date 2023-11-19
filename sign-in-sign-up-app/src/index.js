import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
//import './index.css'
import App from './App';
//index.css contained something which made the background continous but moved the text a it, if time explore

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
