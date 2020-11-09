var express = require("express");
var router = express.Router();
var fs = require("fs");

router.post("/",async function(req, res, next) {
    let date_ob = new Date();

    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    let message = "";
    message += "Date: " + year + "-" + month + "-" + date + "-" + hours + "-" + minutes + "-" + seconds;
    message += " lvl: " + req.body.level;
    message += " message: " + req.body.message;
    message += "\n";
    fs.appendFile('logs.txt', message, function(err){
        if(err) return console.log(err);
    });
    res.send("Log saved");
});
router.get("/",async function(req,res,next){
    let content = '';
    let readStream = fs.createReadStream("logs.txt");

    readStream.on('data', function(chunk) {
        content += chunk.toString('utf8');
    });
    readStream.on('end', function(){
        res.send(content);
    });
})
module.exports = router;
