class STLParrser {
    
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