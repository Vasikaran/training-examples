import {createStore,combineReducers} from "redux";
import showReducer from "./ShowReducer";
import indexReducer from "./IndexReducer";
import pageReducer from "./PageReducer";
const store = createStore(
    combineReducers({index: indexReducer,show : showReducer,page : pageReducer}),
    {}
);
const dispatch = store.dispatch;
export default store;
export {dispatch};
