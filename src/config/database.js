
const mongoose=require("mongoose")

const connectDB=async()=>{
    try{
        const connection=await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDb Connected");
    }catch (error) {
    console.log("❌ Database Connection Failed");
    console.error(error);
    process.exit(1);
}
}

module.exports=connectDB;

