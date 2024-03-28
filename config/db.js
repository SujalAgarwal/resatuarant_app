const mongoose=require("mongoose");

const Connectdb=async()=>{
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connected");
  } catch (error) {
    console.log("error in api ")
  }
}
module.exports=Connectdb;