const Users = require("../../../models/User");
const { hashPassword } = require("../../../services/password");

module.exports = async ({ username, password }) => {
  try {
    if (!username || !password) throw new Error("Empty field on creating user");

    const hash = await hashPassword(password);

    await Users.create({
      username,
      password: hash,
    });

    return null;
  } catch (error) {
    console.error("Error on creating user:", error.message);
    return error;
  }
};
