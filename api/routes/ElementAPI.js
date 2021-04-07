const express = require('express');
var mongoose = require("mongoose");
const ElementModel = require('../models/ElementModel');
const router = express.Router();
const {verify} = require('../verifyToken');

router.get("/get/:symbol", async function(req, res,next){

    mongoose.connect(process.env.DB_HOME, {useNewUrlParser: true});
    try{
        if(req.params.symbol == "All"){
            const models = await ElementModel.find();
            res.json(models);
        }else{
            const models = await ElementModel.find({symbol: req.params.symbol});
            res.json(models);
        }
    }catch(err){
        res.json({message: err});
    }
    mongoose.connection.close();

});
router.post("/update/",verify, async function(req, res, next){
    mongoose.connect(process.env.DB_HOME, {useNewUrlParser: true});

    try{
        const models = await ElementModel.update({name: req.body.name},{g4name: req.body.g4name,z: req.body.z,symbol: req.body.symbol});
        res.json(models);
        
    }catch(err){
        res.json({message: err});
    }
    mongoose.connection.close();

});
router.delete("/delete/",verify, async function(req, res,next){

    mongoose.connect(process.env.DB_HOME, {useNewUrlParser: true});

    try{
        const models = await ElementModel.deleteMany({name: req.body.name});
        res.json(models);
        
    }catch(err){
        res.json({message: err});
    }
    mongoose.connection.close();

});
router.put("/create/",verify, function(req,res,next){

    mongoose.connect(process.env.DB_HOME, {useNewUrlParser: true});
    

    const material = new ElementModel({
        name: req.body.name,
        z: req.body.z,
        symbol: req.body.symbol,
        g4name: req.body.g4name
    });
    material.save().then(data => {
        res.json(data);
        mongoose.connection.close();
    })
    .catch(err => {
        console.log(err);
        mongoose.connection.close();
    });
    
});

module.exports = router;