import {createStore, applyMiddleware,combineReducers} from "redux";
import { Provider} from "react-redux";
import React from 'react';
import ReactDOM from 'react-dom';
import App from "./app.js";
import userReducer from "./Reducers/userReducer.js";
import detailReducer from "./Reducers/detailReducer.js";

const store = createStore(combineReducers({user : userReducer, detail : detailReducer}),{});

ReactDOM.render(
    <Provider store={store}>
	    <App />
	</Provider>,
    document.getElementById("main")
);