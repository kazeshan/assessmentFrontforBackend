import React, { Component } from "react";
import { render } from "react-dom";
import Master from './containers/master'
import "./style.css";

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Master /> 
    );
  }
}

render(<App />, document.getElementById("root"));
