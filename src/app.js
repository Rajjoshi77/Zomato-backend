const express = require("express");
const cors = require("cors");

const connectDb = require("./config/database");

const userRoutes = require("./routes/user.routes");

const app = express();

let dbConnected = false;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
    if (!dbConnected) {
        try {
            await connectDb();
            dbConnected = true;
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Database connection failed. Please check your MONGO_URL configuration.",
            });
        }
    }

    next();
});

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Zomato Backend API 🚀",
    });
});

// User Routes
app.use("/api/users", userRoutes);

module.exports = app;