import React, { Component } from 'react';
import {Route,Router,browserHistory} from "react-router";
import ReactDOM from 'react-dom';
import store from "./store";
import showReducer from "./ShowReducer";
import indexReducer from "./IndexReducer";
import pageReducer from "./PageReducer";
import {
  StoreDetails,
  cancel,
  goBack,selectPage,ChangeValue,addDetails,changeDetails,
  changeState,editDetails,delDetail,searchPerson,orderDetails,
  ajax
} from "./AllFunctions";
import App from "./App";
import ShowDetails from "./ShowDetails";
import PersonalDetail from "./PersonalDetail";
import Home from "./HomeComponent";
const dispatch = store.dispatch;
ajax("/getdetails",{},dispatch)
 ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/home" component={Home} />
    <Route path="/add" component={App} />
    <Route path="/list/page/*" component={ShowDetails} />
    <Route path="/list/*" component={PersonalDetail}/>
    <Route path="/*" component={App} />
  </Router>,
  document.getElementById('allComponent')
);
