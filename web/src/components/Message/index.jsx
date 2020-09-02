import React from "react";
import moment from "moment";

import { Container, Wrapper, Header, Content } from "./styles";
import { useProfile } from "../../contexts/profile";

function Message({ data }) {
  const { profile } = useProfile();

  return (
    <Wrapper
      style={{
        justifyContent:
          data.username === profile.username ? "flex-end" : "flex-start",
      }}
    >
      <Container>
        <Header>
          <small>{moment(data.createdAt).format("DD/MM/YY")} </small>
          <b>{data.username}</b>
          <small> {moment(data.createdAt).format("HH:mm")}</small>
        </Header>
        <Content>
          <p>{data.content}</p>
        </Content>
      </Container>
    </Wrapper>
  );
}

export default Message;
