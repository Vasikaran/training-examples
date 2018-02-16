import React, { Component } from 'react';
import { Router, Route, browserHistory} from 'react-router';
import * as executefunc  from "./appfunctions.js";
import $ from "jquery";
import {headDiv} from "./homecomponent.js";
import style from '../App/employee.css';
import {len, employeEditId} from "./formcomponent.js";
let Details = [];
class ShowEmpDetails extends Component{
    componentWillMount(){

        let allEmp = executefunc.store.getState().AllEmpsPage.AllEmployees;
        let employeEditId = this.props.params;
        if (employeEditId.empId !== undefined || employeEditId.empId == undefined) {
            if (allEmp.length != 0){
                Details = executefunc.getEmployeeDetails(allEmp, employeEditId.empId);
                Details = JSON.parse(Details[0]);
            } else{
                $.post("/getEmp",function(data,status){
                    allEmp = Object.values(JSON.parse(data));
                    let ans = [];
                    let len = Math.ceil(allEmp.length/10);
                    ans = executefunc.tenEmps(allEmp);
                    executefunc.AllEmpDetails(allEmp,ans);
                    Details = executefunc.getEmployeeDetails(allEmp, employeEditId.empId);
                    Details = JSON.parse(Details[0]);
                    browserHistory.push("/showemployeedetails/"+Details.employeeID);
                });
            }
        }else{
            browserHistory.push("/Employeedetails/page/1");
        }
    }
    render(){
        return(
           <div>
               {headDiv}
               <div className={style.second} >
                   <p className={style.detailtxt} >Name         : {Details.Name}</p>
                   <p className={style.detailtxt} >Phone        : {Details.Phone}</p>
                   <p className={style.detailtxt} >Email        : {Details.Email}</p>
                   <p className={style.detailtxt} >Gender       : {Details.Gender}</p>
                   <p className={style.detailtxt} >Company Name : {Details.CompanyName}</p>
                   <p className={style.detailtxt} >Designation  : {Details.Designation}</p>
                   <p className={style.detailtxt} >Monthly Inc  : {Details.MonthlyInc}</p>
                   <p className={style.detailtxt} >Experience   : {Details.Experience}</p>
                   <button onClick={() => executefunc.ChangeBool()} className={["btn",style.bck].join(" ")}>Back</button>
               </div>
           </div>
       );
    }
}

export {len, Details , employeEditId, ShowEmpDetails};
