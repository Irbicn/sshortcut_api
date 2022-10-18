const jwt = require("jsonwebtoken");
const UserModel = require("../MDB/User.model");
const { responses } = require("../utils");

module.exports = (req,res)=>{
  const token = req.headers.eltoken;
  if(!token)return responses["403"](res);
  jwt.verify(token, process.env.LAKEY, async (err, userData) => {
    if(err || !userData)return responses["403"](res);
    const {urls} = await UserModel.findOne({name: userData.name}).populate("urls");
    res.json(urls);
  })
}
