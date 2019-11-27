import React, { Component } from 'react';
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button'

class Header extends Component {
  render() {
    return (

      <header>
        <Navbar />
        <div className="head">
          <h1>Get cast in your next role today</h1>
          <div className="col-sm-10">
            <h5>We have the most jobs, the best tools, and expert advice to help you get cast.</h5>
            <div className="col-sm-6"><Button size="lg" variant="info">
              <Link to="/signup" style={{ color: '#FFF' }}>Join Us</Link>
              </Button>
            </div>
          </div>
        </div>

      </header>

    );
  }
}

export default Header;