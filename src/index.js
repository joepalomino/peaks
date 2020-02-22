import React from 'react';
import ReactDOM from 'react-dom';
import "./styles/tailwind.out.css"
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from './contexts/auth0-context';
import { BrowserRouter } from 'react-router-dom';
import {initializeFirebase} from './push'

ReactDOM.render(
  <BrowserRouter>
    <Auth0Provider>
    <App />
  </Auth0Provider>
  </BrowserRouter>,
  document.getElementById('root'));
  initializeFirebase();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
