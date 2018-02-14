import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore,  combineReducers } from 'redux';
import { Router, Route, browserHistory} from 'react-router';
let len,employeEditId,Details;
const place = ["Name", "Phone", "Email", "Gender", "CompanyName", "Designation", "MonthlyInc", "Experience"];
const updatedv = <div className="btnDv">
	                 <button onClick={() => SaveDetail(store.getState().oneEmp)} className="sbtn btn btn-primary" >Save</button>
	                 <button onClick={() => CancelDetail()} className="sbtn btn btn-primary btn2" >Cancel</button>
	               </div>
const headDiv  = <div className="heading">
                    <span>Employee Details</span>
                    <input className="srchInpt" placeholder="Search Name" onChange={(e) => searchName(e)}/>
                    <button className="chngbtn btn btn-info" onClick={() => addEmployeeForm()}>Add Employee</button>
                 </div>
                 class HomeComponent extends React.Component{
                 	            render(){
                 	                return(
                 	                    <div>
                         	                <div className="heading">
                             	                <span>Employee Details</span>
                             	            </div>
                                             <div className="underDiv" >
                                                 <div className="btnDivs">
                                                     <button className="btn btn-primary" onClick={() => addEmployeeForm()} >Add Employee</button>
                                                     <button className="btn btn-primary" onClick={() => EmployeeDetailsForm()} >Employee Details</button>
                                                 </div>
                                             </div>
                                         </div>
                                     );
                 	            }
                 	        }

                 	        class CreateForm extends React.Component{
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
                 	                        store.dispatch({
                                         	    type    : "editState",
                                         	    payload : employee[0]
                                             });
                     	                }
                 	                });
                 	            }
                 	            render(){
                 	                return(
                 	                    <div>
                 	                        <div className="heading">
                                     	        <span>Employee Details</span>
                                     	        <button className="chngbtn btn btn-info" onClick={() => EmployeeDetailsForm()}>Employee Details</button>
                                             </div>
                 	                        <div className="first" >
                         	                   { <p className="txt" >Add Details</p>}
                         	                   {
                                                     place.map((separate,ind) =>{
                                                         return <input onChange={(e) => setDetail(e)} placeholder={separate} id={separate} value={store.getState().oneEmp[separate]} className="ipt" ></input>
                         	                        })
                         	                   }
                         	                   {updatedv}
                         	               </div>
                 	                    </div>
                 	                );
                 	            }
                 	        }

                 	        class EmployeeDetails extends React.Component{
                 	            componentWillMount(){
                 	                employeEditId = this.props.params;
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
                         	            ans = tenEmps(allEmp,statusemp);
                     	                AllEmpDetails(allEmp,ans);
                         	            if (allEmp.length == 0){
                         	               browserHistory.push("/Employeedetails");
                         	            } else{
                         	               browserHistory.push("/Employeedetails/page/"+(parampage));
                         	            }


                     	           });
                 	            }

                 	            render(){
                     	                let array = [];
                     	                if (len > 1){
                     	                    for(let i=0;i<len;i++){
                                                 array.push(<input type="button" value={i+1} id={i} onClick={(e) => DetailsName(e)} className="page"></input>);
                                             }
                     	                }
                     	                let emnt = store.getState().AllEmpsPage.ans.map((elem,ind) => {
                     	                   return (<div>
                             	                       <button className="emptxt" id={ind} onClick={(e) => getDetails(e)}>{JSON.parse(elem).Name}</button>
                             	                       <div className="changeEmpDet">
                             	                            <i className="fa fa-edit empEdit" id={ind} name={JSON.parse(elem).employeeID} onClick={(e)=> editEmpDetails(e)}></i>
                             	                            <i className="fa fa-trash empDel" id={ind} name={JSON.parse(elem).employeeID} onClick={(e)=> delDetail(e)}></i>
                             	                       </div>
                     	                           </div>
                     	                   );
                     	                })

                     	                return(
                     	                    <div>
                     	                        {headDiv}
                     	                        <div className="second">
                                                     {emnt}
                                                 </div>
                                                 <div className="btnDiv" >
                                                     {array}
                                                 </div>
                     	                    </div>
                     	                );
                 	                }
                 	        }

                 	        class ShowEmpDetails extends React.Component{
                 	            componentWillMount(){
                 	                Details = [];
                 	                let allEmp = store.getState().AllEmpsPage.AllEmployees;
                 	                employeEditId = this.props.params;
                 	                if (employeEditId.empId !== undefined || employeEditId.empId == undefined) {
                     	                if (allEmp.length != 0){
                         	                Details = getEmployeeDetails(allEmp, employeEditId.empId);
                         	                Details = JSON.parse(Details[0]);
                         	            } else{
                     	                    $.post("/getEmp",function(data,status){
                         	                    allEmp = Object.values(JSON.parse(data));
                         	                    let ans = [];
                             	                len = Math.ceil(allEmp.length/10);
                             	                ans = tenEmps(allEmp);
                             	                AllEmpDetails(allEmp,ans);
                             	                Details = getEmployeeDetails(allEmp, employeEditId.empId);
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
                         	               <div className="second" >
                         	                   <p className="detailtxt" >Name         : {Details.Name}</p>
                                 	           <p className="detailtxt" >Phone        : {Details.Phone}</p>
                                 	           <p className="detailtxt" >Email        : {Details.Email}</p>
                                 	           <p className="detailtxt" >Gender       : {Details.Gender}</p>
                                 	           <p className="detailtxt" >Company Name : {Details.CompanyName}</p>
                                 	           <p className="detailtxt" >Designation  : {Details.Designation}</p>
                                 	           <p className="detailtxt" >Monthly Inc  : {Details.MonthlyInc}</p>
                                 	           <p className="detailtxt" >Experience   : {Details.Experience}</p>
                         	                   <button onClick={() => ChangeBool()} className="btn bck">Back</button>
                         	               </div>
                         	           </div>
                     	           );
                 	            }
                 	        }

                 	        const getEmployeeDetails = (allEmp,empId) =>{
                 	            return allEmp.filter((emp) =>{
                             	    if (empId == JSON.parse(emp).employeeID){
                             	        return JSON.parse(emp);
                             	    }
                     	        });
                 	        }

                 	        const addEmployeeForm = () => {
                 	            CancelDetail();
                 	            browserHistory.push("/AddEmployee");
                 	        }

                 	        const EmployeeDetailsForm = () => {
                 	            browserHistory.push("/Employeedetails/page/1")
                 	        }

                 	        const ChangeBool  = () => {
                         	    browserHistory.push("/Employeedetails/page/1")
                             }

                 	        const setDetail = (e) => {
                 	            let actionCase = e.target.id;
                         	    let actionVal  = e.target.value;
                         	    var  obj = {}
                         	    obj[actionCase] = actionVal
                         	    store.dispatch({
                                     type: "setDetail" ,
                                     payload: obj
                                 });
                 	        }

                 	        const SaveDetail = (newEmp) => {
                         	    if (newEmp.Name == "" || newEmp.Phone == "" || newEmp.Email == "" || newEmp.Gender == "" || newEmp.CompanyName =="" || newEmp.Designation == "" || newEmp.MonthlyInc == "" || newEmp.Experience == "" ){
                         	        alert("Please Enter All Details");
                         	    } else{
                         	        let statusemp = "first";
                         	        $.post("/setEmp",{
                             	       "Empobj" : JSON.stringify(newEmp)
                                 	},function(data,status){
                                 	    let allEmp = Object.values(JSON.parse(data));
                                 	    len = Math.ceil(allEmp.length/10);
                                 	    let ans    = tenEmps(allEmp);
                                 	    AllEmpDetails(allEmp, ans);
                                 	    CancelDetail();
                                 	    browserHistory.push("/Employeedetails/page/"+len);
                                 	});
                         	    }
                         	}

                 	        const CancelDetail = () => {
                 	            store.dispatch({
                         	        type    : "Cancel",
                         	        payload : "Ok"
                         	    });
                         	}

                 	        const tenEmps = (newDet,statusemp) => {
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

                 	        const AllEmpDetails = (totalEmps,firstTen) => {
                         	   store.dispatch({
                         	       type    : "SetAllEmp",
                         	       payload : { totalEmps, firstTen }
                         	   })
                         	}

                 	        const searchName = (e) => {
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
                 	            }
                                 else{
                                     let totalEmps = store.getState().AllEmpsPage.AllEmployees;
                                     let firstTen = tenEmps(totalEmps,"first");
                                     AllEmpDetails(totalEmps, firstTen);
                                 }
                 	        }

                 	        const DetailsName = (e) => {
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

                 	        const getDetails = (e) =>{
                 	            let empid = store.getState().AllEmpsPage.ans[e.target.id];
                 	            browserHistory.push("/showemployeedetails/"+JSON.parse(empid).employeeID);
                 	        }

                 	        const editEmpDetails = (e) => {
                 	            let empIds = store.getState().AllEmpsPage.ans[e.target.id];
                 	            store.dispatch({
                             	    type    : "editState",
                             	    payload : empIds
                                 });
                                 browserHistory.push("/EditEmployee/"+JSON.parse(empIds).employeeID);
                             }

                 	        const delDetail = (e) => {
                         	    $.post("/delEmployee",{"employeeID":e.target.getAttribute('name')},function(data,status){
                         	        var deletedReturnemp = Object.values(JSON.parse(data));
                         	        len = Math.ceil(deletedReturnemp.length/10);
                         	        AllEmpDetails(deletedReturnemp, tenEmps(deletedReturnemp));
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

                 	        var AllEmpReducer = (state = { AllEmployees : [], page : 1,ans : [],currentPage : 1 },action) => {
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

                             render();
                 	        function render() {
                     	        ReactDOM.render(
                     	            <Router history={browserHistory}>
                                         <Route path="/" component={HomeComponent} />
                                         <Route path="/AddEmployee" component={CreateForm} />
																				 <Route path="/Employeedetails" component={EmployeeDetails} >
																				 			<Route path="/Employeedetails/page/:pageNum" component={EmployeeDetails}/>
																				 </Route>
                                         <Route path="/showemployeedetails/:empId" component={ShowEmpDetails} />
                                         <Route path="/EditEmployee/:empId" component={CreateForm} />
                                     </Router>,
                                     maindiv
                                 );
                 	        }
                 	        store.subscribe(render);
