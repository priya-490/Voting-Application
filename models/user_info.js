const mongoose = require("mongoose");

const  userSchema  = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    aadhar:{
        type:Number,
        required : true,
        unique: true
    }
});


//create person model
const user = mongoose.model('user', userSchema);
module.exports= user;
