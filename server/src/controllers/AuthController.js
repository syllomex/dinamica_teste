const { GetPasswordHash, Find } = require("../useCases/User");
const { signIn } = require("../services/auth");

async function SignIn(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(406).json({ error: "empty field" });

    const exists = await Find({ username });

    if (!exists) return res.status(401).json({ error: "user not found" });

    const hash = await GetPasswordHash({ username });

    const token = await signIn({
      username,
      id: exists._id,
      hash,
      password,
      admin: exists.admin,
    });

    if (!token) return res.status(401).json({ error: "invalid password" });

    return res.json({
      access_token: token,
    });
  } catch (error) {
    console.error("Unexpected error on SignIn controller:", error.message);
    return res.status(400).json({ error: "unexpected error" });
  }
}

async function SignInAdm(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(406).json({ error: "empty field" });

    const exists = await Find({ username });

    if (!exists) return res.status(401).json({ error: "user not found" });

    if (!exists.admin) return res.status(401).json({ error: "not admin" });

    const hash = await GetPasswordHash({ username });

    const token = await signIn({
      username,
      id: exists._id,
      hash,
      password,
      admin: exists.admin,
    });

    if (!token) return res.status(401).json({ error: "invalid password" });

    return res.json({
      access_token: token,
    });
  } catch (error) {
    console.error("Unexpected error on SignIn controller:", error.message);
    return res.status(400).json({ error: "unexpected error" });
  }
}

module.exports = {
  signIn: SignIn,
  signInAdm: SignInAdm,
};
