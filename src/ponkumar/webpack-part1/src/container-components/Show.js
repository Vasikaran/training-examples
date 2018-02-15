import {browserHistory } from "react-router";
import React from "react";
import $ from "jquery";
import Connect from "../other-functions/Connect.js";
import Detail from "../dump-components/Details.js";
function Show (props) {
    let page = Number(props.params.number)-1;
    if ( page != Number(props.show.currentPage)){
        props.setCurrentPage( page );
    }
    var pageCount = Math.ceil(props.show.detailsCount/10)  ;
    var buttonArray = [] ;
    if (pageCount > 1){
        for (let i = 1;i <= pageCount;i++){
            buttonArray.push(<input type="button"  value={i}  onClick={(event) => {
                browserHistory.push("/details/page/"+event.target.value);
            }}  />)
        }
    }
    /// 204.141.33.170
    let currentPage = (props.show.currentPage) * 10;
    let stu_id = props.show.visible;
    return (<div>
        <button onClick={() => {browserHistory.push("/form")}}>Form</button>
            <div className="container-fluid">
                   {props.show.details.map(function(ele,ind) {
                       ele.stu_id = currentPage+ind
                       ele.visible = ele.stu_id == stu_id;
                       return <Detail  key={1000000000000+ind}  obj={ele} setId={props.setVisible} />
                   })}
            </div>
            <div className="pageNumber">{buttonArray}</div>
        </div>
        )
}
const mapShowStateToFormProps = (state) => {
    return {
        show : state.show
    };
}
const mapShowDispatchToFormProps = (dispatch) => {
    return {
        setCurrentPage : function (num) {
            $.get("/getSomeDetails",{currentPage : num*10}, function(data, status){
                if (status == "success"){
                    dispatch({
                        type : "showObjectAssign",
                        payload : JSON.parse(data)
                    });
                } else {
                    alert(status);
                }
            });
            dispatch({
                type : "setCurrentPage",
                payload : num
            })
        },
        setVisible : function(num) {
            dispatch({
                type : "setVisible",
                payload : num

            });
        }
    };
}

export default   Connect(mapShowStateToFormProps,mapShowDispatchToFormProps,Show);
