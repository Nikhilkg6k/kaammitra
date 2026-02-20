require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

/* ROUTES */
app.use("/api/workers", require("./routes/workerRoutes"));
app.use("/api/employers", require("./routes/employerRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));

app.listen(5000, ()=>console.log("Server running on port 5000"));