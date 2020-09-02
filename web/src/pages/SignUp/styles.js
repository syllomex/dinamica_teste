import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  background-color: #fff;
  padding: 40px;
  margin-top: 100px;
  margin-bottom: 100px;
  border-radius: 7px;

  width: 100%;
  @media (max-width: 480px) {
    width: 100%;
    padding: 20px 20px;
    margin-top: 24px;
  }

  max-width: 480px;

  h1 {
    font-size: 2.4rem;
    margin-bottom: 16px;
    font-weight: bold;

    > span {
      color: var(--primary);
    }
  }
  > span {
    display: block;
    color: #777;

    margin-bottom: 28px;
    line-height: 1.5rem;
  }

  input {
    border: 1px solid #efefef;

    border-radius: 7px;

    margin-bottom: 16px;
    padding: 24px;

    font-size: 1.3rem;

    ::placeholder {
      color: #bfbfbf;
    }

    &:focus {
      border-color: var(--primary);
    }
  }

  p {
    margin-top: 16px;
  }

  a {
    color: var(--secondary);

    &:hover {
      opacity: 0.8;
    }
  }

  button {
    cursor: pointer;

    padding: 12px;
    margin-top: 36px;

    font-size: 1.3rem;
    background-color: var(--primary);
    border-radius: 7px;
    color: #fff;

    &:hover {
      opacity: 0.9;
    }
    &:active {
      opacity: 0.8;
    }
  }

  * {
    transition-duration: 0.1s;
  }

  animation: slide-from-left 0.5s ease-out backwards;

  @keyframes slide-from-left {
    from {
      margin-right: 300px;
      opacity: 0.3;
    }
    to {
      margin-right: 0;
      opacity: 1;
    }
  }
`;
