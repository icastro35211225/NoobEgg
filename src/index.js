import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { HelmetProvider } from 'react-helmet-async';
ReactDOM.render(
  <BrowserRouter>
    <HelmetProvider>
    <App />
    </HelmetProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

