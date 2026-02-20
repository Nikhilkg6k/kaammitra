const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

/* ================= CREATE JOB ================= */
router.post("/create", async (req, res) => {
    try {

        const job = new Job({
            employerPhone: req.body.employerPhone,
            workerType: req.body.workerType.trim(),
            wage: Number(req.body.wage),
            description: req.body.description,

            location: {
                lat: Number(req.body.lat),
                lng: Number(req.body.lng)
            }
        });

        await job.save();
        res.json(job);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Job creation failed" });
    }
});

/* ================= NEARBY JOB SEARCH ================= */
router.get("/nearby/:lat/:lng/:skill", async (req, res) => {

    try {

        const lat = Number(req.params.lat);
        const lng = Number(req.params.lng);
        let skill = req.params.skill.trim().toLowerCase();

        const jobs = await Job.find({
            workerType: { $regex: new RegExp("^" + skill + "$", "i") }
        });

        const nearby = jobs.filter(job => {

            if (!job.location) return false;

            const jobLat = Number(job.location.lat);
            const jobLng = Number(job.location.lng);

            const distance = Math.sqrt(
                Math.pow((lat - jobLat) * 111, 2) +
                Math.pow((lng - jobLng) * 111, 2)
            );

            return distance <= 100;
        });

        res.json(nearby);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Nearby search failed" });
    }
});

/* ================= ALL JOBS ================= */
router.get("/", async (req, res) => {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
});

module.exports = router;