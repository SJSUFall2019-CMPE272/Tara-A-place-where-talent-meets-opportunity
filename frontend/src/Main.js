import React, { Component } from "react";
import { Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn.component";
import Landing from "./components/Landing.component";

class Main extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <Route path="/" exact component={Landing} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </div>
    );
  }
}

export default Main;
