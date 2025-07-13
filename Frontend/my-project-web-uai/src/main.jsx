import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// importa el CSS que PostCSS procesará
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>
);
