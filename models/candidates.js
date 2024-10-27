const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    age:{
        type: Number 
    },
    party:{
        type: String,
    },
    candidateId:{
        type:Number,
        required:true,
        unique:true
    },
    qualification:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true,
        unique:true

    },
    voteCount:{
        type: Number,
        default:0
    }
});

const candidate = mongoose.model('candidate' , candidateSchema);
module.exports = candidate;