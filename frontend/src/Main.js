import React, { Component } from "react";
import { Route } from "react-router-dom";
import SignUp from "./components/signUp";
import SignIn from "./components/SignIn";
import Landing from "./components/Landing";
import Album from  "./components/Album";
<<<<<<< HEAD
import CreateForm from "./components/CreateForm";
=======
import ChayForm from "./components/ChayForm";
>>>>>>> 7fba83d89c82becfb72879bb3c3db07c39f5dd2c

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
<<<<<<< HEAD
        <Route path="/createform" component={CreateForm}/>
        <Route path="/photo" component={PhotoLinks}/>
=======
        <Route path="/chayForm" component={ChayForm} />
>>>>>>> 7fba83d89c82becfb72879bb3c3db07c39f5dd2c
      </div>
    );
  }
}

export default Main;
