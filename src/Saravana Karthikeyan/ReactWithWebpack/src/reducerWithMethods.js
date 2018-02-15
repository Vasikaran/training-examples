import {Router,Route,browserHistory} from "react-router";
import {inputNameList} from "./Form";
import {createStore} from "redux";
import $ from "jquery";

const initializeValues = {
    CompanyName : "",
    ModelName : "",
    FuelType : "",
    Price : "",
    SeatingCapacity : "",
    Displacement : "",
    MaxPower : "",
    MaxTorque : "",
    Mileage : "",
    AlternateFuel : "",
    TransmissionType : "",
    NoOfGears : "",
    AirBags : "",
    check : true,
    noOfButton : 0,
    page : 0,
    viewDetailIndex : 0,
    DetailObj : {},
    carDetailList:[]
}
const carFormReducer = (state=initializeValues, action)=> {
    switch (action.type) {
        case "setValue" :
            state = {
                ...state,
                ...action.payload,
            }
        break;
        case "clearAllDetails" : 
            state = initializeValues;
        break;
        case "changeThePage":
            state = {
                ...state,
                ...action.payload
            }
    }
    return state;
}
var carDetailsToProps = ()=> {
    return{
        setDetail : (e) => {
            let actionCase = e.target.title;
            let actionVal  = e.target.value;
		    var regex = { CompanyName : /^[a-z]*$/, ModelName : /^\w*$/, FuelType : /^[a-z]*$/, Price : /^[0-9]{0,7}$/, SeatingCapacity : /^[0-9]{0,1}$/, Displacement : /^[0-9]{0,5}$/, MaxPower : /^[0-9]{0,5}.[0-9]{0,5}$/, MaxTorque : /^[0-9]{0,5}.[0-9]{0,5}$/, Mileage : /^[0-9]{0,2}.[0-9]{0,3}$/, AlternateFuel : /^[a-z]*$/, TransmissionType : /^[a-z]*$/, NoOfGears : /^[0-9]{0,1}$/, AirBags : /^[0-9]{0,1}$/}
		    if (regex[actionCase].test(actionVal)) {
	            var  obj = {}
	            obj[actionCase] = actionVal
	            store.dispatch({
                    type: "setValue" ,
                    payload: obj
                });
		    }
        },
        addDetails: (allValues) => {
		    var thisObj = {};
		    var check = true;
		    var arr = inputNameList.map((val)=>{
		        if(((allValues[val]).trim()).length>0) {
		            return thisObj[val] = allValues[val];
		        } else{
		            check = false;
		        }
		    });
		    if(check===true) {
		        $.post("/addValue", thisObj, function(data, status){
		            if(status=="success") {
	                    browserHistory.push('/page/1');
    	    		    let length = JSON.parse(data).Length;
    	    		    store.dispatch({
                            type:"clearAllDetails",
	    		            payload : {}
                        })
    	    		    store.dispatch({
	    		            type:"setValue",
	    		            payload : {noOfButton : length, carDetailList : JSON.parse(data).Array}
	    		        })
		            }
		        });
		    }
        },
        changePage : (ind, pageno)=> {
		    browserHistory.push('/page/'+(pageno+1));
		    $.post("/getPage", {"num":pageno+1}, function(data, status){
		        store.dispatch({
		            type: "changeThePage",
		            payload : {check : true, DetailObj : {}, page:(pageno+1), carDetailList : JSON.parse(data).Array}
		        })
		    })
		},
		checkMethod:(index, company, model)=> {
		    browserHistory.push("/ShowValues/"+company+" "+model);
		    $.post("/getCarDetails", {Index:index}, function(data, status) {
		        let carObject = JSON.parse(data);
		        store.dispatch({
		            type : "setValue",
		            payload : {check : false, viewDetailIndex:index, DetailObj:carObject}
		        })
		    })
		},
		closeDetails : (page)=> {
		    if(page==0) {
		        browserHistory.push('/page/'+(page+1));
		        store.dispatch({
		            type : "setValue",
		            payload : {check : true, DetailObj : {}, page:1}})
		    } else {
		        browserHistory.push('/page/'+page);
		        store.dispatch({
		            type : "setValue",
		            payload : {check : true, DetailObj : {}}})
		    }
		}
    }
}
var setValueToProps = (state)=> {
    return state;
}

const store = createStore(carFormReducer);
export default store;
export {carFormReducer, carDetailsToProps, setValueToProps}