import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "./components/Navbar.component";
import Main from "./Main";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Main />
    </Router>
  );
}

export default App;
