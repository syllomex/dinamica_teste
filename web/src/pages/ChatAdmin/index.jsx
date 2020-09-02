import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import moment from "moment";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useProfile } from "../../contexts/profile";

import { Redirect } from "react-router-dom";

import {
  Container,
  ChatContainer,
  ChatFooter,
  MessagesContainer,
  FooterSpan,
} from "../Chat/styles";
import Message from "../../components/Message";

import { ReactComponent as SendIcon } from "../../assets/icons/paper-plane-regular.svg";
import { ChatHeader } from "./styles";

function ChatAdmin() {
  const [socket, setSocket] = useState();

  const [messages, setMessages] = useState([]);
  const [filtered, setFiltered] = useState(null);
  const [reversed, setReversed] = useState([]);

  const [order, setOrder] = useState("asc");

  const [usernameFilter, setUsernameFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);

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

      let reversedHistory = [...data.history];
      reversedHistory.reverse();
      setReversed(reversedHistory);

      setProfile({
        ...profile,
        username: data.payload.username,
        user_id: data.payload.id,
        admin: data.payload.admin,
      });
    });

    socket.on("chat.new_message", (data) => {
      setMessages((cur_messages) => [...cur_messages, data]);
    });
  }, [socket]); // eslint-disable-line

  useEffect(() => {
    if (usernameFilter) return filter();
    if (dateFilter) return filter();

    return setFiltered(null);
  }, [messages, usernameFilter, dateFilter]); // eslint-disable-line

  useEffect(() => {
    let reversedMessages = [];

    if (filtered) reversedMessages = [...filtered];
    else reversedMessages = [...messages];

    reversedMessages.reverse();
    setReversed(reversedMessages);
  }, [messages, filtered]);

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

    let cur_messages = [...messages];

    console.log("current", cur_messages);

    cur_messages.push({
      username: profile.username,
      content,
      createdAt: new Date(),
    });
    setMessages(cur_messages);

    contentRef.current.value = "";

    setTimeout(() => {
      if (order === "asc")
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight + 100;
    }, 100);
  }

  function logout() {
    localStorage.removeItem("access_token");
    setProfile(null);
    window.location.href = "/";
  }

  if (profile.admin === false) return <Redirect to="/" />;

  function handleUsernameFilter(e) {
    setUsernameFilter(e.target.value);
  }

  function handleDateFilter(e) {
    setDateFilter(e.target.value);
  }

  function handleChangeOrder(e) {
    setOrder(e.target.value);
  }

  function filter() {
    let filteredMessages = [];

    filteredMessages = messages.filter((message) => {
      if (usernameFilter && dateFilter)
        return (
          message.username.startsWith(usernameFilter) &&
          moment(message.date).format("DD/MM/YY") ===
            moment(dateFilter).format("DD/MM/YY")
        );

      if (usernameFilter && !dateFilter)
        return message.username.startsWith(usernameFilter);

      if (dateFilter && !usernameFilter)
        return (
          moment(message.date).format("DD/MM/YY") ===
          moment(dateFilter).format("DD/MM/YY")
        );

      return null;
    });

    setFiltered(filteredMessages);
  }

  return (
    <Container>
      <ChatContainer>
        <ChatHeader>
          <span>Filtrar</span>
          <div>
            <input
              onChange={handleUsernameFilter}
              type="text"
              placeholder="Nome de usuário"
            />
            <input onChange={handleDateFilter} type="date" placeholder="Data" />
            <select onChange={handleChangeOrder} value={order}>
              <option value="asc">Mais recentes</option>
              <option value="desc">Mais antigas</option>
            </select>
          </div>
        </ChatHeader>
        <MessagesContainer ref={messagesContainerRef}>
          {order === "desc" ? (
            <div>
              {reversed?.map((entry, index) => (
                <Message key={index} data={entry} />
              ))}
            </div>
          ) : filtered ? (
            <div>
              {filtered.map((entry, index) => (
                <Message key={index} data={entry} />
              ))}
            </div>
          ) : (
            <div>
              {messages?.map((entry, index) => (
                <Message key={index} data={entry} />
              ))}
            </div>
          )}
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
              Conectado como <b>{profile?.username} (Administrador)</b> <br />{" "}
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

export default ChatAdmin;
