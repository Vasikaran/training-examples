import $ from "jquery";
import {browserHistory} from "react-router";
import store , { dispatch } from "./store";
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
                   if (arr.length <= pg*10-10 || pg == 0 ){
                         page["pageno"] = 1;
                         browserHistory.push("/list/page/1");
                   }
               }
           }
           if (!check){
           dispat({
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
export {
  StoreDetails,
  cancel,
  goBack,selectPage,ChangeValue,addDetails,changeDetails,
  changeState,editDetails,delDetail,searchPerson,orderDetails,
  ajax
};
