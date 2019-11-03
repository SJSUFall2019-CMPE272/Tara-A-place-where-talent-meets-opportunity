import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/Navbar.component";
import SignIn from "./components/SignIn.component";
import Landing from "./components/Landing.component";

function App() {
  return (
    <Router>
    <Navbar />
    <br/>
    <div className="container">
      <Route path="/" exact component={Landing} />
      <Route path="/signin" exact component={SignIn} />
    </div>
    </Router>
  );
}

export default App;
