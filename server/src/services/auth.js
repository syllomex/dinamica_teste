const jwt = require("jsonwebtoken");
const { comparePassword } = require("../services/password");

async function signIn({ username, hash, password }) {
  try {
    if (!username || !hash || !password)
      throw new Error("Required value not provided on sign in");

    const valid = await comparePassword(hash, password);
    if (!valid) throw new Error("Invalid password");

    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return token;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function getTokenPayload(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("Error on get token payload:", error.message);
    return null;
  }
}

module.exports = {
  signIn,
  getTokenPayload,
};
