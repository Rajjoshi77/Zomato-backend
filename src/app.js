const express = require("express");
const cors = require("cors");

const connectDb = require("./config/database");

const userRoutes = require("./routes/user.routes");

const app = express();

connectDb();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Zomato Backend API 🚀"
    });
});

// User Routes
app.use("/api/users", userRoutes);

module.exports = app;