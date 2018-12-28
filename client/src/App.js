import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ComparatorComponent from "./modules/comparator/ComparatorComponent";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ComparatorComponent />
      </div>
    );
  }
}

export default App;
