// import React from 'react';

const detailState = {
     visibleId : -1,
     details : [],
     startIndex : 0
};

const detailReducer = (state = detailState, action) => {
    switch (action.type) {
        case "Getter":
            state = {
                ...state,
                startIndex : action.value
            };
            break;
        case "classChanger":
            state = {
                ...state,
                visibleId : action.value
            }
            break;
        case "getResult":
            state = {
                ...state,
               details : action.result
            }
    }
    return state;
};

export default detailReducer;








