import React, { Component } from "react";
import { Route } from "react-router-dom";
import SignUp from "./components/signUp";
import SignIn from "./components/SignIn";
import Landing from "./components/Landing";

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
