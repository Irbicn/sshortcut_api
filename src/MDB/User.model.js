const { default: mongoose, Schema, model } = require("mongoose");
const validator = require("mongoose-unique-validator");
const { isEmail } = require("../utils");
const validateEmail = (valor) => {
  if (isEmail(valor)) return valor;
  if (!Boolean(valor)) return null;
};
const UserSchema = new Schema({
  name: {
    type: String,
    required:true,
    unique: true,
    maxlength: 50,
    minlength: 4,
  },
  password: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
  email: {type:String, unique: true, sparse: true},
  urls: [{ type: Schema.Types.ObjectId, ref: "Url", default: [] }],
});
module.exports = model("User", UserSchema);
