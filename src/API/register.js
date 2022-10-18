const jwt = require("jsonwebtoken");
const UserModel = require("../MDB/User.model.js");
const bcrypt = require("bcrypt");
const { responses, isEmail } = require("../utils.js");

module.exports = async (req, res) => {
  const { name, email: _email, password } = req.body;
  if (!name || !password) return responses["401"](res);
  const email = _email ? String(_email).toLowerCase().trim() : undefined;

  const hasUser = Boolean(await UserModel.findOne({ name }));
  if(hasUser)return responses["401"](res, {name: "user_name"});
  const hasUserEmail =isEmail(email) ? Boolean(await UserModel.findOne({email})) : false;
  if(hasUserEmail)return responses["401"](res, {name: "user_email"})
  const hashPass = await bcrypt.hash(String(password), 10);

  const newUser = UserModel({
    name: String(name),
    password: hashPass,
    email,
  });

  try {
    await newUser.save();
    const token = jwt.sign(
      { name: newUser.name, email: newUser.email, id: newUser._id },
      process.env.LAKEY
    );
    res.status(200).json({ token, user: { name, email } });
  } catch (e) {
    responses[401](res);
  }
};
