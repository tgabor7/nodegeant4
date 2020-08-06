const express = require('express');
var mongoose = require("mongoose");
const Geometry = require('../models/Geometry');
const Model = require('../models/Model');
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true});
    
const router = express.Router();


router.post("/", async(req, res) =>{
    try{
        if(req.body.name == ""){
            const models = await Model.find();
            res.json(models);
        }else{
            const models = await Model.find({name: req.body.name});
            res.json(models);
        }
        
    }catch(err){
        res.json({message: err});
    }
});

router.post("/add/", function(req, res, next){
    const geometry = new Model({
        name: req.body.name,
        data: req.body.data
    });
    geometry.save().then(data => {
        res.json(data);
    })
    .catch(err => {
        console.log(err);
    });
});


module.exports = router;