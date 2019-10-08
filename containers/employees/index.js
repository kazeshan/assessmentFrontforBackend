import React, { Component } from "react";
import { connect } from "react-redux";
import { getEmployees } from "../../actions.js";
import "./style.css";

const EmployeeTable = props => {
  if (!props.data || props.data.length === 0) {
    return <div>There are no records.</div>;
  }
  return (
    <table cellspacing={0}>
      <tbody>
        <tr>
          <th>Empoyee Id</th>
          <th>Name</th>
          <th>Email</th>
          <th />
        </tr>
        {props.data.map((item, index) => {
          console.log(item);
          return (
            <tr key={`row_${index}_${item.id}`}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <span
                  className="table_edit"
                  onClick={props.editEmp.bind(null, item.id)}
                >
                  EDIT
                </span>
                <span
                  className="table_delete"
                  onClick={props.deleteEmp.bind(null, item.id)}
                >
                  DELETE
                </span>
              </td>
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

  editEmp = () => {};
  deleteEmp = () => {};

  render() {
    return (
      <div className="emp_master">
        <div className="emp_title">
          Employees
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
          <EmployeeTable
            data={this.state.data}
            editEmp={this.editEmp}
            deleteEmp={this.deleteEmp}
          />
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
