const express = require('express');
var mongoose = require("mongoose");
const CompoundModel = require('../models/CompoundModel');
const router = express.Router();
const {verify} = require('../verifyToken');

router.get("/get/:name", async function(req, res,next){

    mongoose.connect(process.env.DB_HOME, {useNewUrlParser: true});

    try{
        if(req.params.name == "All"){
            const models = await CompoundModel.find();
            res.json(models);

        }else{
            const models = await CompoundModel.find({name: req.params.name});
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
        const models = await CompoundModel.update({name: req.body.name},{g4name: req.body.g4name});
        res.json(models);
        
    }catch(err){
        res.json({message: err});
    }
    mongoose.connection.close();
});
router.delete("/delete/",verify, async function(req, res,next){

    mongoose.connect(process.env.DB_HOME, {useNewUrlParser: true});

    try{
        const models = await CompoundModel.deleteMany({name: req.body.name});
        res.json(models);
        
    }catch(err){
        res.json({message: err});
    }
    mongoose.connection.close();
});
router.put("/create/",verify, function(req,res,next){

    mongoose.connect(process.env.DB_HOME, {useNewUrlParser: true});
    

    const material = new CompoundModel({
        name: req.body.name,
        g4name: req.body.g4name
    });
    material.save().then(data => {
        res.json(data);
        mongoose.connection.close();
    })
    .catch(err => {
        console.log(err);
    });
    
});

module.exports = router;