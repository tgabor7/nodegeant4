import Shader from "./shader.js";
import Matrix, {Maths, Vector3} from "./maths.js";
import { Texture } from "./texture.js";

export class BillBoard {
    constructor(position, text, gl){
        this.position = position;
        this.text = text;

        this.texture = new Image(800,800);

        
        var canvas = document.createElement('canvas');
        canvas.width = text.length*40;
        canvas.height = 400;
        
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = "white";
        ctx.font = "60px Arial Black";
        ctx.textAlign = "center";
        
        ctx.fillText(this.text, text.length*20,100);
        ctx.fillStyle = "#FF000000";
        var dataURL = canvas.toDataURL();

        this.texture.src = dataURL;
        
        this.t = new Texture(this.texture, gl);
    }
}
export class BillBoardRenderer{
    constructor(gl){
        this.gl = gl;
        this.shader = new Shader([0, 'vertPosition'],"shaders/billboard", gl);
        this.vertices = [ -1, 1, 1, 1, -1, -1,
             1, -1, 1, 1, -1, -1];

        this.vao = this.gl.createVertexArray();
        this.gl.bindVertexArray(this.vao);
        this.gl.enableVertexAttribArray(0);

        this.vbo = gl.createBuffer();
        this.gl.bindBuffer(gl.ARRAY_BUFFER, this.vbo);
        this.gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW, 0);
        this.gl.vertexAttribPointer(0, 2, gl.FLOAT, gl.FALSE, 0, 0);


        this.gl.bindVertexArray(null);
        this.gl.disableVertexAttribArray(0);
    }
    draw(billboard, projection, camera){
        //remove clear
        
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, billboard.t.texture);

        this.shader.bind();
        this.gl.disable(this.gl.DEPTH_TEST);
        this.gl.disable(this.gl.CULL_FACE);

        this.shader.setUniform4fv("projection", projection);
        //this.shader.setUniform("sampler", 0);

        var transformation = Maths.createTransformationMatrix(billboard.position.x,billboard.position.y,billboard.position.z,0,0,0,1,1,1);
        var view = Maths.createViewMatrix(camera);


        this.shader.setUniform4fv("view", view);

       
        var modelview = Maths.mul(view, transformation);

        modelview[0] = 1*camera.d / 20;
        modelview[1] = 0;
        modelview[2] = 0;
        
        modelview[4] = 0;
        modelview[5] = 1*camera.d / 20;
        modelview[6] = 0;
        
        modelview[8] = 0;
        modelview[9] = 0;
        modelview[10] = 1;
        

        this.shader.setUniform4fv("transformation", modelview);
        

		
        this.gl.enableVertexAttribArray(0);
        this.gl.bindVertexArray(this.vao);

        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertices.length);

        this.gl.bindVertexArray(null);
        this.gl.disableVertexAttribArray(0);

        this.shader.unBind();
    }
} 