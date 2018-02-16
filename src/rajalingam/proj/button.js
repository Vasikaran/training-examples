import React from "react";
import {store} from "./full.js";
 export class Button extends React.Component{
   invite(bt){
      store.dispatch({
       type: "singlepage",
       payload : store.getState().details.list2[bt.target.name]
    });
                     store.dispatch({
                       type: "visible",
                       payload : false
                     });
   }

   render(){
       var a = this.invite;
         return <div id="page"> <div>{
           store.getState().details.list2.map(function(val,ind){
             return <div>
                <button className="n_page" name={ind} onClick={a}>{ind+1}</button>
                   </div>
           })
       }</div> </div>
   }
}
