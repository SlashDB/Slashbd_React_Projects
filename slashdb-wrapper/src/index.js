import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SlashDBProvider } from './hooks';

ReactDOM.render(
  <React.StrictMode>
    <SlashDBProvider baseUrl="http://localhost:8000">
      <App />
    </SlashDBProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
