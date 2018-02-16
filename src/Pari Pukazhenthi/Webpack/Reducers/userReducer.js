const userState = {
    "name" : {
        name : "name",
        value : "",
        error : "",
        maxLength : 50,
        minLength : 4,
        pattern : /^[a-zA-Z]+$/,
        type : "text"
    },
    "age" : {
        name : "age",
        value : "",                                  
        error : "",
        pattern : /^([1-9][0-9]?|100)$/,
        type : "number"
    },
    "email" : {
        name : "email",
        value : "",
        error : "",
        minLength : 0,
        maxLength : 50,
        pattern : /^[a-zA-Z\d]([._]?[a-zA-Z\d])+@[a-zA-Z]+\.[a-zA-Z]+$/,
        type : "text"
    },
    "password" : {
        name : "password",
        value : "",
        error : "",
        maxLength : 50,
        minLength : 8,
        pattern : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*\s)(?=.*\W).{7,50}$/,
        type : "password"
    },
    "number" : {
        name : "number",
        value : "",
        error : "",
        pattern : /^[1-9][0-9]{9}/,
        type : "number"
    }
}

const userReducer = (state = userState, action) => {
    switch (action.type) {
        case "setDetail":
            state = {
                ...state,
                [action.key]  :{
                    ...state[action.key],
                    value : action.value
                }
            };
            break;
        case "setError":
            state = {
                ...state,
                [action.key]  :{
                    ...state[action.key],
                    error : action.val
                }
            };
            break;
        case "clearValues":
            state = userState;
            break;
    }
    return state;
};

export default userReducer;












