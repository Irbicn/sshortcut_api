const jwt = require("jsonwebtoken");
const { responses } = require("../utils");


module.exports = async (req, res) => {
  const token = req.headers.eltoken;
  if(!token)return responses["403"](res);
  jwt.verify(token, process.env.LAKEY, (err, userData)=>{
      if(err || !userData)return responses["403"](res);
      res.status(200).json(userData);
  });
};
