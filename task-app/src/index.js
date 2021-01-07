import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SlashDBProvider } from './slashDBwrapper';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <SlashDBProvider baseUrl="http://localhost:8000/db">
      <App />
    </SlashDBProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
