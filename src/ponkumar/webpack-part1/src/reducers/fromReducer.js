
const editFeild = (state = {},action) => {
    switch(action.type){
          case "setValue" :
              state = {
                  ...state,
                  value : action.value,
                  isError : action.error.length !== 0,
                  error : action.error,
              }
          break;
          case "clearAllValues" :
              state = {
                  ...state,
                  value : "",
                  isError : false,
                  error : "",
              };
          break;
      }
      return state;
}
var FormCheckObject = {
    "name"       : {
        type        : "text",
        isMandatory : true,
        maxLength   : 250,
        minLength   : 3,
        value       : "",
          isError : false,
        error       : ""
    },
      "age"        : {
        type        : "number",
        isMandatory : true,
        maximam     : 150,
        minimam     : 1,
        value       : "",
          isError : false,
        error       : ""
    },
      "email"      : {
        type        : "email",
        isMandatory : true,
        maxLength   : 250,
        minLength   : 8,
        value       : "",
          isError : false,
        error       : ""
    },
      "password"   : {
        type        : "password",
        isMandatory : true,
        maxLength   : 250,
        minLength   : 5,
        value       : "",
          isError : false,
        error       : ""
    },
      "phone"      : {
        type        : "phone",
        isMandatory : true,
        value       : "",
          isError : false,
        error       : ""
    },
}
const formReducer = (state = FormCheckObject,action) => {
    switch(action.type){
        case "setValue" :
            state = {
                ...state,
                [action.key] : editFeild(state[action.key],action),
            }
        break;
        case "clearAllValues" :
            state = Object.keys(state).reduce(function (nextState,key) {
                let tem  = editFeild(undefined,action);
                nextState[key] = tem;
                return nextState;
            },{});
        break;
    }

    return state;
}
export default  formReducer;
