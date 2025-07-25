// src/main.jsx

// Apply saved theme before React ever renders
const saved = localStorage.getItem('theme') || 'light';
document.documentElement.classList.add(saved);
document.documentElement.setAttribute('data-theme', saved);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
