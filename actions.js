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

          console.log(res)
          if (res.status === 200) {
            dispatch({
              type: "EMPLOYEES",
              payload: res.data
            });
          }
        })
        .catch(err => {
          console.log("error");
          console.log(err);
          let msg = err && err.message || "unk"
          dispatch({
            type: "GETTING_EMPLOYEES_ERROR",
            payload: msg
          });
        });
    }, 2000);
  };
};
