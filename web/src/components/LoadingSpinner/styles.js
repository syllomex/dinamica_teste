import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Spinner = styled.div`
  width: 100px;
  height: 100px;

  border: 10px solid #ddd;
  border-top: 10px solid #555;
  border-radius: 50%;

  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
