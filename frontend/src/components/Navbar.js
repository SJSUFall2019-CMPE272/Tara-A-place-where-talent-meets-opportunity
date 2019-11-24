import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

export default class Navbar extends Component {
  state = {
    logout: false
  }

  handleLogout = e => {
    e.preventDefault();
    localStorage.clear();
    this.setState({ logout: true });
  }
  render() {
    let RedirectVar = null;
    if (this.state.logout) {
      RedirectVar = <Redirect to="/" />
    }
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        {RedirectVar}
        <Link to="/" className="navbar-brand">
          Tara
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            {localStorage.getItem("id") ? <li className="navbar-item">
              <button onClick={this.handleLogout} className="nav-link">
                Log Out
              </button>
            </li> : <li className="navbar-item">
                <Link to="/signin" className="nav-link">
                  Sign In
              </Link>
              </li>}
            {!localStorage.getItem("id") && <li className="navbar-item">
              <Link to="/signup" className="nav-link">
                Create an Account
              </Link>
            </li>}

          </ul>
        </div>
      </nav>
    );
  }
}
