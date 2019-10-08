import moment from 'moment'

const initState = {
  employees: null,
  lastupdate : 0,
  isGettingEmployees: false,
  getError: null,
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
        lastupdate : moment().valueOf(),
      };
    }
    case "GETTING_EMPLOYEES_ERROR": {
      return {
        ...state,
        isGettingEmployees: false,
        getError: action.payload
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
