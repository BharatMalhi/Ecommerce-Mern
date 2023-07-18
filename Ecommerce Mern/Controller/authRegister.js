const asyncHandler = require("express-async-handler");
const User = require("../models/schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../helpers/authHelper");
const regController = asyncHandler(async (req, resp) => {
  // console.log("The request body is :", req.body);
  //check User
  const { name, email, password, phone, address } = req.body;
  if (!name || !email || !phone || !password || !address) {
    resp.status(400);
    throw new Error("All fields are mandatory !");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    resp.status(401);
    throw new Error("the user already register");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log("Hashed Password: ",
  // hashedPassword
  // );
  //create user with email and password hash
  const user = await new User({
    name,
    email,
    address,
    phone,
    password: hashedPassword,
  }).save();
  // console.log(`User is created${user}` )

  if (user) {
    resp.status(201).json("user created successfully");
  } else {
    resp.status(400);
    throw new Error("User data is not valid");
  }
});

//POST LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not Registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//test controller
const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
module.exports = { regController, loginController, testController };
