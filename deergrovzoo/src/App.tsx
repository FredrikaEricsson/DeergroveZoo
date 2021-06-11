import React from "react";
import { Animals } from "./components/Animals";
import { Animal } from "./components/Animal";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Animals></Animals>
        </Route>
        <Route path="/animal/:animalId">
          <Animal></Animal>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
