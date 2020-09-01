const Messages = require("../../../models/Message");

module.exports = async ({ content, user_id }) => {
  try {
    const createdMessage = await Messages.create({ content, user: user_id });

    return createdMessage;
  } catch (error) {
    return error.message;
  }
};
