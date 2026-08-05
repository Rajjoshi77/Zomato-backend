const express = require("express");
const app = express();

app.use(express.json())
app.use(express.urlencoded( {extended:true}))

const userRoutes=require("./routes/user.routes");

app.get("/",(req,res)=>{
    res.json({
        message:"welcome to Zomato Home Page"
    });
});

app.use("/api/users",userRoutes);
module.exports = app;