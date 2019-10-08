import axios from "axios";

export const getEmployees = () => {
  return dispatch => {
    dispatch({
      type: "GETTING_EMPLOYEES"
    });

    setTimeout(() => {
      axios
        .get("employees")
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            dispatch({
              type: "EMPLOYEES",
              payload: res.data
            });
          }
        })
        .catch(err => {
          let msg = (err && err.message) || "unk";
          dispatch({
            type: "GETTING_EMPLOYEES_ERROR",
            payload: msg
          });
        });
    }, 2000);
  };
};

export const addEmployee = (payload, scall) => {
  return dispatch => {
    dispatch({
      type: "START_ADD_EMP"
    });

    setTimeout(() => {
      
      axios
        .post(`employees`, payload)
        .then(res => {
          if (res.status === 200) {
              dispatch({
            type: "ADD_EMPLOYEE",
            payload: res.data
          });
            scall();
          }
        })
        .catch(err => {
          let msg = (err && err.message) || "unk";
          dispatch({
            type: "ERROR_ADD_EMP",
            payload: msg
          });
        });
    }, 2000);
  };
};

export const clearAddError = () => {
  return {
    type: "CLEAR_ERROR_ADD_EMP"
  };
};
