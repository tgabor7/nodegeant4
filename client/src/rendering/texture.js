export class Texture {
    constructor(img, gl){
        function isPowerOf2(value) {
            return (value & (value - 1)) == 0;
          }
        this.texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
            
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,
            gl.RGBA, gl.UNSIGNED_BYTE, img);
    
            if (isPowerOf2(img.width) && isPowerOf2(img.height)) {
                 gl.generateMipmap(gl.TEXTURE_2D);
            } else {
            
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        img.onload = () => {
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
            
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,
            gl.RGBA, gl.UNSIGNED_BYTE, img);
    
            if (isPowerOf2(img.width) && isPowerOf2(img.height)) {
                 gl.generateMipmap(gl.TEXTURE_2D);
            } else {
            
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        }
        
        
       
    }
}