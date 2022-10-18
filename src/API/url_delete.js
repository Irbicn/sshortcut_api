const jwt = require("jsonwebtoken");
const UrlModel = require("../MDB/Url.model");
const UserModel = require("../MDB/User.model");
const { responses } = require("../utils");

module.exports = (req, res) => {
  const token = req.headers.eltoken;
  const { id } = req.body;
  if(!token)return responses["403"](res);
  if (!id) return responses["401"](res);
  jwt.verify(token, process.env.LAKEY, async (err, userData) => {
    if (err || !userData) return responses["403"](res);
    const user = await UserModel.findOne({ name: userData.name });
    const idx =user.urls.findIndex((url) => url.toJSON() === id);
    user.urls.splice(idx, 1);
    await UrlModel.findByIdAndDelete(id);
    await user.save();
    res.status(200).json({id});
  });
};
