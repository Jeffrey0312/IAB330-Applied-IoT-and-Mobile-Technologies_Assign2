import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import RoomVisualization from "./components/RoomVisualization";

function myApp() {
  return (
    <div className="App">
      <Navbar bg="info" expand="lg">
        <Container>
          {/*<Navbar.Toggle aria-controls="basic-navbar-nav"/>*/}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">
                <h4>
                  <b>
                    <i>BestClinicals</i>
                  </b>
                </h4>
              </Nav.Link>
              <Nav.Link href="/">
                <h4>Home</h4>
              </Nav.Link>
              <Nav.Link href="/RoomVisualization">
                <h4>Room Visualization</h4>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="App-intro">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/RoomVisualization" component={RoomVisualization} />
          <Route component={Home} />
        </Switch>
      </div>
    </div>
  );
}

export default myApp;
