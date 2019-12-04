import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";



export default class Navbar extends Component {
  state = {
    logout: false
  }
  HomeURL(){
    return <>
    {localStorage.getItem("type") == "talent" ?
                <li className="navbar-item">
                  <Link to="/home" className="navbar-brand">
                    Home
                </Link>
                </li> : <li className="navbar-item">
                  <Link to="/recruiterhome" className="nav-link">
                    Home
                </Link>
                </li>}</>
  }

  handleLogout = e => {
    e.preventDefault();
    localStorage.clear();
    this.setState({ logout: true });
  }
  render() {
    let RedirectVar = null;
    if (this.state.logout) {
      return <Redirect to="/" />
    }
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">

            <li className="navbar-item">

              <Link to="/" className="navbar-brand">
                Tara
              </Link>
            </li>
            {localStorage.getItem("id") ? 
            this.HomeURL() :
            <li className="navbar-item">
                  <Link to="/" className="navbar-brand">
                    Home
                </Link>
            </li>}

            {localStorage.getItem("id") ? <li className="navbar-item">
              <Link to="/" onClick={this.handleLogout} className="nav-link">
                Log Out
              </Link>

            </li> : <li className="navbar-item">
                <Link to="/signin" className="nav-link">
                  Sign In
              </Link>
              </li>}
            {!localStorage.getItem("id") && <li className="navbar-item">
              <Link to="/signup" className="nav-link">
                Register
              </Link>
            </li>}

          </ul>
        </div>
      </nav>
    );
  }
}
