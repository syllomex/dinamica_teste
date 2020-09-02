import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useProfile } from "../../contexts/profile";
import { v4 as uuid } from "uuid";

import {
  Container,
  ChatContainer,
  ChatFooter,
  MessagesContainer,
  FooterSpan,
} from "./styles";
import Message from "../../components/Message";

import { ReactComponent as SendIcon } from "../../assets/icons/paper-plane-regular.svg";
import { Link } from "react-router-dom";

function Chat() {
  const [socket, setSocket] = useState();
  const [connected, setConnected] = useState();

  const [messages, setMessages] = useState([]);
  const [deleting, setDeleting] = useState(null);

  const { profile, setProfile } = useProfile();

  const contentRef = useRef();
  const messagesContainerRef = useRef();

  useEffect(() => {
    const socket = io("http://localhost:8080", {
      query: {
        access_token: profile?.access_token,
      },
    });

    setSocket(socket);
  }, []); // eslint-disable-line

  useEffect(() => {
    if (!socket) return;

    socket.on("connected", (data) => {
      setMessages(data.history);

      setProfile({
        ...profile,
        username: data.payload.username,
        user_id: data.payload.id,
      });

      setConnected(true);
    });

    socket.on("chat.new_message", (data) =>
      setMessages((cur_messages) => [...cur_messages, data])
    );

    socket.on("chat.delete_message", (uuid) => setDeleting(uuid));
  }, [socket]); // eslint-disable-line

  useEffect(() => {
    if (connected)
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
  }, [connected]);

  useEffect(() => {
    if (!deleting) return;
    deleteMessage(deleting);
    setDeleting(null);
  }, [deleting]); // eslint-disable-line

  if (!socket)
    return (
      <div style={{ height: "100vh" }}>
        <LoadingSpinner />
      </div>
    );

  function handleSubmit(e) {
    e.preventDefault();
    const content = contentRef.current.value;
    const id = uuid();

    if (!content) return;

    socket.emit("chat.new_message", {
      uuid: id,
      content,
    });

    let cur_messages = [...messages];

    cur_messages.push({
      uuid: id,
      username: profile.username,
      content,
      createdAt: new Date(),
    });
    setMessages(cur_messages);

    contentRef.current.value = "";

    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight + 100;
  }

  function deleteMessage(uuid) {
    let cur_messages = [...messages];

    let deleting_index;
    cur_messages.forEach((message, index) => {
      if (message.uuid === uuid) deleting_index = index;
    });

    cur_messages.splice(deleting_index, 1);

    setMessages(cur_messages);
  }

  return (
    <Container>
      <ChatContainer>
        <MessagesContainer ref={messagesContainerRef}>
          <div>
            {messages?.map((entry, index) => (
              <Message key={index} data={entry} />
            ))}
          </div>
        </MessagesContainer>

        <ChatFooter>
          <form onSubmit={handleSubmit}>
            <input
              autoComplete="off"
              type="text"
              name="content"
              ref={contentRef}
            />
            <button type="submit">
              <SendIcon />
            </button>
          </form>
          <form>
            <FooterSpan>
              Conectado como <b>{profile?.username}</b> <br />{" "}
              <b>
                <Link to="/logout">Sair</Link>
              </b>
            </FooterSpan>
          </form>
        </ChatFooter>
      </ChatContainer>
    </Container>
  );
}

export default Chat;
