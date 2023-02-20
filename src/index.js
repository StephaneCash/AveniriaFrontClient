import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppContext from "./AppContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppContext>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AppContext>
);

