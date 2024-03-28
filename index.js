const express = require("express");
const app = express();
const colors = require("colors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors=require("cors");
const Connectdb = require("./config/db");
//dotenv configuration
dotenv.config();
//databse connection
Connectdb();
//middlewares
app.use(morgan('common'));
app.use(express.json());
app.use(cors());
//routes
app.use('/api/v1/auth',require("./routes/authRoutes"));
app.use('/api/v1/user',require("./routes/userRoutes"));
app.use('/api/v1/restaurant',require("./routes/restaurantRoutes"));
app.use('/api/v1/category',require("./routes/categoryRoutes"));
app.use('/api/v1/food',require("./routes/foodRoutes"));
app.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to the Server</h1>");
});
//port listen
const PORT=process.env.PORT;
app.listen(8000, () => {
  console.log(`server started at port no ${PORT}`);
});
