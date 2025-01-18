const express = require("express");
const router = express.Router();
const { signup, login, logout,getToken } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/getToken", getToken);
module.exports = router;
