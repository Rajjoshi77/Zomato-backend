const mongoose = require("mongoose");

let isConnected = false;

const connectDb = async () => {
    if (isConnected) {
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        isConnected = conn.connections[0].readyState === 1;

        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ Database Connection Failed");
        console.error(error.message);
    }
};

module.exports = connectDb;