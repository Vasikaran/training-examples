
import React from "react";
import ReactDOM from "react-dom";
import {Router,Route,browserHistory} from "react-router";
import {createStore,combineReducers} from "redux";
 // var IndexRoute = ReactRouter.IndexRoute;
 // var Link = ReactRouter.Link;
 import {Provider,connect} from "react-redux";

 import {Page} from './page.js';
 import {Register} from './register.js';
  import {Button} from './button.js';

 const input ={ name : { value : "",
                         error : "",
                           req : "Name : ",
                         wrong : " Invalid name! ",
                         regex :/[a-zA-Z]{3,101}/
                        },

                  id : { value : "",
                         error : "",
                           req : "Employee ID : ",
                         wrong : "Invalid employee ID!",
                         regex :/^[Tt][Zz][0-9]{3,5}/
                        },

                  no : { value : "",
                         error : "",
                           req : "Contact NO : ",
                         wrong : "Invalid Mobilenumber!",
                         regex :/[0-9]{10}/
                       },

                mail : { value : "",
                         error : "",
                           req :"Mail ID : ",
                         wrong : "Invalid mail!",
                         regex :/^[a-z0-9\.]{3,50}(@zohocorp.com)$/
                        },

              reason : { value : "",
                         error : "",
                           req : "Reason : ",
                         wrong : "Inavlid Text!",
                         regex : /[\w.-_?]{1,200}/
                        },

                from : { value : "",
                         error : "",
                           req : "From Date : ",
                         wrong : "Invalid Date!",
                         regex :/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
                        },

                  to : { value : "",
                         error : "",
                           req : "To Date : ",
                         wrong : "Invalid Date!",
                         regex :/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
                        },
              }

 const formreducer = (state = { input },action) => {
    switch (action.type) {
       case "update" :
         state =  Object.assign({},state,
                   action.payload)
       break;
      }
     return state;
 }

 const pagereducer = (state = { list1 :[] ,list2 : [[]], index : -1 , show : false },action) => {

      switch (action.type) {
            case "list1" :
                 state =  Object.assign({},state,
                    {list1:[...state.list2[state.list2.length-1]]})

                break;

            case "singlepage" :
            state =  Object.assign({},state,
                    {list1:   action.payload})
                break;

            case "page" :
                state =  Object.assign({},state,
                 {list2: [...state.list2.slice(0,-1),[...state.list2[state.list2.length-1],action.payload]]})
                break;

            case "index" :
            state =  Object.assign({},state,
                     {index : action.payload});
                break;

            case "visible" :
            state =  Object.assign({},state,
                      {show: action.payload})
                break;
            case "reset" :
                state =   Object.assign({},state,
                   {list2: state.list2.concat([action.payload])});

                break;
      }
      return state;
 }

export  const store = createStore( combineReducers( {details : pagereducer, page : formreducer } ),{} );
          render();
          function render(){
             ReactDOM.render(
                <Router history = {browserHistory}>
                  <Route path="/*" component={Page} />
                </Router>,
                document.getElementById("app")
             );
          }
          store.subscribe(render);
