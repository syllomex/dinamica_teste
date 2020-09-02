const jwt = require("jsonwebtoken");
const { comparePassword } = require("../services/password");

async function signIn({ username, id, hash, password, admin }) {
  try {
    if (!username || !hash || !password || !id)
      throw new Error("Required value not provided on sign in");

    const valid = await comparePassword(hash, password);
    if (!valid) throw new Error("Invalid password");

    const token = jwt.sign({ username, id, admin }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return token;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function validateAuthorization(authorization) {
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") return { error: "malformed token" };

  const payload = await getTokenPayload(token);

  if (!payload) return { error: "invalid token" };

  return payload;
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
  validateAuthorization,
  getTokenPayload,
};
