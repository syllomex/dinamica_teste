const mongo = require("mongoose");

module.exports = async () => {
  try {
    await mongo.connect("mongodb://localhost:27017/dinamica_teste", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to mongodb");
  } catch (error) {
    console.log("error on mongodb connection:", error.message);
  }
};
