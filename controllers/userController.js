const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
//get user info
const getuserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    //hide password
    user.password = undefined;
    //resp
    res.status(200).send({
      success: true,
      message: "User get Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in get user api",
    });
  }
};
const updateUserController = async (req, res) => {
  try {
    //find user first
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "user not found",
      });
    }
    //now we will update the user
    const { userName, address, phone } = req.body;
    if (userName) {
      user.userName = userName;
    }
    if (address) {
      user.address = address;
    }
    if (phone) {
      user.phone = phone;
    }
    await user.save();
    res.status(200).send({
      success: true,
      message: "user updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in update user API",
      error,
    });
  }
};
//RESET PASSWORD
const resetPasswordController = async (req, res) => {
  try {
    const { email, password, answer } = req.body;
    if (!email || !password || !answer) {
      return res.status(500).send({
        success: false,
        message: "please enter all fields",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "wrong answer or user not found",
      });
    }
    var salt = bcrypt.genSaltSync(10);
    var hashed_password = await bcrypt.hash(password, salt);

    user.password = hashed_password;
    await user.save();
    res.status(200).send({
      success: true,
      message: "password reset successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      success: false,
      message: "error in password reset api",
      error,
    });
  }
};
//DELETE ACCOUNT
const deleteUserController=async(req,res)=>{
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success:true,
      message:"account deleted successfully"
    })
  } catch (error) {
    res.status(500).send({
      success:false,
      message:"error in delete user api",
      error
    })
  }
}
module.exports = {
  getuserController,
  updateUserController,
  resetPasswordController,
  deleteUserController
};
