const express=require("express");
const authMiddleware=require("../middlewares/authMiddleware");
const { createRestaurantController,getAllRestaurantController, getRestaurantbyidController, deleteRestaurantController } = require("../controllers/restaurantController");
const router=express.Router();

//routes
//CREATE RESTAURANT||POST
router.post('/create',authMiddleware,createRestaurantController)

//GET ALL RESTAURANTS ||GET
router.get('/getall',getAllRestaurantController);

//GET RESTAURANTS BY ID
router.get('/getbyid/:id',getRestaurantbyidController);

//delete restaurant by id
router.delete('/deletebyid/:id',authMiddleware,deleteRestaurantController)
module.exports=router;