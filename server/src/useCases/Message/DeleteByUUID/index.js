const Messages = require("../../../models/Message");

module.exports = async ({ uuid }) => {
  try {
    await Messages.deleteOne({ uuid });

    return null;
  } catch (error) {
    return error.message;
  }
};
