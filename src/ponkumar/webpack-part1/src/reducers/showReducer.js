
const showState = {
            details :[],
            detailsCount:0,
            currentPage : -1,
            visible : -1,
        }
const showReducer = (state = showState,action) => {
    switch(action.type){
        case "showObjectAssign" :
            state={
                ...state,
                ...action.payload,
            };
        break;
        case "setCurrentPage" :
            state={
                ...state,
                currentPage : action.payload,
            };
        break;
        case "setVisible" :
            state={
                ...state,
                visible :  Number((state.visible != action.payload) ? action.payload : -1),
            };
        break;
    }
    return state;
}
export default  showReducer
