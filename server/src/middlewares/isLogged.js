const { getTokenPayload } = require("../services/auth");

module.exports = async (req, res, next) => {
  const authorization = req.headers.authorization;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer")
    return res.status(401).json({ error: "token malformed" });

  const payload = await getTokenPayload(token);

  if (!payload) return res.status(401).json({ error: "invalid token" });

  next();
};
