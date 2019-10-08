import moment from "moment";

const initState = {
  employees: null,
  lastupdate: 0,
  isGettingEmployees: false,
  getError: null,
  isAddingEmp: false,
  addError: null,
  isUpdatingEmp: false,
  updateError: null,
  isDeleteingEmp: false,
  deleteError: null
};

const emp = (state = initState, action) => {
  switch (action.type) {
    case "GETTING_EMPLOYEES": {
      return {
        ...state,
        isGettingEmployees: true,
        getError: null
      };
    }
    case "EMPLOYEES": {
      return {
        ...state,
        isGettingEmployees: false,
        employees: action.payload,
        lastupdate: moment().valueOf()
      };
    }
    case "GETTING_EMPLOYEES_ERROR": {
      return {
        ...state,
        isGettingEmployees: false,
        getError: action.payload
      };
    }

    case "START_ADD_EMP": {
      return {
        ...state,
        isAddingEmp: true,
        addError: null
      };
    }

    case "ADD_EMPLOYEE": {
      return {
        ...state,
        isAddingEmp: false,
        addError: null,
        employees: state.employees
          ? [action.payload, ...state.employees]
          : [action.payload],
        lastupdate: moment().valueOf()
      };
    }
    case "ERROR_ADD_EMP": {
      return {
        ...state,
        isAddingEmp: false,
        addError: action.payload
      };
    }
    case "CLEAR_ERROR": {
      return {
        ...state,
        addError: null,
        updateError: null,
        deleteError: null
      };
    }
    case "START_UPDATE_EMP": {
      return {
        ...state,
        isUpdatingEmp: true,
        updateError: null
      };
    }
    case "UPDATE_EMP": {
      let newEmployees = null;
      if (state.employees) {
        newEmployees = state.employees.map(item => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      }
      return {
        ...state,
        isUpdatingEmp: false,
        updateError: null,
        employees: newEmployees,
        lastupdate: moment().valueOf()
      };
    }
    case "ERROR_UPDATE_EMP": {
      return {
        ...state,
        isUpdatingEmp: false,
        updateError: action.payload
      };
    }

    case "START_DELETE_EMP": {
      return {
        ...state,
        isDeleteingEmp: true,
        deleteError: null
      };
    }
    case "DEELTE_EMP": {
      let newEmployees = null;
      newEmployees = state.employees.filter(item => item.id !== action.payload);
      return {
        ...state,
        isDeleteingEmp: false,
        deleteError: null,
        employees: newEmployees,
        lastupdate: moment().valueOf()
      };
    }
    case "ERROR_DELETE_EMP": {
      return {
        ...state,
        isDeleteingEmp: false,
        deleteError: action.payload
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};

export default emp;
