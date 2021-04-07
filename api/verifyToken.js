const jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
const UserModel = require('./models/UserModel');

function verify(req, res, next){
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send("Access denied!");
    }
    try{
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user)=>{
            req.user = user;
            next();
        });
        
    }catch(err){
        res.status(400).send('Invalid token!');
    }
}
function verifyRole(req, res, next){
    if(req.user.role === "Admin"){
        next();
        return;
    }
    res.status(401).send("Access denied!");
}

module.exports = {
    verify,
    verifyRole
}