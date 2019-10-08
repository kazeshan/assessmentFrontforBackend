import axios from "axios";

export const getEmployees = () => {
  return dispatch => {
    dispatch({
      type: "GETTING_EMPLOYEES"
    });

    setTimeout(() => {
      axios
        .get("employee")
        .then(res => {
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
        .post(`employee`, payload)
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

export const clearError = () => {
  return {
    type: "CLEAR_ERROR"
  };
};

export const updateEmployee = (payload, scall) => {
  return dispatch => {
    dispatch({
      type: "START_UPDATE_EMP"
    });

    setTimeout(() => {
      axios
        .patch(`employee`, payload)
        .then(res => {
          if (res.status === 200) {
            dispatch({
              type: "UPDATE_EMP",
              payload: res.data
            });
            scall();
          }
        })
        .catch(err => {
          let msg = (err && err.message) || "unk";
          dispatch({
            type: "ERROR_UPDATE_EMP",
            payload: msg
          });
        });
    }, 2000);
  };
};

export const deleteEmp = (id, scall) => {
  return dispatch => {
    dispatch({
      type: "START_DELETE_EMP"
    });
    setTimeout(() => {
      axios
        .delete(`employee`, { data: { id } })
        .then(res => {
          if (res.status === 200) {
            dispatch({
              type: "DEELTE_EMP",
              payload: id
            });
            scall();
          }
        })
        .catch(err => {
          let msg = (err && err.message) || "unk";
          dispatch({
            type: "ERROR_DELETE_EMP",
            payload: msg
          });
        });
    }, 2000);
  };
};
