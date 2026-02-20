const router = require("express").Router();
const Worker = require("../models/Worker");

/* register worker */
router.post("/register", async(req,res)=>{
    let worker = await Worker.findOne({phone:req.body.phone});

    if(worker){
        return res.json(worker);
    }

    worker = await Worker.create(req.body);
    res.json(worker);
});

/* login by phone */
router.get("/login/:phone", async(req,res)=>{
    const worker = await Worker.findOne({phone:req.params.phone});
    res.json(worker);
});

/* toggle availability */
router.post("/availability/:phone", async(req,res)=>{
    const worker = await Worker.findOne({phone:req.params.phone});
    if(!worker) return res.json({msg:"worker not found"});

    worker.availableToday = !worker.availableToday;
    await worker.save();
    res.json(worker);
});

module.exports = router;