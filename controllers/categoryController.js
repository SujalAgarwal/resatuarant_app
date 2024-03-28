const categoryModel = require("../models/categoryModel");

const createCategoryController=async(req,res)=>{
  try {
    const {title,imageUrl}=req.body;
    if(!title)
    {
      return res.status(500).send({
        success:"false",
        message:"please provide the title of food category"
      })
    }
    const newCategory=new categoryModel({title,imageUrl})
   await  newCategory.save();
    res.status(200).send({
      success:"true",
      message:"category created successfully"
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:"false",
      message:"error in create category api",
      error
    })
  }
}
const findAllCatController=async(req,res)=>{
  try {
       const category=await categoryModel.find({});
       if(!category)
       {
        return res.status(500).send({
          success:"false",
          message:"no categories found"
        })
       }
       res.status(200).send({
        success:"true",
        totalcategory:category.length,
        category,
        message:"categories found successfully"
       })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:"false",
      message:"error in find all category api"
    })
  }
}
const updateCategoryController=async(req,res)=>{
  try {
    const category_id=req.params.id;
    const { title } = req.body;
   
    
    const new_category= await categoryModel.findById(category_id);
    new_category.title=title;
    await new_category.save()
    if(!new_category)
    {
      return res.status(500).send({
        success:"false",
        message:"no category found with given id"
      })
    }
    res.status(200).send({
      success:"true",
      message:"category updated successfully"
    })
    

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:"false",
      message:"error in upadte category api"
    })
  }
}
const deleteCatController=async(req,res)=>{
  try {
    const category_id=req.params.id;
    if(!category_id)
    {
      return res.status(500).send({
        success:"false",
        message:"please provide the category id"
      })
    }
    const category=await categoryModel.findByIdAndDelete(category_id);
    if(!category)
    {
      return res.status(500).send(
        {
          success:"false",
          message:"no category found with given id"
        }
      )
    }
    res.status(200).send({
      success:"true",
      message:"category deleted successfully"
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:"false",
      message:"error in delete category api"
    })
  }
}
module.exports={createCategoryController,findAllCatController,updateCategoryController,deleteCatController}