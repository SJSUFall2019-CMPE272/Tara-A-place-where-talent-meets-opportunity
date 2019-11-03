import React, { Component } from "react";
import { Route } from "react-router-dom";
import SignUp from "./components/signUp";

class Main extends Component {
  state = {};
  render() {
    return (
      <div>
        <Route path="/signup" component={SignUp} />
      </div>
    );
  }
}

export default Main;
