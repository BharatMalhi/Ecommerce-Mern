const express = require("express");
const {regController,loginController} = require("../Controller/authRegister");
 
const router = express.Router();
router.post("/register",regController);
//LOGIN || POST
router.post("/login", loginController);

module.exports = router;


