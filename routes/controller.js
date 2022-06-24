var express = require('express');
const { default: mongoose } = require('mongoose');
var router = express.Router();
let usermodel = require('../models/user.model')
    ;


mongoose.connect("mongodb://localhost:27017/harshit")
let UserControll = {
    find: async (req, res) => {
        let found=await usermodel.find({name:req.params.username})
        res.json(found)
    }
    ,
    all: async (req, res) => {
        let found=await usermodel.find()
        res.json(found)
    }
    ,
    create: async (req, res) => {
        let newuser = new usermodel(req.body);
        let saveduser=await  newuser.save()
    
        res.json(saveduser)
    }
    ,
    getAllCars: async (req, res) => {
        let foundCars=await usermodel.find({name:req.params.username}).populate("cars")
    
        res.json(foundCars)
    }
    ,
   
}



router.get('/', UserControll.all)
router.get('/create', UserControll.create)
router.get('/:username', UserControll.find)
router.get('/:username/cars', UserControll.getAllCars)




module.exports = router;