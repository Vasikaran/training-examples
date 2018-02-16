import React from "react";
import {store} from "./full.js";
 import {Register} from './register.js';
  import {Button} from './button.js';
const  Input = (props) => <input className="ip" value={props.value}   name={props.name} onChange={props.fun} />

const  Ptag = (props)=> <p className="req" > {props.name}</p>

const  Validation = (props) => <div className="error" > {props.name}</div>



export class Page extends React.Component{
  add(att){
      let  objt = store.getState().page;
      let temp1 = store.getState().details.list1;
          if(att.target.name == "submit") {
                  store.dispatch({
                      type: "visible",
                      payload : false
                   });

          if(temp1.length <= 11) {
              if( temp1.length == 11 ){
                 store.dispatch({
                   type: "reset",
                   payload : []
                 });
              }
           }
           Object.keys(objt.input).forEach(function(ip){
              //if(objt.input[ip].regex.test(objt.input[ip].value)){
              if(true){
                objt.input[ip].error = "";
              }else{
                  objt.input[ip].error = objt.input[ip].wrong;
               }
           });
              store.dispatch({
                  type: "update",
                  payload : objt.input
               });

       if(objt.input.name.error == "" && objt.input.id.error == "" && objt.input.no.error == "" && objt.input.mail.error == "" && objt.input.reason.error == "" && objt.input.from.error == "" && objt.input.to.error == ""){
              let obj = [];
             Object.keys(objt.input).forEach(function(ip){
                 obj.push(objt.input[ip].value)
                 objt.input[ip].value = "";
              });
                    store.dispatch({
                      type: "page",
                      payload : obj
                    });

                    store.dispatch({
                      type: "list1",
                      payload : ""
                    });

                    store.dispatch({
                        type: "update",
                        payload : objt.input
                    });
       }
   }else if(att.target.name == "cancel"){
       Object.keys(objt.input).forEach(function(ip){
              objt.input[ip].value = "";
              objt.input[ip].error = "";
          });

        store.dispatch({
          type : "update",
          payload : objt.input
        });

    }   else {
             objt.input[att.target.name].value = att.target.value;
                  store.dispatch({
                    type: "update",
                    payload : objt.input
                  });
        }
 }


render(){
var formObj = store.getState().page;
var funn = this.add.bind(this);
return <div>
         <div id="box">
            <div id="form">
               <div className="head">Leave Tracker</div>
               <div id="req_box">{
                    Object.keys(formObj.input).map((val, ind)=> <Ptag  name={ formObj.input[val].req }/>)
               }</div>
               <div id="in_box">{
                    Object.keys(formObj.input).map((val, ind)=>{
                       return <div>
                                <Input id={ind+1} name={val} fun={funn} value={formObj.input[val].value}/>
                                <Validation name = {store.getState().page.input[val].error} />
                              </div>
                    })
                }</div>
               <div className="head">
                  <button className="bt" name="submit" onClick={this.add.bind(this)} >Submit</button>
                  <button className="bt" name="cancel" onClick={this.add.bind(this)} >Cancel</button>
               </div>
            </div>
            <div id="view">
               <Register fun={this.regstate} states={this.state} />
               <Button   fun={this.regstate} states={this.state} />
            </div>
         </div>
        </div>
}
}
