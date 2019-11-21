import React, { Component } from "react";
import { Route } from "react-router-dom";
import SignUp from "./components/signUp";
import SignIn from "./components/SignIn";
import Landing from "./components/Landing";
import TalentHome from "./components/Talent/Home";
import RecruiterHome from "./components/Recruiter/Home";
import UpdateProfile from "./components/Talent/UpdateProfile";
import CreateJob from "./components/Recruiter/CreateJob";
class Main extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <Route path="/" exact component={Landing} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/home" component={TalentHome} /> 
        <Route path="/recruiterhome" component={RecruiterHome} />
        <Route path="/createform" component={UpdateProfile} />
        <Route path="/createjob" component={CreateJob} />
      </div>
    );
  }
}

export default Main;
