import React from 'react';
import callback from "./callback.js";
import "../style/index.css";

const list = (ele,i,props) => {
   let values = Object.values(ele);
   let classNam = "slide";
   if (props.detail.visibleId == props.detail.startIndex+i+1){
       classNam+="1";
   }
   return (
       <div>
           <div id={props.detail.startIndex+i+1} onClick={(e) => props.classChanger("classChanger",e,props.detail.visibleId)} className="all">
           {props.detail.startIndex+i+1+". "+values[1]}
           </div>
       <div className={classNam}>{values.map(callback)}</div>
       </div>);   
}

export default list;