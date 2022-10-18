module.exports = (err, req, res,next) => {
  console.error(err, "att: MIDDLEWARE ERROR")
  res.status(400).json({message: "ERROR"});
}
