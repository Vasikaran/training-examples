import {orderDetails} from "./AllFunctions";
import store from "./store";
const showReducer = (state = {
           studentDetailsList : [],
            check : true,
            page : 1,
}, action) => {
    switch (action.type) {
         case "GO_BACK":
        state = {
            ...state,
            check : true
        };
        break;
        case "CHANGE_STATE":
        state = {
            ...state,
            check : false
        };
        break;
        case "RE_ARRANGE":
        state = {
            ...state,
            page : action.payload
        };
        break;
        case "STORE_DETAILS":
            let alldetails = store.getState().index.allDetail;
            let props = action.payload;
            if (props % 1 != 0){
            let array = [];
            if (alldetails.length > 11){
            state = {
                        ...state,
                        studentDetailsList : alldetails.slice(0,10)
                    }
            }else if (alldetails.length > 0 && alldetails.length < 11) {
                 state = {
                        ...state,
                        studentDetailsList : alldetails.slice(0,alldetails.length)
                    }
            }
            if (store.getState().show.page != 0){
                state = orderDetails(state,store.getState().show.page)
            }
            if (state.check == false){
              state = {
                      ...state,
                      check : true
                  }
              }
            }
          else if (props %1 == 0){
              if (state.check == false){
                  state = {
                      ...state,
                      check : true
                  };
              }
              state = {
                  ...state,
                  page : props
              };
              state = orderDetails(state,props)
            }
        break;
    }
    return state;
};

export default showReducer;
