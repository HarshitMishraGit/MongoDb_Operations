var express = require('express');
var router = express.Router();
var multer = require('multer');
var imgModel = require('../models/image.model');
const path = require('path');
var fs = require('fs');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage });
router.get('/', function(req, res, next) {
    imgModel.find({}, (err, items) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            res.render('file', { items: items });
        }
        // else {
        //     res.json(items)
        // }
    });
});


router.post('/', async(req, res) => {
    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync("C:/Users/harsh/Downloads/"+ req.body.image),
            contentType: 'image/png'
        }
    }
    let imagecreated=await imgModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            item.save();
            res.json(imagecreated);
        }
    });
    // res.json(req.body)

})

module.exports = router;