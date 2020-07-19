import React, {Component} from 'react';
import {Form} from 'react-bootstrap';

class CodeEditor extends Component{
    constructor(props){
        super(props);
        this.state = {text: []}
    }
    render(){
        return <div contentEditable="true" 
        onKeyDown={(evt)=>{
            let letter = <span style={{'color' : 'red'}}>{evt.key}</span>;
            let text = this.state.text;
            text.push(letter);
            this.setState({text: text});
        }}
        style={{'height':'100%', 'width':'20%', 'position': 'fixed', 'left':'50%', 'z-index':'3', 'border': '0', 'borderRadius' : '0', 'padding':'0', 'margin':'0', 'background-color' : 'white'}}>
            {this.state.text}
        </div>
    }
}

export default CodeEditor;