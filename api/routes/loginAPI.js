const express = require('express');
var mongoose = require("mongoose");
const UserModel = require('../models/UserModel');
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

router.post("/login/", async function(req, res, next){
    mongoose.connect(process.env.DB_USER, {useNewUrlParser: true});

    try{
        const user = await UserModel.find({name: req.body.name});
        if(user.length === 0){
            res.send("User not found");
            return;
        }
        const validPass = await bcrypt.compare(req.body.password, user[0].password);
        if(validPass){
            const token = jwt.sign({_id: user._id, permissions: user.permissions}, process.env.TOKEN_SECRET);
            res.header('auth-token', token);
            res.send("Successfull login!");
        }else{
            res.send("Failed to login!");
        }
        
        
    }catch(err){
        res.json({message: err});
    }
    mongoose.connection.close();
});

router.post("/register/", async function(req, res, next){
    mongoose.connect(process.env.DB_USER, {useNewUrlParser: true});
    const tmp = await UserModel.find({name: req.body.name});
    if(tmp.length > 0){
        res.send("Username taken");
        mongoose.connection.close();
        return;
    }
    bcrypt.hash(req.body.password, 1, function(err, hash) {
        console.log(tmp);
        const user = new UserModel({
            name: req.body.name,
            password: hash,
            permissions: 0
            
        });
        user.save().then(data => {
            res.json(data);
            mongoose.connection.close();
        })
        .catch(err => {
            console.log(err);
            mongoose.connection.close();
        });
    });

    
});

module.exports = router;