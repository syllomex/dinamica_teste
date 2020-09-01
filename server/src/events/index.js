module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.emit("connected", { message: "Hello world" });
  });
};
