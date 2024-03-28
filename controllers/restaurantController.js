const RestaurantModel = require("../models/RestaurantModel");

//Create restaurant
const createRestaurantController=async(req,res)=>{
    try {
      const{title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords}=req.body;
      if(!title || !coords)
      {
        res.status(500).send({
          success:false,
          message:"please enter title "
        })
      }
      const newRestaurant=new RestaurantModel({
        title,
        imageUrl,
        foods,
        time,
        pickup,
        delivery,
        isOpen,
        logoUrl,
        rating,
        ratingCount,
        code,
        coords
      })
      await newRestaurant.save();
      res.status(200).send({
        success:true,
        message:"new restaurant created successfully"
      })
    } catch (error) {
        res.status(500).send({
          success:false,
          message:"error in create restaurant api."
        })
    }
};
const getAllRestaurantController=async(req,res)=>{
    try {
         const restaurants= await RestaurantModel.find({});
         if(!restaurants)
         {
          return res.status(500).send({
            success:"false",
            message:"no restaurant found"
          })
         }
         res.status(200).send({
            status:true,
            total:restaurants.length,
            restaurants
         })
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success:"false",
        message:"error in get all restaurant api"
      })
    }
}
//get restaurants by id
const getRestaurantbyidController=async(req,res)=>{
   try {
         const restaurant_id=req.params.id;
         if(!restaurant_id)
         {
          return res.status(500).send({
            success:"false",
            message:"please provide the restaurant id"
          })
         }
         const restaurant=await RestaurantModel.findById(restaurant_id)
         if(!restaurant)
         {
          return res.status(500).send({
            success:false,
            message:"no restaurant found with given id"
          })
         }
         res.status(200).send({
          success:true,
          message:"restaurant found successfully",
          restaurant

         })

   } catch (error) {
    console.log(error)
    res.status(500).send({
      success:true,
      message:"error in get  restaurants by id api",
      error
    })
   }
}
const deleteRestaurantController=async(req,res)=>{
  try {
        const restaurant_id=req.params.id;
        if(!restaurant_id)
        {
          return res.status(500).send({
            success:"false",
            message:"please provide restaurant id"
          })
        }
        const restaurant=await RestaurantModel.findByIdAndDelete(restaurant_id);
        if(!restaurant)
        {
          res.status(500).send({
            success:"false",
            "message":"restaurant not found with given id"
          })
        }
        res.status(200).send({
          success:"true",
          message:"restaurant deleted successfully"
        })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:"false",
      message:"error in delete restaurant api"
    })
  }
}
module.exports={createRestaurantController,getAllRestaurantController,getRestaurantbyidController,deleteRestaurantController};