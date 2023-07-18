const express = require("express");
const {
  regController,
  loginController,
  testController,
} = require("../Controller/authRegister");
const { requireSignIn, isAdmin } = require("../Middleware/Authmiddleware");
const router = express.Router();
router.post("/register", regController);
//LOGIN || POST
router.post("/login", loginController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

module.exports = router;
