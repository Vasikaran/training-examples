import {headDiv} from "./homecomponent.js";
import style from '../App/employee.css';
import $ from "jquery";
import { Router, Route, browserHistory} from 'react-router';
import React, { Component } from 'react';
import * as executefunc from "./appfunctions.js";
import {employeEditId } from "./formcomponent.js";
let len = 1;
class EmployeeDetails extends Component{
    componentWillMount(){
        let employeEditId = this.props.params;
        let parampage = 0; let statusemp = "first"; let employee = {};
        $.post("/getEmp",function(data,status){
            let allEmp = Object.values(JSON.parse(data));
            let ans = [];
            len = Math.ceil(allEmp.length/10);
            if (employeEditId.pageNum == 0 || employeEditId.pageNum == undefined || employeEditId.pageNum == 1){
               parampage = 1;
            } else{
               parampage = employeEditId.pageNum;
               statusemp = (parampage-1);
            }
            ans = executefunc.tenEmps(allEmp,statusemp);
            executefunc.AllEmpDetails(allEmp,ans);
            if (allEmp.length == 0){
               browserHistory.push("/Employeedetails");
            } else{
               browserHistory.push("/Employeedetails/page/"+(parampage));
            }


       });
    }

    render(){
      let array = [];
      console.log(len);
      if (len > 1){
          for(let i=0;i<len;i++){
            array.push(<input type="button" value={i+1} id={i} onClick={(e) => executefunc.DetailsName(e)} className={style.page}></input>);
          }
      }
      let emnt = executefunc.store.getState().AllEmpsPage.ans.map((elem,ind) => {
          return (
            <div>
                <button className={style.emptxt} id={ind} onClick={(e) => executefunc.getDetails(e)}>{JSON.parse(elem).Name}</button>
                <div className={style.changeEmpDet}>
                    <i className={["fa","fa-edit",style.empEdit].join(" ")} id={ind} name={JSON.parse(elem).employeeID} onClick={(e)=> executefunc.editEmpDetails(e)}></i>
                    <i className={["fa","fa-trash",style.empDel].join(" ")} id={ind} name={JSON.parse(elem).employeeID} onClick={(e)=> executefunc.delDetail(e)}></i>
                </div>
            </div>
          );
      });

      return(
          <div>
              {headDiv}
              <div className={style.second}>
                  {emnt}
              </div>
              <div className={style.btnDiv} >
                  {array}
              </div>
          </div>
      );
   }
}
export {EmployeeDetails};
