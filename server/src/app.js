const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");

require("./config/env");
require("./services/database")();

app.use(cors());
app.use(express.json());
app.use(routes);

module.exports = app;
