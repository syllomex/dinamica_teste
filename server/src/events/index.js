const { getTokenPayload } = require("../services/auth");
const { Create: CreateMessage, GetHistory } = require("../useCases/Message");

let messages = [];

module.exports = (io) => {
  io.on("connection", async (socket) => {
    const access_token = socket.handshake.query.access_token;
    const payload = await getTokenPayload(access_token);

    const { id: user_id, username } = payload;

    let history = await GetHistory();
    history = history.map((entry) => {
      return {
        _id: entry._id,
        username: entry.user.username,
        content: entry.content,
      };
    });

    socket.emit("connected", { payload, history });

    socket.on("chat.new_message", (content) => {
      messages.push({ content, username });

      CreateMessage({ content, user_id });

      socket.broadcast.emit("chat.new_message", { content, username });
      console.log(messages);
    });
  });
};
