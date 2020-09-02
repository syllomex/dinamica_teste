const Messages = require("../../../models/Message");

module.exports = async () => {
  try {
    const history = await Messages.find().populate("user", "username", "users");

    return history;
  } catch (error) {
    console.error(error.message);
    return [];
  }
};
