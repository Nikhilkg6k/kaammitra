const router = require("express").Router();
const Employer = require("../models/Employer");

router.post("/register", async(req,res)=>{
    const employer = await Employer.create(req.body);
    res.json(employer);
});

module.exports = router;