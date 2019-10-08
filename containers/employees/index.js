import React, { Component } from "react";
import { connect } from "react-redux";
import { getEmployees } from "../../actions.js";
import "./style.css";

class EmployeeDashboard extends Component {
  constructor(props) {
    super(props);

    console.log(props);
  }

  componentDidMount(){
    this.props.getEmployees()
  }

  render() {
    return <div className="emp_master">Employee Dashboard</div>;
  }
}

const mapStateToPropds = state => {
  return {
    ...state
  };
};

export default connect(
  mapStateToPropds,
  { getEmployees }
)(EmployeeDashboard);
