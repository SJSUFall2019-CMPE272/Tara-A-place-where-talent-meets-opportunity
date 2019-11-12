import React, { Component } from "react";
import { Route } from "react-router-dom";
import SignUp from "./components/signUp";
import SignIn from "./components/SignIn";
import Landing from "./components/Landing";
import Album from  "./components/Album";
import CreateForm from "./components/CreateForm";

import PhotoLinks from "./components/PhotoLinks";
class Main extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <Route path="/" exact component={Landing} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/album" component={Album} />
        <Route path="/createform" component={CreateForm}/>
        <Route path="/photo" component={PhotoLinks}/>
        <Route path="/chayForm" component={ChayForm} />
      </div>
    );
  }
}

export default Main;
