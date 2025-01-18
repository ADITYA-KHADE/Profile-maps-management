const User = require("../models/UserModel");
const authTokenGenerate = require("../security/generateToken");

const signup = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }

    if (password !== confirmpassword) {
      console.log(password,confirmpassword)
      return res.status(400).json({ message: "Password does not match" });
    }

    const newUser = new User({
      name,
      email,
      password,
      role:"user",
    });

    await newUser.save();
    if (newUser) {
      authTokenGenerate(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        message: "user registered successfully",
      });
    } else {
      res.status(400).json({ message: "User not registered" });
    }
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message, "signup");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {

      return res
        .status(400)
        .json({ message: "Invalid credentials" });
    }
    authTokenGenerate(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      message: "logged in successfully",
      role:user.role,
    });
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message, "login");
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("_id");
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    res.status(500).send(error.message, "logout");
  }
};


const getToken = async (req, res) => {
  try {
    const {id}=req.body;
    authTokenGenerate(id, res);
    res.status(200).json({ message: "Token generated successfully" });
    } catch (error) {
    res.status(500).send(error.message);
    console.log(error.message, "getToken");
    }
}

module.exports = {
  signup,
  login,
  logout,
  getToken,
};
