/* ===== FIND NEARBY WORKERS ===== */
router.get("/nearby/:lat/:lng/:skill", async(req,res)=>{

    const lat = Number(req.params.lat);
    const lng = Number(req.params.lng);
    const skill = req.params.skill.trim().toLowerCase();

    const workers = await Worker.find({
        availableToday:true,
        skills: { $regex: new RegExp("^"+skill+"$", "i") }
    });

    const nearby = workers.filter(w=>{

        if(!w.location) return false;

        const wLat = Number(w.location.lat);
        const wLng = Number(w.location.lng);

        const distance = Math.sqrt(
            Math.pow((lat - wLat) * 111, 2) +
            Math.pow((lng - wLng) * 111, 2)
        );

        return distance <= 100;
    });

    res.json(nearby);
});