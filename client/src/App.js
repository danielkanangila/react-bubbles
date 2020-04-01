import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import PrivateRoute from './PrivateRoute';
import { Container } from "./components/styled-components";
import BuddlePage from './components/BubblePage';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Route exact path="/" component={Login} />
        <Container>
          <PrivateRoute path="/bubbles" component={BuddlePage} />
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
