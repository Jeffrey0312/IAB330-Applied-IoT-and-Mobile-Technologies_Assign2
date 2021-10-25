import React from "react";
import logo from './logo.svg';
import './App.css';
import {
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

import Home from './components/Home';
import About from './components/About';
import Educator from "./components/Educator";


function Welcome(props) {
  return <h1>Hi, {props.name}</h1>;
}

const introtext = <h1>IAB330 Assignment 2</h1>;

function myApp() {
  return (
    <div className="App">
      <div className="menu">
        <ul>
          <li> <Link to="/">Home</Link> </li>
          <li> <Link to="/about">About</Link> </li>
        </ul>
      </div>
      <div className="App-intro">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
            <Route path="/com" component={Educator} />
          <Route component={Home} />
        </Switch>
      </div>
      <header className="App-header">
        < img src={logo} className="App-logo" alt="logo" />
        <Welcome name="Assignment 2122" />
        {introtext}
      </header>
    </div>
  );
}

export default myApp;