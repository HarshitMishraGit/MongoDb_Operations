const mongoose = require('mongoose')
const Car = new mongoose.Schema({
make: { type: String },
model: { type: String },
owner:{
type: mongoose.Schema.Types.ObjectId,
ref:'user'
    },
},
 { collection: 'cars' }
)
module.exports=mongoose.model('Car',Car)