const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
dotenv.config();


const connectDB = require("./config/db");

connectDB();

const mongoose = require("mongoose");

setTimeout(() => {
    console.log(
        "Current DB:",
        mongoose.connection.db.databaseName
    );
}, 2000);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => {
    res.send("Resume Analyzer API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});