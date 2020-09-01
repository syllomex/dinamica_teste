const mongo = require("mongoose");
const Schema = mongo.Schema;

const messageSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongo.model("messages", messageSchema);
