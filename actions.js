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

export const addEmployee = payload => {
  return dispatch => {
    dispatch({
      type: "START_ADD_EMP"
    });

    setTimeout(() => {
      axios
        .post(`employees`, payload)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          let msg = (err && err.message) || "unk";
          dispatch({
            type: "END_ADD_EMP",
            payload: msg
          });
        });
    }, 2000);
  };
};
