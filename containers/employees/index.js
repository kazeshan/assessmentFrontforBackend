import React, { Component } from "react";
import { connect } from "react-redux";
import { getEmployees } from "../../actions.js";
import "./style.css";

const EmployeeTable = props => {
  if (!props.data || props.data.length === 0) {
    return <div>There are no records.</div>;
  }
  return (
    <table>
      <tr>
        <th>Empoyee Id</th>
        <th>Name</th>
        <th>Email</th>
      </tr>
      <tbody>
      {props.data.map((item, index) => {
        console.log(item)
        return (
          <tr key={`row_${index}_${item.id}`}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
          </tr>
        );
      })}
      </tbody>
    </table>
  );
};

class EmployeeDashboard extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    data: null
  };

  componentDidMount() {
    this.getEmployees();
  }

  shouldComponentUpdate(np, ns) {
    if (np.lastupdate !== this.props.lastupdate) {
      console.log("change detected");
      this.processEmployee(np.employees);
      return false;
    }
    return true;
  }

  getEmployees = () => {
    this.props.getEmployees();
  };

  processEmployee = emp => {
    this.setState({
      data: emp
    });
  };

  render() {
    return (
      <div className="emp_master">
        <div className="emp_title">
          Employee Dashboard
          <span
            className={`emp_options ${this.props.isGettingEmployees &&
              "emp_options_disabled"}`}
            onClick={
              this.props.isGettingEmployees ? () => {} : this.getEmployees
            }
          >
            Refresh
          </span>
        </div>

        {this.props.getError ? (
          this.props.getError
        ) : this.props.isGettingEmployees ? (
          "Loading Employees..."
        ) : (
          <EmployeeTable data={this.state.data} />
        )}
      </div>
    );
  }
}

const mapStateToPropds = state => {
  return {
    employees: state.employees,
    isGettingEmployees: state.isGettingEmployees,
    getError: state.getError,
    lastupdate: state.lastupdate
  };
};

export default connect(
  mapStateToPropds,
  { getEmployees }
)(EmployeeDashboard);
