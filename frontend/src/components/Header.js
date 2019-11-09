import React, { Component } from 'react';
import Navbar from "./Navbar";

class Header extends Component {
  render() {
    return (
     
      <header>
      <Navbar/>
        <div className="head">
            <h1>Get cast in your next role today</h1>
            <div>
              <p>We have the most jobs, the best tools, and expert advice to help you get cast.</p>
              <div><a className="contact" href="#">Join Us</a></div>
            </div>
        </div>
       
      </header>
      
    );
  }
}

export default Header;