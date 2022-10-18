const jwt = require("jsonwebtoken");
const UrlModel = require("../MDB/Url.model");
const UserModel = require("../MDB/User.model");
const { responses } = require("../utils");


module.exports = (req,res) => {
  const token = req.headers.eltoken;
  const { origin } = req.body;

  if(!token) return responses["403"](res);
  if(!origin) return responses["401"](res);

  jwt.verify(token, process.env.LAKEY, async (err, userData) => {
    if(err || !userData)return responses["403"](res);
    const user = await UserModel.findById(userData.id);
    if(!user)return responses["403"](res);
    const newUrl = new UrlModel({user: userData.id, origin});
    await newUrl.save();
    user.urls = user.urls.concat(newUrl._id);
    try{
      await user.save();
    }catch(e){
      UrlModel.findOneAndDelete({origin});
      throw e;
    }
    res.status(200).json(newUrl)
  })
}
