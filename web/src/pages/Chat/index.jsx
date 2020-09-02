import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import io from "socket.io-client";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useProfile } from "../../contexts/profile";

import {
  Container,
  ChatContainer,
  ChatFooter,
  MessagesContainer,
  FooterSpan,
} from "./styles";
import Message from "../../components/Message";

import { ReactComponent as SendIcon } from "../../assets/icons/paper-plane-regular.svg";

function Chat() {
  const [socket, setSocket] = useState();

  const [history, setHistory] = useState([]);
  const [messages, setMessages] = useState([]);

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
      setHistory(data.history);

      setProfile({
        ...profile,
        username: data.payload.username,
        user_id: data.payload.id,
      });
    });

    socket.on("chat.new_message", (data) => {
      setMessages((cur_messages) => [...cur_messages, data]);
    });
  }, [socket]); // eslint-disable-line

  useLayoutEffect(() => {
    setTimeout(() => {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }, 100);
  }, []);

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
      { username: profile.username, content, createdAt: new Date() },
    ]);

    contentRef.current.value = "";

    setTimeout(() => {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight + 100;
    }, 200);
  }

  function logout() {
    localStorage.removeItem("access_token");
    setProfile(null);
    window.location.href = "/";
  }

  return (
    <Container>
      <ChatContainer>
        <MessagesContainer ref={messagesContainerRef}>
          <div>
            {history?.map((entry, index) => (
              <Message key={index} data={entry} />
            ))}
          </div>
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
                <a href="#!" onClick={logout}>
                  Sair
                </a>
              </b>
            </FooterSpan>
          </form>
        </ChatFooter>
      </ChatContainer>
    </Container>
  );
}

export default Chat;
