const router = require("express").Router();

const UserController = require("./controllers/UserController");
const AuthController = require("./controllers/AuthController");

router.post("/users", UserController.create);

router.post("/signin", AuthController.signIn);

module.exports = router;
