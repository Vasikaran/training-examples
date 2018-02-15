import React, { Component } from 'react';
import {Route,Router,browserHistory} from "react-router";
import ReactDOM from 'react-dom';
import {createStore,combineReducers} from "redux";
import $ from "jquery";
var orderDetails = (state,props) =>{
    let alldetails = store.getState().index.allDetail;
    let list = [];
        if (props*10 <=alldetails.length){
        for (let i=(props*10)-10;i<(props*10);i++){
            list.push(alldetails[i]);
        }
        }
        else{
            for (let i=(props*10)-10;i<alldetails.length;i++){
            list.push(alldetails[i]);
        }
        }
        return {
          ... state,
          studentDetailsList : list
      }
}
var InputElement = (props) =>{
   return <input placeholder={props.placeholder}  title={props.title} value={props.value} onChange ={props.method} />
}
const indexReducer = (state = {
            name : "",
            age : "",
            dob : "",
            gender:"",
            photo:"",
            rollno:"",
            standard:"",
            bloodgroup:"",
            allDetails : "",
            check : true,
            search : "",
            edit : true,
            searchCheck : true,
            allDetail : [],
            empty : true,
}, action) => {
    switch (action.type) {
        case "ADD_DETAILS":
            let val = state;
            if (val.name != "" && val.age != "" && val.dob != "" && val.gender != ""&& val.photo != ""&& val.rollno != "" && val.standard != "" && val.bloodgroup != ""){
                   state = {
                         ...state,
                        name : "",
                        age : "",
                        dob : "",
                        gender:"",
                        rollno:"",
                        photo : "",
                        standard:"",
                        bloodgroup:"",
                        allDetails : state,
                        edit : true,
                        empty : false,
            };
        }
        break;
        case "CHANGE_STATE":
            state = {
                ...state,
                allDetails : action.payload,
                check : false
            };
        break;
        case "SET_VALUE":
            state = {
                ...state,
                ...action.payload
                };
        break;
        case "EDIT_VALUE":
            state = {
                ...state,
                ...action.payload,
                edit : false,
                };
        break;
        case "STORE_VALUES":
            let props = action.payload;
            state = {
                ...state,
                allDetail : action.payload,
            }
            break;
        case "EMPTY_CHECK":
            state = {
                ...state,
                empty : true,
            }
          break;
    }
    return state;
};
function ajax (url,obj,dispat) {
    let page = 0;
    let check = true;
    if (/^\/list\/(|page\/)[0-9]+$/.test(location.pathname)){
        page = location.pathname.split("/");
        if (location.pathname.indexOf("page") != -1){
            page = {"path":"STORE_DETAILS","pageno":page[3]};
            check = false;
        } else {
            page = {"path":"CHANGE_STATE","pageno":page[2]};
        };
    } else if (/^\/edit\/[0-9]+$/.test(location.pathname)){
        page = location.pathname.split("/");
        page = {"path" :"EDIT_VALUE","pageno" :page[2]};
    }
    $.post( url,obj, function( data ) {
        data = JSON.parse(data);
        dispat({
           type : "STORE_VALUES",
           payload : data,
       });
           if (page != 0){
               let arr = store.getState().index.allDetail;
               if (page["path"] == "CHANGE_STATE" || page["path"] == "EDIT_VALUE"){
                    for (let i of arr){
                        if (i["ID"] == page["pageno"]){
                            page["pageno"] = i;
                            check = false;
                            break;
                        }
                    }
                    if (check){
                         browserHistory.push("/list/page/1");
                    }
               } else if (page["path"] == "STORE_DETAILS"){
                   let pg = page["pageno"];
                   if (arr.length <= pg*10-10){
                         page["pageno"] = 1;
                         browserHistory.push("/list/page/1");
                   }
               }
           }
           if (!check){
           dispatch({
                type: page.path,
                payload: page.pageno
            });
           }
        if (data.length > 0){
             dispat({
           type : "STORE_DETAILS",
           payload : data,
       });
       dispat({
           type : "CHANGE_LENGTH",
           payload : data.length,
       });
    }
});
};
var StoreDetails = (e) => {
            dispatch({
                type: "STORE_DETAILS",
                payload: e.target.value
            });
};
var cancel = (e) =>{
    dispatch({
        type : "ADD_DETAILS",
        payload : "OK",
    });
    browserHistory.push(e);
}
var goBack = () => {
            let pg = store.getState().show.page;
            browserHistory.push("/list/page/"+pg);
            dispatch({
                type: "GO_BACK",
                payload : pg
            });
};
var selectPage = (e) => {

    $("button").blur();
            dispatch({
                type: "STORE_DETAILS",
                payload: e.target.textContent
            });
        browserHistory.push("/list/page/"+e.target.textContent);
};
var ChangeValue = (typ,e) =>{
    var obj = {};
    obj[typ] = e.target.value;
            dispatch({
                type: "SET_VALUE",
                payload: obj
            });
};
var addDetails = (stat) => {
    dispatch({
                type: "ADD_DETAILS",
                payload: "OK"
            });
            if(!store.getState().index.empty){
             ajax("/addDetails",stat,dispatch)
             ajax("/getdetails",{},dispatch)
             dispatch({type : "EMPTY_CHECK"})
            }
};
var changeDetails = (stat) => {
             dispatch({
                type: "ADD_DETAILS",
                payload: "OK"
            });
             if(!store.getState().index.empty){
             ajax("/edit",stat,dispatch);
             ajax("/getdetails",{},dispatch);
             dispatch({type : "EMPTY_CHECK"})
            }
};
 var changeState = (e) => {
     dispatch({
                type : "CHANGE_STATE",
                payload : e
            });
        browserHistory.push("/list/"+e["ID"])
};
var editDetails = (value) => {
    dispatch({
                type : "EDIT_VALUE",
                payload : value
            });
    browserHistory.push("/edit/"+value.ID);
};
var delDetail = (value,length,page) => {
    if (length == 1 && page > 1){
         dispatch({
                type: "STORE_DETAILS",
                payload: page-1
            });
    };
    ajax("/delete",{"id":value.ID},dispatch)
};
var searchPerson = (e) =>{
     if (e.target.value == ""){
        ajax("/getdetails",{},dispatch);
        dispatch ({
            type : "SET_VALUE",
            payload : {"search" : "","searchCheck" : true, timeout : ""}
        });
     } else {
         let value = e.target.value;
         let timeout = store.getState().index.timeout;
         if (value.length > 1){
                clearTimeout(timeout);
         }
         timeout = setTimeout(() =>{
            ajax("/search",{"search" : value},dispatch);
             dispatch({
                    type: "SET_VALUE",
                    payload: {"searchCheck":true}
                });
        },2000);
       dispatch({
                    type: "SET_VALUE",
                    payload: {"search" : value,"searchCheck":false,"timeout":timeout}
                });
    }
}
const showReducer = (state = {
           studentDetailsList : [],
            check : true,
            page : 1,
}, action) => {
    switch (action.type) {
         case "GO_BACK":
        state = {
            ...state,
            check : true
        };
        break;
        case "CHANGE_STATE":
        state = {
            ...state,
            check : false
        };
        break;
        case "RE_ARRANGE":
        state = {
            ...state,
            page : action.payload
        };
        break;
        case "STORE_DETAILS":
            let alldetails = store.getState().index.allDetail;
            let props = action.payload;
            if (props % 1 != 0){
            let array = [];
            if (alldetails.length > 11){
            state = {
                        ...state,
                        studentDetailsList : alldetails.slice(0,10)
                    }
            }else if (alldetails.length > 0 && alldetails.length < 11) {
                 state = {
                        ...state,
                        studentDetailsList : alldetails.slice(0,alldetails.length)
                    }
            }
            if (store.getState().show.page != 0){
                state = orderDetails(state,store.getState().show.page)
            }
            if (state.check == false){
              state = {
                      ...state,
                      check : true
                  }
              }
            }
          else if (props %1 == 0){
              if (state.check == false){
                  state = {
                      ...state,
                      check : true
                  };
              }
              state = {
                  ...state,
                  page : props
              };
              state = orderDetails(state,props)
            }
        break;
    }
    return state;
};
const pageReducer = (state = {
    length : 0
},action) => {
     switch (action.type) {
        case "CHANGE_LENGTH":
            state = {
                ...state,
                length : action.payload
            }
    }
    return state;
}
var RenderDetails = (props) =>{
        let person = props.method;
        let value = props.alldetail.studentDetailsList;
        if (value[0] == undefined){
            value = [];
        };
        if (props.alldetail.check){
            if (value.length == 0){
                return <div id="detail">No Details Added</div>
            }
            else{
                 return (<div>{value.map(function(cv,ind){
                     return <div><p id='detail' onClick={() => person(value[ind])}>{cv.name}</p>
                    <i className="fa fa-edit" id="iconEdit" onClick={() => editDetails(value[ind])}></i>
                     <i className="fa fa-trash" id="iconDel" onClick={() => delDetail(value[ind],value.length,props.alldetail.page)}></i></div>
                     })}</div>);
            }
        }
}
var Pages = (props) => {
        let val = Math.ceil(props.value.length/10);
        let value = [];
        for(let i = 1;i<=val;i++){
            if (store.getState().show.page == i){
                value.push(<button  className = "select btn btn-primary" onClick = {selectPage}>{i}</button>);
            } else{
                value.push(<button  className = "btn btn-primary" onClick = {selectPage}>{i}</button>);
            }
        }
        return <div>{value}</div>
}
class GetDetail extends Component{
    render(){
        let props = this.props.value;
        let save;
        if (props.index.edit){
            save = <button className = "btn btn-primary" onClick = {() => {addDetails({...props.index})}}>Add</button>;
        } else {
            save = <div id="changeButton"><button className = "btn btn-primary" onClick = {() => {browserHistory.push("/list/page/"+store.getState().show.page);changeDetails({...props.index})}}>Save</button><button className="btn btn-primary" onClick={() => cancel("/add")}>Cancel</button></div>;
        }
        return (
        <div>
            <div id="header"><button className = "btn btn-primary" onClick={() => browserHistory.push("/home")}><i className="fa fa-hand-o-left"></i> Home</button><span>Student Details</span></div>
            <div id="search"><button className = "btn btn-primary" onClick={() => cancel("/list/page/"+props.show.page)}>Show Details <i className="fa fa-hand-o-right"></i></button></div>
            <div id="seedetails">
                <div id="Getdetails">
                     <div>
                    <p className="title">Enter Student Detail</p>
                    <InputElement placeholder= "Enter Name" title="Name" value={props.index.name} method = {(e) => ChangeValue("name",e)}/><br / >
                    <InputElement placeholder= "Enter Age" title="Age" value={props.index.age} method = {(e) => ChangeValue("age",e)}/><br / >
                    <InputElement placeholder= "Enter DOB" title="DOB" value={props.index.dob} method = {(e) =>ChangeValue("dob",e)}/><br / >
                    <InputElement placeholder= "Enter Gender" title="Gender"  value={props.index.gender} method = {(e) => ChangeValue("gender",e)}/><br / >
                    <InputElement placeholder= "Enter Photo URL" title="Photo URL"  value={props.index.photo} method = {(e) => ChangeValue("photo",e)}/><br / >
                    <InputElement placeholder= "Enter Roll No" title="Roll No" value={props.index.rollno} method = {(e) => ChangeValue("rollno",e)}/><br / >
                    <InputElement placeholder= "Enter Qualification" title="Qualifcation" value={props.index.standard} method = {(e) => ChangeValue("standard",e)}/><br / >
                    <InputElement placeholder= "Enter BloodGroup" title="Blood Group" value={props.index.bloodgroup} method = {(e) => ChangeValue("bloodgroup",e)}/><br / >
                    {save}
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
class App extends Component {
    componentDidMount(){
        store.subscribe(() => {
                this.forceUpdate()
            });
    }
    render(){
        return (<GetDetail value = {store.getState()}/>);
    }
}
const store = createStore(
    combineReducers({index: indexReducer,show : showReducer,page : pageReducer}),
    {}
);
const dispatch = store.dispatch;
class ShowDetails extends Component{
    componentDidMount(){
        store.subscribe(() => {
                this.forceUpdate()
            });
    }
    render(){
        let searchbox;
        let props = store.getState();
        if (props.index.searchCheck){
            searchbox = <div id="search"><InputElement placeholder= "Search Here" title="Search" value={props.index.search} method = {(e) => searchPerson(e)}/></div>
        } else {
            searchbox = <div id="search"><InputElement placeholder= "Search Here" title="Search" value={props.index.search} method = {(e) => searchPerson(e)}/><img id="loading" src="http://bit.ly/2GD5zPw" /></div>
        }
        return (
            <div>
             <div id="header"><button className = "btn btn-primary" onClick={() =>cancel("/add")}><i className="fa fa-hand-o-left"></i> Add Detail</button><span>Student Details</span></div>
             {searchbox}
            <div id="Showdetails"><RenderDetails check = {props.index.check} method = {changeState} alldetail = {props.show}/></div><br />
            <div id="pages"><Pages value = {props.page}/></div>
            <div style={{clear:"both"}}></div>
            </div>)
    }
}
class PersonalDetail extends Component{
    componentDidMount(){
        store.subscribe(() => {
                this.forceUpdate()
            });
    }
    render(){
         let value = store.getState().index.allDetails;
         return (<div><div id="alldetail">Details About {value.name}</div><div id="persondetail"><img src={value.photo}/><p>Name : <b> {value.name}</b></p><p>Age : <b>{value.age}</b></p><p>DOB : <b>{value.dob}</b></p><p>Gender : <b>{value.gender}</b></p><p>Roll No : <b>{value.rollno}</b></p><p>Qualification : <b>{value.standard}</b></p><p>Blood Group : <b>{value.bloodgroup}</b></p><button className = "back btn btn-primary" onClick = {goBack}><i className="fa fa-hand-o-left"></i> Back</button></div></div>);
    }
}
var Home = () => {
    return (<div>
            <div id="header1">Student Details</div>
            <div id="homepage">Welcome. Go to <i className="fa fa-hand-o-right"></i>
            <button id="add" className= "btn btn-primary" onClick={() => browserHistory.push("/add")}>Add Details</button><button id="show" className= "btn btn-primary"  onClick={() => browserHistory.push("/list/page/1")}>Show Details</button>
            </div>
            </div>);
}
ajax("/getdetails",{},dispatch)
 ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/home" component={Home} />
    <Route path="/add" component={App} />
    <Route path="/list/page/*" component={ShowDetails} />
    <Route path="/list/*" component={PersonalDetail}/>
    <Route path="/*" component={App} />
  </Router>,
  document.getElementById('allComponent')
);
