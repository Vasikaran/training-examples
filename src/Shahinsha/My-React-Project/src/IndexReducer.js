
const indexReducer = (state = {
            name : "",
            age : "",
            dob : "",
            gender:"",
            photo:"",
            rollno:"",
            standard:"",
            bloodgroup:"",
            allDetails : "",
            check : true,
            search : "",
            edit : true,
            searchCheck : true,
            allDetail : [],
            empty : true,
}, action) => {
    switch (action.type) {
        case "ADD_DETAILS":
            let val = state;
            if (val.name != "" && val.age != "" && val.dob != "" && val.gender != ""&& val.photo != ""&& val.rollno != "" && val.standard != "" && val.bloodgroup != ""){
                   state = {
                         ...state,
                        name : "",
                        age : "",
                        dob : "",
                        gender:"",
                        rollno:"",
                        photo : "",
                        standard:"",
                        bloodgroup:"",
                        allDetails : state,
                        edit : true,
                        empty : false,
            };
        }
        break;
        case "CHANGE_STATE":
            state = {
                ...state,
                allDetails : action.payload,
                check : false
            };
        break;
        case "SET_VALUE":
            state = {
                ...state,
                ...action.payload
                };
        break;
        case "EDIT_VALUE":
            state = {
                ...state,
                ...action.payload,
                edit : false,
                };
        break;
        case "STORE_VALUES":
            let props = action.payload;
            state = {
                ...state,
                allDetail : action.payload,
            }
            break;
        case "EMPTY_CHECK":
            state = {
                ...state,
                empty : true,
            }
          break;
    }
    return state;
};
export default indexReducer;
