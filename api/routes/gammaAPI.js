var express = require("express");
var router = express.Router();
var id = 0;

router.get("/",async function(req, res, next) {
    id++;
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
        });
       
    });
});

module.exports = router;