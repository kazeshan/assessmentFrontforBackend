import React, { Component } from "react";
import "./style.css";
import Instructions from '../instructions'
import EmployeeDashboard from '../employees'

export default class Master extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="master_container">
        <Instructions />
        <hr/>
        <EmployeeDashboard />
      </div>
    );
  }
}
