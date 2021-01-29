import React, {Component} from "react";
 
class NumberSpinner extends Component{
    constructor(props){
        super(props);
        this.state = {value: 0}
    }
    set(n){
        this.setState({value: n});
    }
    render(){
        return <><button style={{"outline" : "none"}} onClick={()=>{this.set(this.state.value-1)}}>-</button><input style={{"width":"20%"}} type="number" value={this.state.value}></input>
        <button style={{"outline" : "none"}} onClick={()=>{this.set(this.state.value+1)}}>+</button></>;
    }
}

export default NumberSpinner;