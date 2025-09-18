const userModel = require("../models/User.model")
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// user signup

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(req.body)
  const { fname, lname, email, password } = req.body;
  const isuserExist = await userModel.findOne({ email });
  if (isuserExist) {
    return res.status(400).json({ message: "User already exists" });
  }
const hashPassword = await bcrypt.hash(password, 10);


const user = await userModel.create({
    fname:fname,
    lname:lname,
    email,
    password:hashPassword
})
const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,);
res.cookie("token", token,)

res.status(200).json({token,user})
};

//user login 

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
 const { email, password } = req.body;
 const user = await userModel.findOne({ email }).select("+password");
 if(!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
const isMatch = await bcrypt.compare(password, user.password);
if(!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  } 
const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,);
res.cookie("token", token);

res.status(200).json({ token, user });

}  
// veryfy login user
module.exports.verifyUser = (req, res) => {
  const token = req.cookies.token; 
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.cookie(token)
    res.status(200).json({token, userId: decoded.id });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// logout user
module.exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
}