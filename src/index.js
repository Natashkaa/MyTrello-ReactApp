import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import  authReducer from './Reducers/AuthReducer'


import { Router } from "react-router-dom"
import {createBrowserHistory} from 'history'

let state = {
  auth: {
    user: null,
    email: "",
    password: "",
    authCheck: true,
    errorMessage: "",
    tasks: []
  }
}



let rootReducer = combineReducers({auth: authReducer});

let store = createStore(rootReducer, state, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
let history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App/>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
