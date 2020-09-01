const app = require("./app");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
require("./events")(io);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log("server is running on port", PORT));
