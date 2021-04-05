import { saveAs } from 'file-saver';
import STLParrser from './STLParser';
import Requests from './Reqs';


const request = require('request');
const Cookies = require("js-cookie");
const JSZip = require("jszip");
        
class SaveLoad {
    static async update(id, code, volumes){
        var zip = new JSZip();
        zip.file("signature", "Created at radsim.inf.elte.hu");
        zip.file("script.txt", code);
        zip.folder("volumes");
        volumes.forEach(e=>{
            zip.file("volumes/" + e.name + ".stl",e.data,{binary: true});
        });
        zip.generateAsync({type:"base64"})
                .then(async function(content) {
                //projectAPI
                Requests.post("projectAPI/update",{id: id,data: content});
         });

        
    }
    static async loadonline(id){
        let files = [];

        let pdata = await Requests.get("projectAPI/get/" + id);
        
        let json = await pdata.json();
        for (let i = 0; i < json.length; i++) {
            var zip = new JSZip();
            const content = json[i].data;
            //document.location = 'data:application/zip;base64,' + json[i].data;
            //saveAs(content, "example.zip");
            let contents = await zip.loadAsync(content,{base64: true});
            for(let i = 0;i<Object.keys(contents.files).length;i++){
                if(zip.file(Object.keys(contents.files)[i]) == undefined) continue;
                let content = await zip.file(Object.keys(contents.files)[i]).async('uint8array');
                let data = "";
                for(let i = 0;i<content.length;i++){
                    data += String.fromCharCode(content[i]);
                }
                files.push({"name": Object.keys(contents.files)[i], content: data});
            }
        }
        return files;
    }
    static saveonline(code, volumes,name){
        var zip = new JSZip();
        zip.file("signature", "Created at radsim.inf.elte.hu");
        zip.file("script.txt", code);
        zip.folder("volumes");
        volumes.forEach(e=>{
            zip.file("volumes/" + e.name + ".stl",e.data,{binary: true});
        });
        zip.generateAsync({type:"base64"})
                .then(async function(content) {
                //projectAPI
                Requests.post("projectAPI/add",{name: name,data: content, user: Cookies.get("login")});
         });
    }
    static save(code, volumes){
        const JSZip = require("jszip");
        var zip = new JSZip();
        zip.file("signature", "Created at radsim.inf.elte.hu");
        zip.file("script.txt", code);
        zip.folder("volumes");
        volumes.forEach(e=>{
            zip.file("volumes/" + e.name + ".stl",e.data,{binary: true});
        });
        zip.generateAsync({type:"blob"})
                .then(function(content) {
                // see FileSaver.js
                saveAs(content, "example.zip");
         });
    }
    static async load(file){
        let files = [];
        const JSZip = require("jszip");
        var zip = new JSZip();
        let contents = await zip.loadAsync(file);
        for(let i = 0;i<Object.keys(contents.files).length;i++){
            if(zip.file(Object.keys(contents.files)[i]) == undefined) continue;
            let content = await zip.file(Object.keys(contents.files)[i]).async('uint8array');
            let data = "";
            for(let i = 0;i<content.length;i++){
                data += String.fromCharCode(content[i]);
            }
            files.push({"name": Object.keys(contents.files)[i], content: data});
        }
        
        return files;
    }
};

export default SaveLoad;