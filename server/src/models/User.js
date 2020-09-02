const mongo = require("mongoose");

const userSchema = new mongo.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  admin: {
    type: Boolean,
    default: true
  }
});

module.exports = mongo.model("users", userSchema);
