const { default: mongoose, connect, connection } = require("mongoose");
const { responses } = require("../utils");


module.exports = async (req,res,next) => {
  try{
    await connect(process.env.URIMDB);
  }catch(e){
    return responses["500"](res);
  }
  await next()
}
