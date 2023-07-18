const jwt = require("jsonwebtoken");
const User = require("../models/schema");
const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};
const isAdmin = async (req, resp, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      resp.status(401).send({
        success: false,

        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log("unauthorize user ");
  }
};

module.exports = { requireSignIn, isAdmin };
