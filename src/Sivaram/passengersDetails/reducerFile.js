import store from './passengers_details_js';
import React , {Component} from 'react';
const detailsFormReducer = (state =  {
            Name : "",
            Age : "",
            Gender:"",
            Maritial_Status:"",
            Address:"",
            Place:"",
            Phonenumber:"",
            Email_Id:"",
            mindetail:"",
            maxdeatil:"",
            searchdetails : "",
            minind : 0 ,
            detailsshowid :0,
            details : "",
            check : true,
            edit : "",
            detailsobj : [],
            inputtype : ["Name","Age","Gender","Maritial_Status","Address","Place","Phonenumber","Email_Id"]
        } , action) => {
    switch(action.type){
        case "INPUT_VALUE_CHANGE" :
            let keyvalue ={};
            let editoption;
            if(action.tempidvalue !="" && action.tempidvalue != undefined){
                keyvalue = action.targetvalue;
            } else {
                keyvalue[action.id] = action.targetvalue;
            }
            state = {
                ...state ,
                edit : action.checkvalue ,
                ...keyvalue
                };
            break;
         case "SHOW_FULL_DETAILS" :
           state = {...state , check : false , detailsshowid : action.payload};
           break;
         case "SUBMIT_DETAILS" :
                state = { ...state , ...action.payload , check : true , edit : action.checkvalue} ;
               break;
           case "RERENDER" :
               state = {...state , check : true };
               break;
         case "CHANGE_PAGE" :
            state = { ...state , check : true , minind : (action.payload)-1 }
            break;
         case "SEARCH_OPTION" :
              state = {...state , check : true , searchdetails : action.targetvalue }
              break;
         case "CHANGE_STORE" :
             state = { ...state , detailsobj : action.obj }
      }
      return state;
}
export default detailsFormReducer;
