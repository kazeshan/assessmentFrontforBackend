import moment from "moment";

const initState = {
  employees: null,
  lastupdate: 0,
  isGettingEmployees: false,
  getError: null,
  isAddingEmp: false,
  addError: null
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
        employees : state.employees ? [action.payload, ...state.employees] : [action.payload],
        lastupdate : moment().valueOf()
      };
    }
    case "ERROR_ADD_EMP": {
      return {
        ...state,
        isAddingEmp: false,
        addError: action.payload
      };
    }
    case "CLEAR_ERROR_ADD_EMP": {
      return {
        ...state,
        addError: null
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
