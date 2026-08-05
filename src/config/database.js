const mongoose = require("mongoose");

let isConnected = false;

const connectDb = async () => {
    if (isConnected) {
        return;
    }

    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
        throw new Error("MONGO_URL is not defined.");
    }

    if ((process.env.VERCEL || process.env.NODE_ENV === "production") && /localhost|127\.0\.0\.1/.test(mongoUrl)) {
        throw new Error("Vercel cannot connect to a local MongoDB instance. Use a remote MongoDB URI (Mongo Atlas or similar)."
        );
    }

    try {
        const conn = await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000,
        });

        isConnected = conn.connections[0].readyState === 1;
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ Database Connection Failed");
        console.error(error.message);
        throw error;
    }
};

module.exports = connectDb;