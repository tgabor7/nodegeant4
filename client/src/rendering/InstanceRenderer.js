import Matrix, { Maths } from "../utils/maths.js";
import {InstancedShader} from "../shaders/instanceshader";

export class InstanceRenderer {
    constructor(vertices, gl){
        this.vao = gl.createVertexArray();
        gl.bindVertexArray(this.vao);
        this.vertices = vertices;
        this.index = 0;
        this.vbo = this.createVBO(gl);
        this.color_vbo = this.createVBO(gl);
        this.shader = new InstanceShader(gl);
        this.storeData(0, 3, vertices, gl);
        gl.bindVertexArray(null);
        gl.disableVertexAttribArray(0);

        this.addIntanceAttrib(this.vao, this.vbo, 1, 4, 16, 0, gl);
        this.addIntanceAttrib(this.vao, this.vbo, 2, 4, 16, 4, gl);
        this.addIntanceAttrib(this.vao, this.vbo, 3, 4, 16, 8, gl);
        this.addIntanceAttrib(this.vao, this.vbo, 4, 4, 16, 12, gl);
        this.addIntanceAttrib(this.vao, this.color_vbo, 5, 3, 3, 0, gl);
        
    }  
    render(particles,view, projection,d, gl){
        let vboData = [];
        let colorData = [];
        this.index = 0;
        this.colorIndex = 0;
        this.shader.bind();
        gl.bindVertexArray(this.vao);
        gl.enableVertexAttribArray(0);
        gl.enableVertexAttribArray(1);
        gl.enableVertexAttribArray(2);
        gl.enableVertexAttribArray(3);
        gl.enableVertexAttribArray(4);
        gl.enableVertexAttribArray(5);
        
        for(let i = 0;i<particles.length;i++){
            this.storeMatrixData(Maths.createTransformationMatrix(particles[i].position.x,particles[i].position.y,particles[i].position.z,0,0,0,
                particles[i].scale.x,particles[i].scale.y,particles[i].scale.z), vboData);
            this.storeVectorData(particles[i].color, colorData);
        }
        this.updateVBO(this.vbo, vboData, gl);
        this.updateVBO(this.color_vbo, colorData, gl);
        gl.drawArraysInstanced(gl.TRIANGLES, 0, this.vertices.length / 3, particles.length);

        this.shader.setUniform4fv("view", view);
        this.shader.setUniform4fv("projection", projection);
        this.shader.setUniform3f("color", 1,1,1);
        this.shader.setUniform("camera", d);

        gl.bindVertexArray(null);
        gl.disableVertexAttribArray(0);
        gl.disableVertexAttribArray(1);
        gl.disableVertexAttribArray(2);
        gl.disableVertexAttribArray(3);
        gl.disableVertexAttribArray(4);
        gl.disableVertexAttribArray(5);
        
        this.shader.unBind();
    }
    createVBO(gl){
        let vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(99999999), gl.STREAM_DRAW, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        return vbo;
    }
    storeVectorData(v, vboData){
        vboData[this.colorIndex++] = v.x;
        vboData[this.colorIndex++] = v.y;
        vboData[this.colorIndex++] = v.z;
        
    }
    storeMatrixData(mat, vboData){
        /*for(let i = 0;i<4;i++){
            vboData.push(mat[12-i*4]);
            vboData.push(mat[13-i*4]);
            vboData.push(mat[14-i*4]);
            vboData.push(mat[15-i*4]);
        }*/
        for(let i = 0;i<16;i++){
            vboData[this.index++] = mat[i];
        }
    }
    storeData(attribnumber, coordinateSize, data, gl){
        let vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW, 0);
        gl.vertexAttribPointer(attribnumber, coordinateSize, gl.FLOAT, gl.FALSE, 0, 0);
    }
    addIntanceAttrib(vao, vbo, attribute, datasize, datalength, offset, gl){
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
	    gl.bindVertexArray(vao);
	    gl.vertexAttribPointer(attribute, datasize, gl.FLOAT, false, datalength * 4, (offset * 4));
	    gl.vertexAttribDivisor(attribute, 1);
	    gl.bindBuffer(gl.ARRAY_BUFFER, null);
	    gl.bindVertexArray(null);
    }
    updateVBO(vbo, data, gl){
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
	    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STREAM_DRAW);
	    gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(data));
	    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
}

export class InstanceShader {
    constructor(gl){
        this.gl = gl;
        var vertexShaderText = InstancedShader.vertexShader;
        var fragmentShaderText = InstancedShader.fragmentShader;

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


        gl.bindAttribLocation(this.program, 0, "vertPosition");
        gl.bindAttribLocation(this.program, 1, "transformation");
        gl.bindAttribLocation(this.program, 5, "color");
        

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