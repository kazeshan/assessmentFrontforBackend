const initState = {
  employees : null,
}

const emp = (state = initState, action) => {
  switch(action.type){
    default : {
      return {
        ...state,
      }
    }
  }
}

export default emp;