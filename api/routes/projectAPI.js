const express = require('express');
var mongoose = require("mongoose");
const Project = require('../models/ProjectModel');
const router = express.Router();
const {verify} = require('../verifyToken');

router.get("/get/:id", async(req, res) =>{
    mongoose.connect(process.env.DB_HOME, {useNewUrlParser: true});
    const name = req.params["id"];

    try{
        const models = await Project.find({_id: name});
        res.json(models);
    }catch(err){
        res.json({message: err});
    }
    mongoose.connection.close();

});
router.get("/getNames/:name", async(req,res)=>{
    mongoose.connect(process.env.DB_HOME, {useNewUrlParser: true});
    const name = req.params["name"];
    try{
        const models = await Project.find({user: name}).select("name");
        res.json(models);
    }catch(err){
        res.json({message: err});
    }
    mongoose.connection.close();
});
router.post("/update/", async (req, res, next) =>{
    mongoose.connect(process.env.DB_HOME, {useNewUrlParser: true});

    try{
        const models = await Project.update({_id: req.body.id},{data: req.body.data});
        res.json(models);
        
    }catch(err){
        res.json({message: err});
    }
    mongoose.connection.close();
});
router.post("/delete/", async (req, res, next)=>{
    mongoose.connect(process.env.DB_HOME, {useNewUrlParser: true});

    try{
        const models = await Project.deleteMany({name: req.body.name},{user: req.body.user});
        res.json(models);
        
    }catch(err){
        res.json({message: err});
    }
    mongoose.connection.close();
});
router.post("/add/", async(req, res, next) => {

    mongoose.connect(process.env.DB_HOME, {useNewUrlParser: true});

    const project = new Project({
        name: req.body.name,
        data: req.body.data,
        user: req.body.user
    });
    project.save().then(data => {
        res.json(data);
        mongoose.connection.close();

    })
    .catch(err => {
        console.log(err);
        mongoose.connection.close();
    });
});


module.exports = router;