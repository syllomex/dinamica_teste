const bcrypt = require("bcrypt");

async function hashPassword(password) {
  try {
    if (!password) throw new Error("No password provided for hashing");

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    return hash;
  } catch (error) {
    console.error("Error on generating password hash:", error.message);
  }
}

async function comparePassword(hash, password) {
  try {
    const result = await bcrypt.compare(password, hash);
    return result;
  } catch (error) {
    console.error("Error on comparing password hash:", error);
    return false;
  }
}

module.exports = {
  hashPassword,
  comparePassword,
};
