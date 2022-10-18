const jwt = require("jsonwebtoken");
const UrlModel = require("../MDB/Url.model");
const { responses } = require("../utils");

module.exports = (req, res) => {
  const token = req.headers.eltoken;
  const { id, origin } = req.body;
  if (!token) return responses["403"](res);;
  if (!id || !origin) return responses["401"](res);
  jwt.verify(token, process.env.LAKEY, async (err, userData) => {
    if (err || !userData) return responses["403"](res);
    const newUrl = await UrlModel.findByIdAndUpdate(id, {origin});
    await newUrl.save();
    res.status(200).json({origin, id});
  });
};
