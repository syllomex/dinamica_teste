const express = require("express");
const cors = require("cors");
const app = express();

require("./services/database")();

app.use(cors());
app.use(express.json());

module.exports = app;
