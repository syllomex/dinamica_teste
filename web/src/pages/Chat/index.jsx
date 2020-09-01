import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useProfile } from "../../contexts/profile";

function Chat() {
  const [socket, setSocket] = useState();
  const [connected, setConnected] = useState(false);

  const [history, setHistory] = useState([]);
  const [messages, setMessages] = useState([]);

  const { profile, setProfile } = useProfile();

  const contentRef = useRef();

  useEffect(() => {
    const socket = io("http://localhost:8080", {
      query: {
        access_token: profile?.access_token,
      },
    });

    setSocket(socket);
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("connected", (data) => {
      setHistory(data.history);

      setProfile({
        ...profile,
        username: data.payload.username,
        user_id: data.payload.id,
      });
      setConnected(true);
    });

    socket.on("chat.new_message", (data) => {
      setMessages((cur_messages) => [...cur_messages, data]);
    });
  }, [socket]);

  if (!socket)
    return (
      <div style={{ height: "100vh" }}>
        <LoadingSpinner />
      </div>
    );

  function handleSubmit(e) {
    e.preventDefault();
    const content = contentRef.current.value;

    if (!content) return;

    socket.emit("chat.new_message", content);

    setMessages((cur_messages) => [
      ...cur_messages,
      { username: profile.username, content },
    ]);
  }

  return (
    <div>
      <h1>{profile?.username}</h1>
      <form onSubmit={handleSubmit}>
        <textarea name="content" ref={contentRef} />
        <button type="submit">Enviar</button>
      </form>
      <div>
        {history?.map((entry, index) => (
          <div key={index}>
            <b
              style={{
                color: entry.username === profile.username ? "red" : "initial",
              }}
            >
              {entry.username}
            </b>
            <p>{entry.content}</p>
          </div>
        ))}
      </div>
      <hr />
      <div>
        {messages?.map((entry, index) => (
          <div key={index}>
            <b>{entry.username}</b>
            <p>{entry.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat;
