import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignInContainer from './Containers/signUpContainer'

import {
  Route,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom'

import LogIn from './Containers/logInContainer'
import SignUp from './Containers/signUpContainer'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/logIn' component={LogIn}/>
        <Route path='/signUp' component={SignUp}/>
      </Switch>
      {/* <SignInContainer/> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
