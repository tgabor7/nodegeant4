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
router.get("/",async function(req, res, next) {
    console.log("\nNumber of ids: " + ids.length + "\n");
    if(ids.length > 100){
        console.log("Too many requests");
        return; 
    }
    id = getNextId();
    console.log("current process id: " + id);
    ids.push(id);
    let process_id = +id;
    const { exec } = require('child_process');
    const fs = require('fs');
    fs.writeFile('receive' + process_id, req.query.message, function(err){
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
            res.send(content);
            removeId(id);
        });
       
    });
});

module.exports = router;