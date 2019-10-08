import React, { Component } from "react";
import "./style.css";

export default class Instructions extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="instructions_master">
        <h2>Instruction</h2>
        <h3>Step 1</h3>
        <p>Create a NodeJS application to listern on port 30010</p>
      </div>
    );
  }
}
