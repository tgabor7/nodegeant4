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
            let result = await fetch("http://localhost:9000/elementAPI/get/All",{
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                method: 'GET',
                }, (error, res, body) => {
                    if (error) {
                        console.error(error)
                        return
                    }
                    console.log(`statusCode: ${res.statusCode}`)
                    console.log(body)
            });
            json = await result.json();
        }
       
        for(let i = 0;i<json.length;i++){
            MaterialList.materials.push({symbol: json[i]['symbol'], z: parseInt(json[i]['z']), name: json[i]['name']});
        }

        //Load compounds from the API
        let compoundresult = await fetch("http://localhost:9000/compoundAPI/get/All",{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: 'GET',
            }, (error, res, body) => {
                if (error) {
                console.error(error)
                return
                }
                console.log(`statusCode: ${res.statusCode}`)
                console.log(body)
        });
        let compoundjson = await compoundresult.json();
        for(let i = 0;i<compoundjson.length;i++){
            MaterialList.compounds.push(compoundjson[i]['name']);
        }
        //Load sources from the API
        let sourceResult = await fetch("http://localhost:9000/sourceAPI/get/All",{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: 'GET',
            }, (error, res, body) => {
                if (error) {
                console.error(error)
                return
                }
                console.log(`statusCode: ${res.statusCode}`)
                console.log(body)
        });
        let sourceJson = await sourceResult.json();
        for(let i = 0;i<sourceJson.length;i++){
            MaterialList.sources.push(sourceJson[i]['name']);
        }
    }
    static async getElement(symbol){
        let result = await fetch("http://localhost:9000/elementAPI/get/" + symbol,{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: 'GET',
            }, (error, res, body) => {
                if (error) {
                console.error(error)
                return
                }
                console.log(`statusCode: ${res.statusCode}`)
                console.log(body)
        });
        let json = await result.json();
        alert(JSON.stringify(json));
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