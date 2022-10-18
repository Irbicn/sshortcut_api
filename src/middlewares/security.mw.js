const jwt = require("jsonwebtoken");
const { responses } = require("../utils");

module.exports = async (req,res,next) => {
  const { hey } = req.headers;
  if (!hey)return responses["401"](res);
  try{
    jwt.verify(
      hey,
      process.env.LAKEY
    );
    next();
  }catch(e){
    responses["401"](res);
  }
}
