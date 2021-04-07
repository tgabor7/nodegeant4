const jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
const UserModel = require('./models/UserModel');

function verify(req, res, next){
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send("Access denied!");
    }
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid token!');
    }
}
async function verifyRole(role){
    return (req, res, next) =>{
        if(req.user.permission === role){
            next();
        }else{
            return res.status(401).send("Access denied!");
        }
    }
}

module.exports = {
    verify,
    verifyRole
}