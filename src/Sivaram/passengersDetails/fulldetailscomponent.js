import store from './passengers_details_js';
import React , {Component} from 'react';
import {browserHistory} from 'react-router';
const fullDetailsshowdiv = () => {
    let currentstate = store.getState();
    let details_obj = currentstate.detailsobj;
    let detailsobjref =[];
    let index = 0 ;
    console.log(currentstate.detailsshowid);
    if (!((details_obj[currentstate.detailsshowid])==undefined)){
        let valuesofobject = Object.values(details_obj[currentstate.detailsshowid]);
        let keysofobject = Object.keys(details_obj[currentstate.detailsshowid]);
        for( let i of valuesofobject) {
         detailsobjref.push(<p>{`${keysofobject[index]} : ${i}`}</p>)
         index++;
        }
      return <div className = "pagediv" id ="maxshowdiv">{detailsobjref}
      <button className = "homebutton" onClick = {() => { store.dispatch({type : "RERENDER"}) ; browserHistory.push("/add") }} >Add Details</button>
      <button className = "homebutton" onClick = {() => { store.dispatch({type : "RERENDER"}) ; browserHistory.push("/view")}} >View Details</button>
      </div>
    }
}
export default fullDetailsshowdiv;
