const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jsonwebtoken=require("jsonwebtoken")
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address,answer} = req.body;
    //validation
    if (!userName || !email || !password || !address || !phone || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    //check user
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "email already registered please Login",
      });
    }
    //hashing of password
    const salt = bcrypt.genSaltSync(10);
    const hashed_password = await bcrypt.hash(password, salt);
    //now we will create a new user
    const user = await userModel.create({
      userName,
      email,
      password: hashed_password,
      address,
      phone,
      answer
    });
    res.status(201).send({
      success: true,
      message: "Successfully Registered",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in message API",
    });
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(500).send({
        success: false,
        message: "please enter both email and password",
      });
    }
    const existing_user = await userModel.findOne({ email });
   
    const is_match = bcrypt.compare(password, existing_user.password);

    if (!existing_user) {
      return res.status(500).send({
        success: false,
        message: "User not Found",
      });
    }
    if (!is_match) {
      res.status(500).send({
        success: false,
        message: "invalid password",
      });
    }
    const token=jsonwebtoken.sign({
      id:existing_user._id
    },process.env.JWT_SECRET,{
      expiresIn:"7d"
    })
    res.status(200).send({
      success: true,
      message: "login success",
      token,
      existing_user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login route",
    });
  }
};
module.exports = { registerController, loginController };
