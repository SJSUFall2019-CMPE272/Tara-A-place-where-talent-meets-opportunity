import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";

import React, { Component } from 'react';

import Main from "./Main";

function App() {
  return (
    <Router>
      <br />
      <Main />
    </Router>
  );
}

export default App;
