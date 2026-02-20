const mongoose = require("mongoose");

const WorkerSchema = new mongoose.Schema({
    name:String,
    phone:String,
    skills:[String],
    dailyWage:Number,
    availableToday:{
        type:Boolean,
        default:true
    },
    location:{
        lat:Number,
        lng:Number
    }
},{timestamps:true});

module.exports = mongoose.model("Worker",WorkerSchema);