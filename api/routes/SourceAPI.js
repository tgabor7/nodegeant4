const express = require('express');
var mongoose = require("mongoose");
const SourceModel = require('../models/SourceModel');
const router = express.Router();
const {verify, verifyRole} = require('../verifyToken');

router.get("/get/:name", async function(req, res,next){

    mongoose.connect(process.env.DB_HOME, {useNewUrlParser: true});

    try{
        if(req.params.name == "All"){
            const models = await SourceModel.find();
            res.json(models);
        }else{
            const models = await SourceModel.find({name: req.params.name});
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
        const models = await SourceModel.update({name: req.body.name},{g4name: req.body.g4name});
        res.json(models);
        
    }catch(err){
        res.json({message: err});
    }
    mongoose.connection.close();

});
router.delete("/delete/",verify, async function(req, res,next){

    mongoose.connect(process.env.DB_HOME, {useNewUrlParser: true});

    try{
        const models = await SourceModel.deleteMany({name: req.body.name});
        res.json(models);
        
    }catch(err){
        res.json({message: err});
    }
    mongoose.connection.close();

});
router.put("/create/", verify, verifyRole,function(req,res,next){
    mongoose.connect(process.env.DB_HOME, {useNewUrlParser: true});
    const material = new SourceModel({
        name: req.body.name
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