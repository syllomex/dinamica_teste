import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;

  background-color: rgba(245, 245, 245, 0.4);
  margin-top: 30px;
  margin-bottom: 30px;
  border-radius: 7px;

  height: 93vh;
  width: 100%;
  max-width: 720px;

  animation: slide-from-left 0.5s ease-out backwards;
`;

export const MessagesContainer = styled.div`
  height: 75vh;
  padding: 20px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 4px;
    background-color: #eee;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--primary);
  }
`;

export const ChatFooter = styled.div`
  height: 8vh;
  width: 95%;
  align-self: center;

  > form {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;

  input {
    border: 1px solid #efefef;
    border-radius: 7px 0 0 7px;

    padding: 16px;
    font-size: 1.3rem;

    width: 100%;
  }

  button {
    cursor: pointer;

    background-color: var(--primary);
    color: #fff;

    font-size: 1.3rem;
    padding: 16px;

    border-radius: 0 7px 7px 0;

    transition-duration: 0.2s;

    &:hover {
      opacity: 0.9;
    }
    &:active {
      opacity: 0.8;
    }
  }
`;

export const FooterSpan = styled.span`
  margin-top: 12px;
  line-height: 24px;
  color: #fff;

  > b {
    color: #fff;
  }

  a {
    cursor: pointer;
    color: #fff;
  }
`;
