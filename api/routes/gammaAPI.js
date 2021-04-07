var express = require("express");
var router = express.Router();

var id = 0;
var ids = [];


var getNextId = function(){
    let res_id = 0;
    while(true){
        let found = false;
        for(let i = 0;i<ids.length;i++){
            if(res_id == ids[i]){
                found = true;
                break;
            }
        }
        if(found) res_id++;
        else return res_id;
    }
}
var removeId = function(id){
    for(let i = 0;i<ids.length;i++){
        if(ids[i] === id){
            ids.splice(i, 1);
        }
    }
}
router.post("/progress", async function(req, res, next){
    let content = '';
    const fs = require('fs');
    if(!fs.existsSync("progress" + req.body.id)){
        res.send("0");
        return;
    }
    let readStream = fs.createReadStream("progress" + req.body.id);

    readStream.on('data', function(chunk) {
        content += chunk.toString('utf8');
    });
    readStream.on('end', function(){
        res.send(content);
        readStream.close();
    });
    
});
router.get("/getid", async function(req, res, next){
    res.send(""+getNextId());
});
router.post("/cancel", async function(req, res, next){
    
});
router.post("/",async function(req, res, next) {
    res.connection.setTimeout(1000 * 60 * 60);
    console.log("\nNumber of ids: " + ids.length + "\n");
    if(ids.length > 100){
        console.log("Too many requests");
        return; 
    }
    id = getNextId();
    //res.write(""+id);
    console.log("current process id: " + id);
    ids.push(id);
    let process_id = +id;
    const { exec } = require('child_process');
    const fs = require('fs');
    fs.writeFile('receive' + process_id, req.body.data, function(err){
        if(err) return console.log(err);
    });
    const ls = exec('routes\\server.exe ' + process_id, function (error, stdout, stderr) {
    
    //console.log('Child Process STDOUT: '+stdout);
    //console.log('Child Process STDERR: '+stderr);
    });

    ls.on('exit', function (code) {
        //console.log('Child process exited with exit code '+code);

        let content = '';
        let readStream = fs.createReadStream("message" + process_id);

        readStream.on('data', function(chunk) {
            content += chunk.toString('utf8');
        });
        readStream.on('end', function(){
            console.log(content.length);
            res.write(content);
            res.end();
            removeId(id);
            if(fs.existsSync("progress" + process_id)) fs.unlinkSync("progress" + process_id);
            if(fs.existsSync("receive" + process_id)) fs.unlinkSync("receive" + process_id);

        });
       
    });
});

module.exports = router;