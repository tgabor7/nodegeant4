import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import AceEditor from 'react-ace';
import 'brace/mode/elixir';
import 'brace/theme/monokai';
import Parser from '../utils/Parser';

class CodeEditor extends Component{
    constructor(props){
        super(props);
        this.state = {text: '', width: '20%'}
        this.editor = React.createRef();
    }
    updateText(s){
        this.setState({text: s});
    }
    render(){
        return <div 
        style={{'width':this.state.width,'height':'100%', 'top':'50px',
         'position': 'fixed', 'right':'0', 'z-index':'3', 'border': '0', 'borderRadius' : '0', 'padding':'0', 'margin':'0', 'background-color' : 'white'}}> 

<Button style={{'border' : '0','position':'relative','background-color': 'gray', 'z-index':'3', 'bottom':'0', 'border-radius' : '0', 'border':'solid 1px white'}}
onClick={()=>{
   this.setState({text: "Write your code here"});
}}>New</Button>
<Button style={{'border' : '0','position':'relative','background-color': 'gray', 'z-index':'3', 'bottom':'0', 'border-radius' : '0', 'border':'solid 1px white'}}>Open</Button>
            <Button 
            onClick={()=>{
                let tmp = this.state.text;
                Parser.parse(this.state.text,this.props.canvas.current, this.props.clearSetup,this.props.createDetector, this.props.createSource, this.props.createGun);
                this.setState({text: tmp});
                }}
            style={{'border' : '0','position':'relative','background-color': 'gray', 'z-index':'3', 'bottom':'0', 'border-radius' : '0', 'border':'solid 1px white'}}>Run script</Button>
            <Button style={{'border' : '0','position':'relative','background-color': 'gray', 'z-index':'3', 'bottom':'0', 'border-radius' : '0', 'border':'solid 1px white'}}
onClick={()=>{
    window.location = "Help";
}}>Help</Button>
            <AceEditor style={{'z-index' : '2','width':'100%'}} 
            ref={this.editor}
            value={this.state.text}
            mode="elixir"
            theme="monokai"
            fontSize={16}
            onChange={(evt)=>{
                this.setState({text: evt});
            }}>
            </AceEditor>

        <Button 
        onClick={()=>{
            if(this.state.width == '30%'){
                this.setState({width: '0'});
            }else{
                this.setState({width: '30%'});
            }
        }}
        style={{'right': this.state.width, 'position' : 'fixed', 'top': '50%', 'z-index': '3', 'height':'50px', 'background-color': 'gray', 'border' : '0'}}>
        </Button>
        <div style={{'position':'fixed','z-index':'1','background-color' : 'black', 'height' : '100%', 'top' : '0' , 'width' : this.state.width}} />

        </div>
    }
}

export default CodeEditor;