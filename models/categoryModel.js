const mongoose=require("mongoose");

const categorySchema=mongoose.Schema(
 {
  title:{
    type:String,
    required:[true,"title is required"]
  },
  imageUrl:{
    type:String,
    default:""
  }
 },
 {timestamps:true}
  
)
module.exports=mongoose.model("Category",categorySchema);