const { Schema,model } = require("mongoose");
const shortid = require("shortid");

const URLSchema = new Schema({
  origin: { type: String , require: true},
  short: { type: String, default: shortid },
  date: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User", require: true },
});

URLSchema.set("toJSON", {
  transform: (document, returnedObject) =>{
    returnedObject.id = returnedObject._id
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})
module.exports =  model("Url", URLSchema)
