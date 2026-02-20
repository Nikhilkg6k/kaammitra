const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    employerPhone: String,
    workerType: String,
    wage: Number,
    description: String,

    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    }

}, { timestamps: true });

module.exports = mongoose.model("Job", JobSchema);