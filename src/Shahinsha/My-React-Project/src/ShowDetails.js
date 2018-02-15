import React, { Component } from 'react';
import RenderDetails from "./ShowAllDetails";
import InputElement from "./InputElement";
import { changeState , cancel , searchPerson } from "./AllFunctions";
import store from "./store";
import Pages from "./Pages";
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
export default ShowDetails;
