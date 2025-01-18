const jwt = require("jsonwebtoken");

const authTokenGenerate = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET
    , 
    {
    expiresIn: process.env.JWT_EXPIRES_IN,
  }
);
  res.cookie("_id", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });
};

module.exports = authTokenGenerate;
