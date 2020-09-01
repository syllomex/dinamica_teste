const { Create: CreateUser, Find: FindUser } = require("../useCases/User");

async function create(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(406).json({ error: "empty field" });

    const alreadyExists = await FindUser({ username });

    if (alreadyExists)
      return res.status(406).json({ error: "user already exists" });

    const err = await CreateUser({ username, password });

    if (err) return res.status(406).json({ error: err.message });

    return res.json({ message: "created" });
  } catch (error) {
    console.error("Error on create user controller:", error.message);
    return res.status(400).json({ error: "unexpected error" });
  }
}

module.exports = {
  create,
};
