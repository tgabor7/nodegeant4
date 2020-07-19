class Shader {
    constructor(attribs,path ,gl){
        this.gl = gl;
        var vertexShaderText = path.vertexShader;
        var fragmentShaderText = path.fragmentShader;
        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    
        gl.shaderSource(vertexShader, vertexShaderText);
        gl.shaderSource(fragmentShader, fragmentShaderText);
    
        gl.compileShader(vertexShader);
        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
            return;
        }
    
        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
            return;
        }
    
        this.program = gl.createProgram();
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);

        for(var i = 0;i<attribs.length;i++){
            gl.bindAttribLocation(this.program, attribs[i][0], attribs[i][1]);
        }

        gl.linkProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            console.error('ERROR linking program!', gl.getProgramInfoLog(this.program));
            return;
        }
        gl.validateProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.VALIDATE_STATUS)) {
            console.error('ERROR validating program!', gl.getProgramInfoLog(this.program));
            return;
        }
        /*var positionAttribLocation = gl.getAttribLocation(this.program, 'vertPosition');
        var normalAttribLocation = gl.getAttribLocation(this.program, 'normal');*/
        
        

        /*for(var i = 0;i<attribs.length;i++){
            gl.vertexAttribPointer(positionAttribLocation, attribs[i], gl.FLOAT,gl.FALSE,0,0);
        }*/
        
        /*gl.vertexAttribPointer(
            normalAttribLocation, 3, gl.FLOAT, gl.FALSE,
            0,
            0 
        );*/
        
    }
    bind(){
        this.gl.useProgram(this.program);
    }
    unBind(){
        this.gl.useProgram(null);
    }
    setUniform(name,value){
        var location = this.gl.getUniformLocation(this.program,name);
        if(location != -1){
            this.gl.uniform1f(location,value);
        }
    }
    setUniform1i(name,value){
        var location = this.gl.getUniformLocation(this.program,name);
        if(location != -1){
            this.gl.uniform1i(location,value);
        }
    }
    setUniform3f(name,x,y,z){
        var location = this.gl.getUniformLocation(this.program,name);
        if(location != -1){
            this.gl.uniform3f(location,x,y,z);
        }
    }
    setUniform4fv(name,value){
        var location = this.gl.getUniformLocation(this.program,name);
        if(location != -1){
            this.gl.uniformMatrix4fv(location,false,value);
        }
        
    }
}
export default Shader;