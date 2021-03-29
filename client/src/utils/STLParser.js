class STLParrser {
    static writeData(data){
        let bytes = "Created at radsim.inf.elte.hu";
        
        function readInt(data, i) {
            var chars = new Uint8Array([data.charCodeAt(i), data.charCodeAt(i + 1), data.charCodeAt(i + 2), data.charCodeAt(i + 3)]);
    
            return new Int32Array(chars.buffer)[0];
        }
        function readFloat(data, i) {
            var chars = new Uint8Array([data.charCodeAt(i), data.charCodeAt(i + 1), data.charCodeAt(i + 2), data.charCodeAt(i + 3)]);
    
            return new Float32Array(chars.buffer)[0];
        }

        while(bytes.length < 80){
            bytes += ".";
        }
        let numberoftriangles = data.vertices.length / 9;
        writeInt(numberoftriangles);
        for(let i = 0;i<numberoftriangles;i++){
            for(let j = 0;j<3;j++){
                writeFloat(data.normals[i*9 + j]);
            }
            for(let j = 0;j<9;j++){
                writeFloat(data.vertices[i*9 + j]);
            }
            bytes += '..';
        }

        function writeFloat(f){
            let fa = new Float32Array(1);
            fa[0] = f;
            let ba = new Uint8Array(fa.buffer);
            bytes += String.fromCharCode(ba[0]);
            bytes += String.fromCharCode(ba[1]);
            bytes += String.fromCharCode(ba[2]);
            bytes += String.fromCharCode(ba[3]);
        }
        function writeInt(i){
            bytes += String.fromCharCode(i);
            bytes += String.fromCharCode(i >> 8);
            bytes += String.fromCharCode(i >> 16);
            bytes += String.fromCharCode(i >> 24);
        }
        return bytes;

    }
    static parseData(data){
        function readInt(data, i) {
            var chars = new Uint8Array([data.charCodeAt(i), data.charCodeAt(i + 1), data.charCodeAt(i + 2), data.charCodeAt(i + 3)]);
    
            return new Int32Array(chars.buffer)[0];
        }
        function readFloat(data, i) {
            var chars = new Uint8Array([data.charCodeAt(i), data.charCodeAt(i + 1), data.charCodeAt(i + 2), data.charCodeAt(i + 3)]);
    
            return new Float32Array(chars.buffer)[0];
        }

        let res = [];
        var normals = [];
        var size = readInt(data, 80);
        for (var k = 0; k < size; k++) {
            for (var j = 0; j < 9; j++) {
                res.push(readFloat(data, 96 + j * 4 + k * 50));
            }
        }
        for (var k = 0; k < size; k++) {
            for (var j = 0; j < 3; j++) {
                normals.push(readFloat(data, 84 + j * 4 + k * 50));
            }
            for (var j = 0; j < 3; j++) {
                normals.push(readFloat(data, 84 + j * 4 + k * 50));
            }
            for (var j = 0; j < 3; j++) {
                normals.push(readFloat(data, 84 + j * 4 + k * 50));
            }
        }
        let m = new ModelData();
        
        m.vertices = res;
        m.normals = normals;
        return m;
    }
}
class ModelData {
    constructor(){
        this.vertices = [];
        this.normals = [];
    }
}

export default STLParrser;