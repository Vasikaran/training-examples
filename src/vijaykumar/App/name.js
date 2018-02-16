import React from 'react';
import $ from "jquery";
import {store} from "./main.js";
import {Buttondiv} from "./buttondiv.js";
import {rerender} from "./main.js";
import {Ptag} from "./main.js";
import "./whole.css";
import {Button} from "./button.js";
import {browserHistory} from "react-router";
export class Namediv extends React.Component{
    constructor(props){
        super(props);
        this.state = { patientName :"", patientAge :"", patientGender :"", mobileNumber :"",
                       bloodGroup :"", occupation :"", fatherName: "", address :""}
        this.bhistory = this.bhistory.bind(this);
        this.detailView = this.detailView.bind(this);
        this.change = this.change.bind(this);
        this.search = this.search.bind(this);

        this.setstate = this.setstate.bind(this);
    }
    bhistory(){
        browserHistory.push("/form");
    }
    setstate(a){
        let obj = {};
        store.getState().nameReducer.states.forEach(function(val,ind){
            obj[val] = a[ind];
        });
        this.setState({...obj});
    }
    detailView(e, page){
        browserHistory.push("/name/"+e.target.id);
        store.dispatch({ type: "wilMount",payload: {show:true, ind:e.target.id}  });
    }
    search(e){
        let target = e.target.value;
        let details = store.getState().nameReducer;
        clearTimeout(details.setTime);
        details.setTime =  setTimeout(function(target){
            if(target !== ""){
                let array = details.support.filter(function(val,ind){
                    let regexp = new RegExp(target, "gi");
                    let value = JSON.parse(val);
                    if(regexp.test(value[0])){
                        return val;
                    }
                });
                let index =  Math.ceil(array.length/10);
                store.dispatch({ type:"wilMount",payload:{patientDetails: [...array], count:index,
                                 slicedArray: array.slice((index - 1) * 10,((index - 1) * 10) + 10)} });
            }
            else{
                $.get("/alldetail",function(data,status){
                    data = JSON.parse(data);
                    let index = Math.ceil(data.length/10);
                    store.dispatch({ type:"wilMount",
                                    payload:{slicedArray: data.slice((index - 1)*10,((index - 1)*10)+10),
                                             count: index, support:[...data], patientDetails: [...data]}});
                });
            }
        },1000,e.target.value);
       store.dispatch({ type:"wilMount",payload:{value:e.target.value} });
    }
    change(e,ind){
        this.setState({[store.getState().nameReducer.states[ind]]:e.target.value});
    }
    componentWillMount(){
        var parent = this;
        $.get("/alldetail", function(data, status){
            data = JSON.parse(data);
            let prop = Math.ceil(data.length/10);
            let sliced =  data.slice((prop - 1)*10, ((prop-1)*10)+10);
            if(parent.props.params.number !== undefined){
                let number = parent.props.params.number;
                if((number <= prop && number>0) == false){
                    browserHistory.push("/page/"+prop);
                    number=prop;
                }
                store.dispatch({type:"wilMount",payload:{ patientDetails : [...data], count : number,
                                  slicedArray : data.slice((number - 1)*10,((number-1)*10)+10) ,
                                  support: [...data] }});
            }
            else if(parent.props.params.ind !== undefined){
                let index = parent.props.params.ind;
                if((index <= data.length  && index > 0) == false){
                    browserHistory.push("/name/"+(data.length));
                    index = data.length;
                }
                store.dispatch({type:"wilMount",payload:{ patientDetails : [...data], support: [...data],
                                  count : prop ,slicedArray : [...sliced], show : true, ind : index}});
            }
            else if(parent.props.params.index !== undefined){
                let index = parent.props.params.index;
                if((index <= data.length  && index > 0) == false){
                    browserHistory.push("/edit/"+(data.length));
                    index = data.length;
                }
                parent.setstate(JSON.parse(data[index-1]));
                store.dispatch({type:"wilMount",payload:{ patientDetails : [...data], support: [...data], edit : true,
                                  count : prop ,slicedArray : [...sliced],  ind : index}});
            }
            else{
                browserHistory.push("/page/"+prop);
                store.dispatch({type:"wilMount",payload:{ patientDetails : [...data], count : prop ,
                                  slicedArray : [...sliced], support: [...data]}});
            }
        });
    }
    componentDidMount(){
        rerender(this);
    }
    componentWillUnmount(){
        this.unsubscribe();
    }
    render(){
        var detailView = this.detailView, prop = store.getState().nameReducer;
        var parent = this;
        var tempArr = prop.slicedArray;
        var sample = [];
        if(prop.show && prop.edit == false) {
            //console.log("if");
            sample = prop.fieldnames.map(function(val,ind){
            let spanElem = JSON.parse(prop.patientDetails[(prop.ind - 1)]);
            return  <Ptag value = {val} key = {val+ind}>
                        <span className = "spanspace">{spanElem[ind]}</span>
                    </Ptag>
            }).concat([<Button type ="Back" key = "Back" className = "btn btn-default title1" /> ])
        }
        else if(prop.edit){
            //console.log("elif");
            sample =  prop.fieldnames.map(function(val,ind){
                return  <Ptag value = {val} key = {val+ind}>
                            <input className = "spanspace" onChange = {(event)=>{parent.change(event,ind)}}
                             value = {parent.state[prop.states[ind]]}/>
                        </Ptag>
            }).concat([<Button type="cancel" key ="cancel" className = "btn btn-default title1"/> ,
                       <Button className = "btn btn-default" key = "edit" onClick = {this} type = "edit"/>]);
        }
        else if(!prop.show){
        //console.log("elif2");
        sample = tempArr.map(function(val,ind){
            val = JSON.parse(val);
            let index = ((prop.count-1) * 10) + (ind + 1);
            return  <div key = { val + ind } className = "view">
                        <Ptag clas = "inline" id = {index} click = {(event) => detailView(event,prop.count)}
                            value = {val[0]}/>
                        <Button type = "Delete" className = "btn btn-default fright" value = {JSON.stringify(val)}/>
                        <Button type = "Edit" className = "btn btn-default fright" value = {val} index = {val[8]}
                                              ind = {index} method = {parent.setstate} />
                    </div>
        });
        }
        return <div>
                    <h4 id="header"> <b>Patient details</b>
                    { (!prop.show && !prop.edit) ?
                        <input placeholder = "search" type="text" style = {{fontSize:"20px",marginLeft: "320px"}}
                           value ={prop.value} onChange = {(event)=> this.search(event)}/> : "" } </h4>
                    <div id="nameDiv">
                     <h3 className = "title1"><b>{(prop.show) ? "Detailed view" : "Patient Name"}</b></h3>{sample}
                    </div>
                    <Buttondiv counts = {prop.count}/>
                    <div className="rightdiv a1">
                        <button onClick = {this.bhistory} className = "btn btn-primary">Form</button>
                    </div>
               </div>
    }
}
