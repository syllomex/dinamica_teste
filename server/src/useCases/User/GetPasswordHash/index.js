const Users = require("../../../models/User");

module.exports = async ({ username }) => {
  try {
    const user = await Users.findOne({ username }).select("password");

    return user.password;
  } catch (error) {
    console.error("Error on getting user password:", error.message);
  }
};
