import * as executefunc from "./appfunctions.js";
import React, { Component } from 'react';
import $ from "jquery";
let len,employeEditId,Details;
import style from '../App/employee.css';
import {updatedv} from "./homecomponent.js";
const place = ["Name", "Phone", "Email", "Gender", "CompanyName", "Designation", "MonthlyInc", "Experience"];
class CreateForm extends Component{
    constructor(props){
        employeEditId = props.params.empId;
        super();
    }
    componentWillMount(){
        $.post("/getEmp",function(data,status){
            let allEmp = Object.values(JSON.parse(data));
            let employee = {};
            if(employeEditId !== undefined){
                employee = allEmp.filter((emp) =>{
                    if (employeEditId == JSON.parse(emp).employeeID){
                       return emp;
                    }
                });
                executefunc.store.dispatch({
                  type    : "editState",
                  payload : employee[0]
                });
            }
        });
    }
    render(){
        return(
            <div>
                <div className={style.heading}>
                    <span>Employee Details</span>
                    <button className={[style.chngbtn,"btn","btn-info"].join(" ")} onClick={() => executefunc.EmployeeDetailsForm()}>Employee Details</button>
                   </div>
                <div className={style.first} >
                   { <p className={style.txt} >Add Details</p>}
                   {
                           place.map((separate,ind) =>{
                               return <input onChange={(e) => executefunc.setDetail(e)} placeholder={separate} id={separate} value={executefunc.store.getState().oneEmp[separate]} className={style.ipt} ></input>
                        })
                   }
                   {updatedv}
               </div>
            </div>
        );
    }
}
export {CreateForm, len, employeEditId, Details};
