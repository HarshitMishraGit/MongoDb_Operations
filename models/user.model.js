const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: { type: String },
    age: { type: String },
    cars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Car"
    }],
    
},
    { collection: "users" }
)

module.exports=mongoose.model("user",User)