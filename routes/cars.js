var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')
let carmodel=require('../models/cars.model')
let usermodel=require('../models/user.model')
mongoose.connect("mongodb://localhost:27017/harshit")

let CarsControll = {
    find: async (req, res) => {
        let found=await carmodel.find({owner:req.params.owner})
        res.json(found)
    }
    ,
    all: async (req, res) => {
        let found=await carmodel.find()
        res.json(found)
    }
    ,
    create: async (req, res) => {
        let newcar = new carmodel(req.body);
        let savedcar=await  newcar.save()
        const carid = savedcar._id;
        const ownerid=savedcar.owner
        let updatedrow=await usermodel.updateOne(
            { _id: ownerid },
            { $push: { cars: carid } }
         )
        res.json({savedcar:savedcar,updatedrow:updatedrow})
    }
    ,
   
   
}

router.get('/', CarsControll.all);
router.get('/create',CarsControll.create)
// router.get('/cars/:username',CarsControll.find)
    

module.exports = router;