import {browserHistory} from "react-router";
import React from "react";
import Connect from "../other-functions/Connect.js";
import ConditionObjectChecker from "../other-functions/ConditionObjectChecker.js"
import InputElement from "../dump-components/InputElement.js";
import $ from "jquery";
// import sendRequest from "./other-functions/sendRequest";
function Form  (props) {

    if (browserHistory.getCurrentLocation().pathname != "/form"){
        browserHistory.push("/form");
    }
    let setProps = (key, event)=>{
        props.setValue(key,event.target.value,"");
        event.target.focus();
    }
    return (
        <pre className="activePage">{
            Object.keys(props.form).map(function (ele,ind){
                return <InputElement key={2234234+ind}  prekey={ele} value={props.form[ele].value} error={props.form[ele].error} isError={props.form[ele].isError}  onChange={setProps} />
            })
        }
                  <button onClick={() => {props.submitting(props.form)}}> Submit </button>    <button onClick={() => {browserHistory.push("/details/page/1")}}>Details</button>
        </pre>
        );
}
const mapFormStateToFormProps = (state) => {
    return {
        form : state.form
    };
}
const mapFormDispatchToFormProps = (dispatch) => {
    return {
        setValue : function (key,value,error) {
            let obj = {
                type : "setValue",
                    key,
                    value,
                    error,
            }
            dispatch(obj);
        },
        submitting: function(obj) {
            var vaild = true;
            for (let key in obj){
                let NotError  = ConditionObjectChecker(FormCheckObject[key],obj[key].value);
                if (NotError !== true) {
                    this.setValue(key,obj[key].value,key+NotError);
                    vaild = false;
                }
            }
            if (vaild === true) {
                $.post("/addDetails",Object.keys(obj).reduce((prev,ele) => {
                    prev[ele] = obj[ele].value
                    return prev;
                },{}),function(data, status){
                    alert(  data );
                    if (data.includes(" un") == false) {
                        dispatch({
                            type : "clearAllValues",
                        })
                    }
                });
            }
        }
    };
}
Form = Connect(mapFormStateToFormProps,mapFormDispatchToFormProps,Form);
export default Form;
