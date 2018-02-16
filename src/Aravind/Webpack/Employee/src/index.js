import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory} from 'react-router';
import * as executefunc from "./appfunctions.js";
import {HomeComponent} from "./homecomponent.js";
import {CreateForm} from "./formcomponent.js";
import {EmployeeDetails} from "./detailscomponent.js";
import {ShowEmpDetails} from "./showdetailscomponent.js"
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
executefunc.store.subscribe(render);
