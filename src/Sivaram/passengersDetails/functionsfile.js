import store from './passengers_details_js';
import React , {Component} from 'react';
import {browserHistory} from 'react-router';
import detailsFormReducer from './reducerFile'
import $ from 'jquery';
var valuechange = ( e ) => {
    store.dispatch({
        type : "INPUT_VALUE_CHANGE" ,
        targetvalue : e.target.value ,
        id : e.target.id ,
        checkvalue : "" ,
        tempidvalue :""
    })
}
var submitfunc = () => {
    let tempobj = [];
            let Currentvalue = store.getState();
            (Currentvalue.inputtype).map((currentvalue) =>{
                if(Currentvalue[currentvalue]!="" && Currentvalue[currentvalue]!=undefined){
                    tempobj.push(Currentvalue[currentvalue]);
                }
            })
            if(tempobj.length==(Currentvalue.inputtype).length){
                request("/submit" , {name : Currentvalue.Name , age : Currentvalue.Age , gender : Currentvalue.Gender , maritial_status : Currentvalue.Maritial_Status , address : Currentvalue.Address , place : Currentvalue.Place , phonenumber : Currentvalue.Phonenumber , email_id : Currentvalue.Email_Id});
                emptyfunc("check");
            }
    }
    var editfunc = () => {
        let Currentvalue = store.getState();
        request("/edit" , { name : Currentvalue.Name , age : Currentvalue.Age , gender : Currentvalue.Gender , maritial_status : Currentvalue.Maritial_Status , address : Currentvalue.Address , place : Currentvalue.Place , phonenumber : Currentvalue.Phonenumber , email_id : Currentvalue.Email_Id , id : Currentvalue.edit});
        emptyfunc("nocheck");
          browserHistory.push("/add");
}
        var editDetailsShow = (e , ind) => {
            let tempeditid;
            let details_obj = (store.getState()).detailsobj;
            let valuesofobject = [] ;
            let editedid ;
            if(e == "" || e == undefined){
                editedid = ind;
                tempeditid = ind;
                for (let j = 0 ; j < details_obj.length ; j++ ){
                    if(details_obj[j].id == ind){
                        valuesofobject = Object.values(details_obj[j]);
                    }
                }
            } else {
                editedid = details_obj[e.target.id].id;
                valuesofobject = Object.values(details_obj[e.target.id]);
                tempeditid = editedid;
            }
            let index = -1;
            let editdetails = {};
                    for( let i of valuesofobject){
                        if(index>-1){
                            editdetails[(store.getState()).inputtype[index]] = i ;
                        }
                       index++;
                   }
            store.dispatch ({
                type : "INPUT_VALUE_CHANGE" ,
                targetvalue : editdetails ,
                checkvalue : ind ,
                tempidvalue : tempeditid
            })
            browserHistory.push("/edit/" + editedid);
        }
        var fullDetails = ( e , ind) => {
                let currentstate = store.getState();
                let details_obj = currentstate.detailsobj;
            let targetvalue ;
            if (e == "" || e == undefined) {
                targetvalue = ind;
            } else {
                targetvalue = e.target.id;
            }
            store.dispatch({
                type : "SHOW_FULL_DETAILS" ,
                payload : targetvalue
            })
            if(location.pathname != "/details/"+details_obj[targetvalue].id){
                       browserHistory.push("/details/"+details_obj[targetvalue].id)
                   }
            }
        var nextpage = (e) => {
            store.dispatch({
                type : "CHANGE_PAGE" ,
                payload : (((e.target.innerHTML-1)*10)+1)
            })
        }
        var emptyfunc = (val) => {
            let anotherkeyvalue ;
            if(val == "check"){
                anotherkeyvalue = {check : true};
            } else {
                anotherkeyvalue = {};
            }
            ((store.getState()).inputtype).map((Currentvalue)=>{
                            anotherkeyvalue[Currentvalue] = "";
                        })
              store.dispatch({
                  type : "SUBMIT_DETAILS" ,
                  payload : anotherkeyvalue ,
                  checkvalue : ""
              })
        }
        var deletefunc = (e) => {
            let details_obj = (store.getState()).detailsobj;
            request ("/delete" , {id : details_obj[e.target.id].id})
            store.dispatch({
                type : "RERENDER"
            })
            browserHistory.push("/view");
        }
        var searchfunc = (e) => {
                browserHistory.push("/view");
            let currentstate = store.getState();
            store.dispatch({
                type : "SEARCH_OPTION",
                targetvalue : e.target.value
            })
         clearInterval(callbackfunc);
         let callbackfunc = setInterval((request("/search" , {searchquery : e.target.value} )),2000);
        }
        function request(pathname , obj) {
            $.post(pathname , obj ,function(data , status){
                        store.dispatch ({
                            type : "CHANGE_STORE" ,
                            obj : JSON.parse(data)
                        })
                        checkfunc();
                    })
        }
        var checkfunc = () => {
         let details_obj = (store.getState()).detailsobj;
         if(!((location.pathname).startsWith("/edit/") || (location.pathname).startsWith("/details/") || (location.pathname).startsWith("/add") || (location.pathname).startsWith("/view") || (location.pathname).startsWith("/") || (location.pathname).startsWith("/getdetails"))){
         location.href = ("/");
        }
        else{
         if((location.pathname).startsWith("/edit/")){
             let index = (location.pathname).slice(6);
             editDetailsShow( undefined , index);
         } else if((location.pathname).startsWith("/details/")){
             let index = (location.pathname).slice(9);
             let ind ;
             for (let j = 0 ; j < details_obj.length ; j++ ){
                    if(details_obj[j].id == index){
                        ind = j;
                    }
                }
             fullDetails(undefined , ind)
         }
        }
        }
  export  {
    valuechange , submitfunc , editfunc , fullDetails ,
     nextpage , emptyfunc , deletefunc , searchfunc , request , checkfunc , editDetailsShow
  };
