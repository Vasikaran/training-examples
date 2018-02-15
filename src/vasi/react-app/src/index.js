import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import style from './App.css';

console.log(style);

class App extends Component{
    render(){
        return <div className={style.heading}>Hello World!</div>
    }
}
ReactDOM.render(<App/>, document.getElementById('output'));
