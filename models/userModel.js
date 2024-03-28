const mongoose = require("mongoose");
//userSchema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "user name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    usertype: {
      type: String,
      default: "client",
      enum: ["client", "driver", "vendor", "admin"],
    },
    profile: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Ficonduck.com%2Ficons%2F180867%2Fprofile-circle&psig=AOvVaw1fglqOEi5M8NDPOKuItjGe&ust=1708168081825000&source=images&cd=vfe&opi=89978449&ved=0CBYQjRxqFwoTCPCvyfvbr4QDFQAAAAAdAAAAABAE",
    },
    answer:{
      type:String,
      required:[true,"answer is required"]
    }
  },
  { timestamps: true },

);

module.exports = mongoose.model("User", userSchema);
