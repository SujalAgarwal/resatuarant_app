const express = require("express");
const {getuserController,updateUserController, resetPasswordController, deleteUserController} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
//routes
//GET USER || GET
router.get('/getuser',authMiddleware,getuserController)
//UPDATE USER
router.put('/updateuser',authMiddleware,updateUserController)
//RESET PASSWORD
router.post('/resetPassword',authMiddleware,resetPasswordController)
//DELETE PASSWORD
router.post('/deleteuser/:id',authMiddleware,deleteUserController);
module.exports = router;
