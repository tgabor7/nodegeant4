const express = require('express');
var mongoose = require("mongoose");
const Project = require('../models/ProjectModel');
const router = express.Router();
const {verify} = require('../verifyToken');

router.get("/get/:id", verify, async(req, res) =>{
    mongoose.connect(process.env.DB_HOME, {useNewUrlParser: true});
    const name = req.params["id"];

    try{
        const models = await Project.find({_id: name});
        if(models[0].user !== req.user.name){
            res.status(403).send("Access denied!");
            mongoose.connection.close();
            return;
        }
        res.json(models);
    }catch(err){
        res.json({message: err});
    }
    mongoose.connection.close();

});
router.get("/getNames/:name", verify, async(req,res)=>{
    mongoose.connect(process.env.DB_HOME, {useNewUrlParser: true});
    const name = req.params["name"];
    if(req.user.name !== name) {
        res.status(403).send("Acces denied!");
        mongoose.connection.close();
        return;
    }
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
router.post("/delete/",verify, async (req, res, next)=>{
    mongoose.connect(process.env.DB_HOME, {useNewUrlParser: true});
    const project = await Project.find({_id: req.body.id});
    if(project[0].user !== req.user.name){
        res.status(403).send("Access denied!");
        mongoose.connection.close();

        return;
    }
    try{
        const models = await Project.deleteMany({_id: req.body.id});
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