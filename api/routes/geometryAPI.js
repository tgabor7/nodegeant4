const express = require('express');
var mongoose = require("mongoose");
const Model = require('../models/GeometryModel');
const router = express.Router();
const verify = require('../verifyToken');

router.get("/get/", async(req, res) =>{
    mongoose.connect(process.env.DB_HOME, {useNewUrlParser: true});
    try{
        const models = await Model.find();
        res.json(models);
    }catch(err){
        res.json({message: err});
    }
    mongoose.connection.close();

});

router.post("/add/",verify, async(req, res, next) => {

    mongoose.connect(process.env.DB_HOME, {useNewUrlParser: true});

    const geometry = new Model({
        name: req.body.name,
        data: req.body.data
    });
    geometry.save().then(data => {
        res.json(data);
        mongoose.connection.close();
    })
    .catch(err => {
        console.log(err);
        mongoose.connection.close();
    });
    
    

});


module.exports = router;