const UserModel = require("../MDB/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { responses, isEmail } = require("../utils");

module.exports =async (req, res) => {
  const {name, password} = req.body;
  if(!name || !password) return responses["401"](res);
  const User = await UserModel.findOne(isEmail(name) ? {email: name} : {name:name});
  if( !User || !await bcrypt.compare(password, User.password))
    return responses["401"](res, {name: "user"});
  const token = jwt.sign(
    {
    name: User.name,
    email: User.email,
    id: User._id
    },
    process.env.LAKEY);
  res.status(200).json({ token, user: { name, email: User.email } });
};
