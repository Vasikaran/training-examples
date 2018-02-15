const pageReducer = (state = {
    length : 0
},action) => {
     switch (action.type) {
        case "CHANGE_LENGTH":
            state = {
                ...state,
                length : action.payload
            }
    }
    return state;
}
export default pageReducer;
