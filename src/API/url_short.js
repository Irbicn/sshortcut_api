const UrlModel = require("../MDB/Url.model");
const { responses } = require("../utils");

module.exports = async (req,res)=>{
  const short = req.params.short;
  if(!short)return responses["401"](res);

  const url = await UrlModel.findOne({short});
  if(!url) return responses["404"](res);
  res.status(200).send(url.origin);
}
