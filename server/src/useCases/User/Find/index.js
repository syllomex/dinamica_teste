const Users = require("../../../models/User");

module.exports = async ({ username }) => {
  try {
    const user = await Users.findOne({ username });

    return user;
  } catch (error) {
    console.error("Error on finding user:", error.message);
  }
};
