import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Router , Route , browserHistory} from 'react-router';
import detailsFormReducer from './reducerFile';
import Details_form from './formcomponent';
import Pagediv from './datacomponent';
import fullDetailsshowdiv from './fulldetailscomponent';
import homepage from './homepagecomponent';
import { request , checkfunc } from './functionsfile';
import $ from 'jquery';
request("/getdetails" , {});
var renderFun = () => {
      ReactDOM.render(
          <Router history = {browserHistory} >
          <Route path = "/add" component = {Details_form}  value={store.getState()} />
          <Route path = "/view"  component = {Pagediv} />
          <Route path = "/edit/*" component = {Details_form} />
          <Route path = "/details/*" component = {fullDetailsshowdiv} />
          <Route path = "*" component = {homepage} />
          </Router> , bundlediv  );
  }
  const store = createStore(detailsFormReducer);
  export default store;
  store.subscribe(renderFun);
  renderFun();
