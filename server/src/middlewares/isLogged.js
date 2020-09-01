const { validateAuthorization } = require("../services/auth");

module.exports = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const result = await validateAuthorization(authorization);

  if (result.error) return res.status(401).json({ error: "token malformed" });

  next();
};
