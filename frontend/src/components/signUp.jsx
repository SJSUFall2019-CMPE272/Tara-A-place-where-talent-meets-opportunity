import React, { Component } from "react";
import axios from "axios";
import util from "../utils";
class SignUp extends Component {
  state = {
    message: ""
  };
  handleClick = e => {
    e.preventDefault();
    axios
      .get(`${util.BASE_URL}/signup`)
      .then(res => this.setState({ message: res.data }))
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div>
        <h2>Signup page</h2>
        <button onClick={this.handleClick}>Click here</button>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default SignUp;
