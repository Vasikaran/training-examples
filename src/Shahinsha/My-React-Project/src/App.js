import React, { Component } from 'react';
import GetDetail from "./GetDetail";
import store from "./store";
class App extends Component {
    componentDidMount(){
        store.subscribe(() => {
                this.forceUpdate()
            });
    }
    render(){
        return (<GetDetail value = {store.getState()}/>);
    }
}
export default App;
