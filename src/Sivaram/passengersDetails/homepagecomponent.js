import store from './passengers_details_js';
import React , {Component} from 'react';
import {browserHistory} from 'react-router';
const homepage = () => {
  return  <div className = "homepagediv">
          <button className = "homebutton" onClick={() => {browserHistory.push("/add")}}>Add Details</button>
          <button className = "homebutton" onClick={() => {store.dispatch({type : "RERENDER"}) ; browserHistory.push("/view")}}>Show Details</button>
        </div>
}
export default homepage;
