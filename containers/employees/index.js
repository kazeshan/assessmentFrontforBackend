import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getEmployees,
  addEmployee,
  clearError,
  updateEmployee,
  deleteEmp
} from "../../actions.js";
import "./style.css";

const EmployeeTable = props => {
  if (!props.data || props.data.length === 0) {
    return <div>There are no records.</div>;
  }
  return (
    <table cellSpacing={0}>
      <tbody>
        <tr>
          <th>Empoyee Id</th>
          <th>Name</th>
          <th>Email</th>
          <th />
        </tr>
        {props.data.map((item, index) => {
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
    data: null,
    name: "",
    email: "",
    id: "",
    isCreateEmployee: false,
    isUpdateEmployee: false,
    isDeleteEmployee: false
  };

  componentDidMount() {
    this.getEmployees();
  }

  shouldComponentUpdate(np, ns) {
    if (np.lastupdate !== this.props.lastupdate) {
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

  toggleAddEmployee = () => {
    this.setState({
      name: "",
      email: "",
      id: "",
      isCreateEmployee: !this.state.isCreateEmployee
    });

    this.props.clearError();
  };

  addEmployee = () => {
    const { name, email } = this.state;
    let payload = {
      name,
      email
    };

    this.props.addEmployee(payload, () => {
      this.toggleAddEmployee();
    });
  };

  inputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  toggleUpdateEmp = empId => {
    let emp = this.state.data.find(item => item.id === empId);
    this.setState({
      name: emp ? emp.name : "",
      email: emp ? emp.email : "",
      id: emp ? emp.id : "",
      isUpdateEmployee: !this.state.isUpdateEmployee
    });
    this.props.clearError();
  };

  editEmp = id => {
    this.toggleUpdateEmp(id);
  };

  updateEmp = () => {
    const { name, email, id } = this.state;
    let payload = {
      name,
      email,
      id
    };

    this.props.updateEmployee(payload, () => {
      this.toggleUpdateEmp();
    });
  };

  toggleDeleteEmp = id => {
    this.setState({
      isDeleteEmployee: id ? true : false,
      idToDelete: id
    });

    this.props.clearError();
  };

  deleteEmp = () => {
    this.props.deleteEmp(this.state.idToDelete, () => {
      this.toggleDeleteEmp();
    });
  };

  render() {
    return (
      <div className="emp_master">
        {this.state.isCreateEmployee && (
          <div className="model_master">
            <div className="model_panel">
              <div className="modelTitle">
                Create Employee
                <div
                  className="model_close"
                  onClick={
                    !this.props.isAddingEmp ? this.toggleAddEmployee : () => {}
                  }
                >
                  X
                </div>
              </div>
              <div className="modelBody">
                Name :{" "}
                <input
                  name="name"
                  value={this.state.name}
                  onChange={this.inputChange}
                  disabled={this.props.isAddingEmp}
                />
                <br />
                Email :{" "}
                <input
                  name="email"
                  value={this.state.email}
                  onChange={this.inputChange}
                  disabled={this.props.isAddingEmp}
                />
                <br />
                <br />
                <div className="error_msg">{this.props.addError}</div>
              </div>
              <div className="modelAction">
                <div
                  className={`btn ${this.props.isAddingEmp && "btn_disabled"}`}
                  onClick={this.props.isAddingEmp ? () => {} : this.addEmployee}
                  disabled
                >
                  CREATE
                </div>
              </div>
            </div>
          </div>
        )}

        {this.state.isUpdateEmployee && (
          <div className="model_master">
            <div className="model_panel">
              <div className="modelTitle">
                Update Employee
                <div
                  className="model_close"
                  onClick={
                    !this.props.isUpdatingEmp ? this.toggleUpdateEmp : () => {}
                  }
                >
                  X
                </div>
              </div>

              <div className="modelBody">
                Name :{" "}
                <input
                  name="name"
                  value={this.state.name}
                  onChange={this.inputChange}
                  disabled={this.props.isUpdatingEmp}
                />
                <br />
                Email :{" "}
                <input
                  name="email"
                  value={this.state.email}
                  onChange={this.inputChange}
                  disabled={this.props.isUpdatingEmp}
                />
                <br />
                <br />
                <div className="error_msg">{this.props.updateError}</div>
              </div>
              <div className="modelAction">
                <div
                  className={`btn ${this.props.isUpdatingEmp &&
                    "btn_disabled"}`}
                  onClick={this.props.isUpdatingEmp ? () => {} : this.updateEmp}
                  disabled
                >
                  UPDATE
                </div>
              </div>
            </div>
          </div>
        )}

        {this.state.isDeleteEmployee && (
          <div className="alert_master">
            <div className="alert_inner">
              <div className="alert_title">
                Are you sure you?
                <div className="error_msg">{this.props.deleteError}</div>
              </div>

              <div className="alert_button_zone">
                <div
                  className={`alert_btn ${this.props.isDeleteingEmp &&
                    "alert_btn_disabled"}`}
                  onClick={
                    this.props.isDeleteingEmp ? () => {} : this.deleteEmp
                  }
                >
                  Yes
                </div>
                <div
                  className={`alert_btn ${this.props.isDeleteingEmp &&
                    "alert_btn_disabled"}`}
                  onClick={
                    this.props.isDeleteingEmp
                      ? () => {}
                      : this.toggleDeleteEmp.bind(null, null)
                  }
                >
                  No
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="emp_title">
          Employees
          <div>
            <span
              className={`emp_options ${this.props.isGettingEmployees &&
                "emp_options_disabled"}`}
              onClick={
                this.props.isGettingEmployees ? () => {} : this.getEmployees
              }
            >
              Refresh Employee List
            </span>
            <span
              className={`emp_options ${this.props.isGettingEmployees &&
                "emp_options_disabled"}`}
              onClick={
                this.props.isGettingEmployees
                  ? () => {}
                  : this.toggleAddEmployee
              }
            >
              Add New Employee
            </span>
          </div>
        </div>

        {this.props.getError ? (
          this.props.getError
        ) : this.props.isGettingEmployees ? (
          "Loading Employees..."
        ) : (
          <EmployeeTable
            data={this.state.data}
            editEmp={this.editEmp}
            deleteEmp={this.toggleDeleteEmp}
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
    lastupdate: state.lastupdate,
    addError: state.addError,
    isAddingEmp: state.isAddingEmp,
    isUpdatingEmp: state.isUpdatingEmp,
    updateError: state.updateError,
    isDeleteingEmp: state.isDeleteingEmp,
    deleteError: state.deleteError
  };
};

export default connect(
  mapStateToPropds,
  { getEmployees, addEmployee, clearError, updateEmployee, deleteEmp }
)(EmployeeDashboard);
