import React, { useState } from "react";
import moment from "moment";

import { ReactComponent as ArrowDown } from "../../assets/icons/keyboard-arrow-down.svg";

import {
  Container,
  Wrapper,
  Header,
  Content,
  MenuButton,
  Menu,
} from "./styles";
import { useProfile } from "../../contexts/profile";

function Message({ data, onDelete }) {
  const { profile } = useProfile();

  const [menu, setMenu] = useState(false);

  window.onmousedown = (e) => {
    if (e.target.innerHTML === "Apagar mensagem") return;
    if (menu) setMenu(false);
  };

  function handleDelete() {
    onDelete(data.uuid);
    setMenu(false);
  }

  return (
    <Wrapper
      style={{
        justifyContent:
          data.username === profile.username ? "flex-end" : "flex-start",
      }}
    >
      <Container>
        <Header
          style={{
            justifyContent:
              data.username === profile.username ? "flex-end" : "flex-start",
          }}
        >
          <div>
            <small>{moment(data.createdAt).format("DD/MM/YY")} - </small>
            <b>{data.username}</b>
            <small> - {moment(data.createdAt).format("HH:mm")}</small>
          </div>
          {profile?.admin && (
            <div>
              <MenuButton onClick={() => setMenu(!menu)}>
                <ArrowDown />
              </MenuButton>
              {menu && (
                <Menu>
                  <li onClick={handleDelete}>Apagar mensagem</li>
                </Menu>
              )}
            </div>
          )}
        </Header>
        <Content>
          <p style={{ whiteSpace: "pre-wrap" }}>{data.content}</p>
        </Content>
      </Container>
    </Wrapper>
  );
}

export default Message;
