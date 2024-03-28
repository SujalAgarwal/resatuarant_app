const createFoodController=async(req,res)=>{
  try {
    const{title,description,price,foodTags,category,Code,isAvailable,restaurant,rating}=req.body;
    if(!title || !description ||!price ||!foodTags||!category)
    {
      return res.status(500).send({
        success:"false",
        message:"please enter all fields"
      })
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:"false",
      message:"error in create food api"
    })
  }
}

module.exports={createFoodController}