const Messages = require("../../../models/Message");

module.exports = async ({ uuid, content, user }) => {
  try {
    const createdMessage = await Messages.create({ uuid, content, user });

    return createdMessage;
  } catch (error) {
    return error.message;
  }
};
