const { getTokenPayload } = require("../services/auth");
const {
  Create: CreateMessage,
  GetHistory,
  DeleteByUUID,
} = require("../useCases/Message");

let messages = [];

module.exports = (io) => {
  io.on("connection", async (socket) => {
    const access_token = socket.handshake.query.access_token;
    const payload = await getTokenPayload(access_token);

    const { id: user_id, username } = payload;

    let history = await GetHistory();

    history = history.map((entry) => {
      return {
        uuid: entry.uuid,
        username: entry.user.username,
        content: entry.content,
        createdAt: entry.createdAt,
      };
    });

    socket.emit("connected", { payload, history });

    socket.on("chat.new_message", (data) => {
      let message = {
        uuid: data.uuid,
        content: data.content,
        username,
        user: user_id,
      };

      messages.push(message);

      CreateMessage({ ...message });

      socket.broadcast.emit("chat.new_message", {
        ...message,
        createdAt: new Date(),
      });
    });

    socket.on("chat.delete_message", (uuid) => {
      socket.broadcast.emit("chat.delete_message", uuid);

      let deleting_index;
      messages.forEach((message, index) => {
        if (message.uuid === uuid) deleting_index = index;
      });

      messages.splice(deleting_index, 1);

      DeleteByUUID({ uuid });
    });
  });
};
