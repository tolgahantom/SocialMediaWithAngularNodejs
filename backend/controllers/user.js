const User = require("../models/user");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const createToken = require("../services/token.service");

module.exports.register = async (req, res) => {
  try {
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      _id: uuidv4(),
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: hashedPassword,
      avatar: req.file,
    });

    const result = await user.save();

    const token = createToken();

    res.json({
      token: token,
      user: result,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(401).json({ message: "User did not found" });

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = createToken();
    res.json({ token: token, user: user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
