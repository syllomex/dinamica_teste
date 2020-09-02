import styled from "styled-components";

export const ChatHeader = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 5rem;
  padding: 1rem;
  margin-bottom: 1rem;

  > span {
    color: #fff;
    margin-bottom: 0.3rem;
  }

  > div {
    display: flex;

    > input,
    > select {
      width: 100%;
      padding: 0.8rem;
      border-radius: 7px;
      outline: 0;

      font-size: 1rem;
      color: #777;

      &::placeholder {
        color: #aaa;
      }
    }

    > input {
      margin-right: 1rem;
    }
  }
`;
