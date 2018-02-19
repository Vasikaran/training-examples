import { Router, Route, browserHistory} from 'react-router';
import { createStore, combineReducers } from 'redux';
import $ from "jquery";
import {len , employeEditId} from "./formcomponent.js";
import * as executefunc from "./appfunctions.js";
export const getEmployeeDetails = (allEmp,empId) =>{
      return allEmp.filter((emp) =>{
            if (empId == JSON.parse(emp).employeeID){
                return JSON.parse(emp);
            }
      });
}
export const addEmployeeForm = () => {
      CancelDetail();
      browserHistory.push("/AddEmployee");
}
export const EmployeeDetailsForm = () => {
      browserHistory.push("/Employeedetails/page/1");
}
export const ChangeBool  = () => {
      browserHistory.push("/Employeedetails/page/1");
}
export const setDetail = (e) => {
      let actionCase = e.target.id;
      let actionVal  = e.target.value;
      var  obj = {}
      obj[actionCase] = actionVal
      store.dispatch({
	      type: "setDetail" ,
	      payload: obj
			});
}
export const SaveDetail = (newEmp) => {
      if (newEmp.Name == "" || newEmp.Phone == "" || newEmp.Email == "" || newEmp.Gender == "" || newEmp.CompanyName =="" || newEmp.Designation == "" || newEmp.MonthlyInc == "" || newEmp.Experience == "" ){
          alert("Please Enter All Details");
      } else{
          let statusemp = "first";
          $.post("/setEmp",{
              "Empobj" : JSON.stringify(newEmp)
          },function(data,status){
              let allEmp = Object.values(JSON.parse(data));
              let len = Math.ceil(allEmp.length/10);
              let ans    = tenEmps(allEmp);
              AllEmpDetails(allEmp, ans);
              CancelDetail();
              browserHistory.push("/Employeedetails/page/"+len);
          });
      }
}
export const CancelDetail = () => {
      store.dispatch({
          type    : "Cancel",
          payload : "Ok"
      });
}
export const tenEmps = (newDet,statusemp) => {
      if (newDet.length > 10){
          if(statusemp !== undefined){
                if (statusemp == "first"){
                     	return newDet.slice(0,10);
                } else {
                     	statusemp = (statusemp*10);
                     	return newDet.slice(statusemp, statusemp+10);
                }
          } else {
                return newDet.slice((len-1)*10,newDet.length);
          }
      } else {
          return newDet;
      }
}
export const AllEmpDetails = (totalEmps,firstTen) => {
      store.dispatch({
          type    : "SetAllEmp",
          payload : { totalEmps, firstTen }
      })
}
export const searchName = (e) => {
      let reqname = e.target.value;
      if (reqname != ""){
          $.post("/getSearchEmp",{},function(data,status){
              let allEmps = Object.values(JSON.parse(data));
              let require = allEmps.filter((elem,ind) =>{
		              let rename  = JSON.parse(elem).Name.toLowerCase();
		              if (new RegExp(reqname.toLowerCase()).test(rename.substring(0,reqname.length)) == true){
		                  return elem;
		              }
		        	});
          		AllEmpDetails(allEmps, require);
      		});
        }else{
          let totalEmps = store.getState().AllEmpsPage.AllEmployees;
          let firstTen = tenEmps(totalEmps,"first");
          AllEmpDetails(totalEmps, firstTen);
        }
}
export const DetailsName = (e) => {
      let ind = e.target.id;
      if (ind != 0){
          ind = (ind*10);
      }
      let firstTen = store.getState().AllEmpsPage.AllEmployees.slice(ind, ind+10);
      let page     = e.target.id;
      store.dispatch({
        type    : "ChangePage",
        payload : { page, firstTen }
      });
      browserHistory.push("/Employeedetails/page/"+(Number(page)+1));
}
export const getDetails = (e) =>{
      let empid = store.getState().AllEmpsPage.ans[e.target.id];
      browserHistory.push("/showemployeedetails/"+JSON.parse(empid).employeeID);
}
export const editEmpDetails = (e) => {
      let empIds = store.getState().AllEmpsPage.ans[e.target.id];
      store.dispatch({
          type    : "editState",
          payload : empIds
      });
      browserHistory.push("/EditEmployee/"+JSON.parse(empIds).employeeID);
}
export const delDetail = (e) => {
      $.post("/delEmployee",{"employeeID":e.target.getAttribute('name')},function(data,status){
          var deletedReturnemp = Object.values(JSON.parse(data));
          let len = Math.ceil(deletedReturnemp.length/10);
          AllEmpDetails(deletedReturnemp, tenEmps(deletedReturnemp,"first"));
      });
}
const empReducer =  (state =  {
       Name  : "",
       Phone : "",
       Email : "",
       Gender: "",
       CompanyName :"",
       Designation  : "",
       MonthlyInc   : "",
       Experience   : "" ,
       EmpStatus    : "false",
       employeeID   : ""
    } ,action) =>{
    switch (action.type) {
           case "setDetail":
               state = {
                   ...state,
                   ...action.payload
               };
               break;
           case "Cancel":
               state = {
                  ...state,
                  Name  : "",
               Phone : "",
               Email : "",
               Gender: "",
               CompanyName :"",
               Designation  : "",
               MonthlyInc   : "",
               Experience   : "" ,
               employeeID   : "",
               EmpStatus    : "false"
               };
               break;
           case "editState":
               state = {
                   ...state,
                   ...JSON.parse(action.payload),
               };

               break;
       }
    return state;
}
const AllEmpReducer = (state = { AllEmployees : [], page : 1,ans : [],currentPage : 1 },action) => {
    switch (action.type) {
        case "SetAllEmp":
            state = {
                ...state,
                AllEmployees : action.payload.totalEmps,
                ans          : action.payload.firstTen
            };
            break;
        case "ChangePage":
               state = {
                   ...state,
                   page : action.payload.page,
                   ans  : action.payload.firstTen
               };
              break;
    }
    return state;
}
const store = createStore(
      combineReducers({oneEmp: empReducer, AllEmpsPage : AllEmpReducer}),{}
);

export {empReducer, AllEmpReducer, store};
