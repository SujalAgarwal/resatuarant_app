const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createCategoryController, findAllCatController, updateCategoryController, deleteCatController } = require("../controllers/categoryController");

const router = express.Router();

//routes
//CREATE CATEGORY||POST
router.post('/create',authMiddleware,createCategoryController);
//FIND ALL CATEGORY ||GET
router.get('/findall',findAllCatController);

//UPDATE CATEGORY
router.put('/update/:id',authMiddleware,updateCategoryController)
module.exports = router;

//DELETE CATEGORY
router.delete('/delete/:id',authMiddleware,deleteCatController)
