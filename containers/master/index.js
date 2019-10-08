import React, { Component } from "react";
import axios from "axios";
import "./style.css";
import Instructions from "../instructions";
import EmployeeDashboard from "../employees";

export default class Master extends Component {
  constructor() {
    super();

    axios.defaults.baseURL = "http://localhost:30010/api";
  }

  render() {
    return (
      <div className="master_container">
        <Instructions />
        <hr />
        <EmployeeDashboard />
      </div>
    );
  }
}
