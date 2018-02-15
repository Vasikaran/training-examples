import React, { Component } from 'react';
import {Router,Route,browserHistory} from "react-router";
import ReactDOM from 'react-dom';
import store from "./reducerWithMethods";
import {carDetailList, detailNameList, inputNameList} from "./index";
class Setnames extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thisCheck:true,
            thisObj : {},
            page : 0,
            pageIndex : 0
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.detailValues.check==true) {
            this.setState({thisCheck : true, thisObj : {}, page : nextProps.detailValues.page, pageIndex : nextProps.detailValues.viewDetailIndex});
        } else if (nextProps.detailValues.check==false) {
            this.setState({thisCheck : false, thisObj : nextProps.detailValues.DetailObj, page : nextProps.detailValues.page})
        }
    }
    render() {
        const Style = {
            'margin' : 'auto',
            'height' : '500px',
            'width' : '80%',
            'boxShadow' : '0 10px 16px 0 rgba(0,0,0,0.2)'
        }
        const buttonStyle = {
            'height': '30px',
            'width': '150px',
            'marginLeft': '44%',
            'background': '#2a75ed',
            'textAlign': 'center',
            'borderRadius': '5px',
            'border': 'none',
            'cursor': 'pointer',
            'color': 'beige',
            'fontSize': '20px'
        }
        if(this.state.thisCheck==true) {
            let pageIndex =0;
            if(this.state.page==0 || this.state.page==1) {
                pageIndex=0;
            } else {
                pageIndex = (this.state.page-1)*5
            }
            var obj = store.getState();
            return <div id="tableViewDiv" style={Style}>{
                obj.carDetailList.map((val, ind)=>{
                    let number = pageIndex+ind;
                return <div className="SetCompanyName" onClick={()=> this.props.allMethods.checkMethod(number, val.CompanyName, val.ModelName)}>
                        <div>
                            <div>{val.CompanyName}</div>
                            <div>{val.ModelName}</div>
                        </div>
                    </div>
                })
            }</div>
        } else if (this.state.thisCheck==false) {
            const showDetailObject = this.state.thisObj;
            const showDetailList = Object.keys(showDetailObject);
            return <div style={Style}>{
                showDetailList.map((val)=>{
                    return <div className="detailShowDiv"> {val} : {showDetailObject[val]}</div>
                })
            }
            <button style={buttonStyle} onClick={()=> this.props.allMethods.closeDetails(this.state.page)}>Back to Listview</button>
            </div>
        }
    }
}
export default Setnames;