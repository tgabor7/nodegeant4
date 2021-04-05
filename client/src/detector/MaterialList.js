import Requests from '../utils/Reqs';

/*
This class contains all materials used by both detectors and sources. 
*/

class MaterialList {
    static sources = [
    ];
    static compounds = [
    ];
    static materials = [];
    static get(name) {
        for (let i = 0; i < MaterialList.materials.length; i++) {
            if (name == MaterialList.materials[i].symbol) return MaterialList.materials[i];
        }
        return name;
    }
    static check(s) {
        for (let i = 0; i < MaterialList.materials.length; i++) {
            if (s == MaterialList.materials[i]) return true;
        }
        return false;
    }
    static getAllElements(){

    }
    static async init(){
        //Load elements from the API
        let json = 0;
        while(json.length == undefined){
            let result = await Requests.get("elementAPI/get/All");
            json = await result.json();
        }
       
        for(let i = 0;i<json.length;i++){
            MaterialList.materials.push({symbol: json[i]['symbol'], z: parseInt(json[i]['z']), name: json[i]['name']});
        }

        //Load compounds from the API
        let compoundresult = await Requests.get("compoundAPI/get/All");
        let compoundjson = await compoundresult.json();
        for(let i = 0;i<compoundjson.length;i++){
            MaterialList.compounds.push(compoundjson[i]['name']);
        }
        //Load sources from the API
        let sourceResult = await Requests.get("sourceAPI/get/All");
        let sourceJson = await sourceResult.json();
        for(let i = 0;i<sourceJson.length;i++){
            MaterialList.sources.push(sourceJson[i]['name']);
        }
    }
    static async getElement(symbol){
        let result = await Requests.get("elementAPI/get/" + symbol);
        let json = await result.json();
    }
    static checkMaterial(mat, f) {
        for (let i = 0; i < MaterialList.materials.length; i++) {
            if (mat == MaterialList.materials[i].symbol){
                return true;
            }
        }
        for(let i = 0;i<MaterialList.compounds.length;i++){
            if(mat == MaterialList.compounds[i]){
                return true;
            }
        }
        f();
        return false;
    }
    static checkSource(source, f){
        for(let i = 0;i<MaterialList.sources.length;i++){
            if(source == MaterialList.sources[i]){
                return true;
            }
        }
        f();
        return false;
    }
}

export default MaterialList;