const mongoose = require("mongoose");

const EmployerSchema = new mongoose.Schema({
    name:String,
    phone:String,
    location:{
        lat:Number,
        lng:Number
    }
},{timestamps:true});

module.exports = mongoose.model("Employer",EmployerSchema);