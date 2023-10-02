const express = require("express");
const router = express.Router();
let path = require("path");
const {
  allowAdmin,
  allowRoot,
  allowSelf,
  allowAdminOrSelf,
  auth,
} = require("../middleware/auth");

const { login, register, logout, loginUser } = require("../controllers/auth");

//@route    POST /login
//@desc     login
//@access   PUBLIC
router.post("/login", login.validator, login.controller);

//@route    POST /register
//@desc     Register
//@access   PUBLIC
router.post("/register",  register.controller);

//@route    POST /user
//@desc     get logdin user
//@access   PRIVATE
router.get("/user", auth, loginUser.controller);

//@route    POST /logout
//@desc     Logout
//@access   PUBLIC
router.post("/logout", logout.controller);

module.exports = router;
