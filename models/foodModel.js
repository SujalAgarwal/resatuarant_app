const mongoose=require("mongoose");
const foodSchema=new mongoose.Schema(
  {
    title:{
      type:String,
      required:[true,"title is required"]
    },
    description:{
      type:String,
      required:[true,"food description is required"]
    },
    price:{
      type:Number,
      required:[true,"food price is required"]
    },
    foodTags:{
      type:String
    },
    category:{
      type:String
    },
    Code:{
      type:String
    },
    isAvailable:{
      type:Boolean,
      default:true
    },
    restaurant:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Restaurant'
    },
    rating:{
      type:Number,
      min:1,
      max:5
    }

  }
)

module.exports=new mongoose.model("food",foodSchema);