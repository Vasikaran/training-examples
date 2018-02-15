import store from './passengers_details_js';
import React , {Component} from 'react';
import {browserHistory} from 'react-router';
import Buttons_creation from './buttonscomponent';
import {fullDetails , editDetailsShow , deletefunc , searchfunc } from './functionsfile';
const Pagediv = (props) => {
   let currentstate = store.getState();
   let details_obj = currentstate.detailsobj;
    let detailsobjref = [];
           for (let j= currentstate.minind ; j<Math.min((currentstate.minind+10),details_obj.length) ; j++){
                 let nameAndPlace = Object.values(details_obj[j])[1]+" : "+Object.values(details_obj[j])[6];
                 detailsobjref.push(
                     <div className = "overdetailscon" ><div id={j} className = {"simdetails"} onClick = { fullDetails }>
                           {nameAndPlace}</div>
                           <div className="seperatedetails">
                               <i id = {j} className="fa fa-edit" onClick = { editDetailsShow }></i>
                               <i id = {j} className="fa fa-trash-o" onClick = { deletefunc }></i>
                           </div>
                           </div>
           )
       }
       console.log(detailsobjref);
   return <div><div className = "pagediv"  id="minimumdetailsdiv">
   <input placeholder="Search" className = "searchfield" onChange = {searchfunc} value ={props.search} ></input>
   <div>{detailsobjref}
   <button className = "homebutton" onClick = {() => {browserHistory.push("/add")}} >Add Details</button>
   <button className = "homebutton" onClick = {() => {store.dispatch({type : "RERENDER"}) ; browserHistory.push("/view")}} >View Details</button>
   </div>
   </div>
   <Buttons_creation/>
   </div>
};
export default Pagediv;
