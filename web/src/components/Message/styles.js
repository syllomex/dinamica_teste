import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const Container = styled.div`
  background-color: #fff;
  border-radius: 7px;

  width: fit-content;
  max-width: 500px;
  padding: 8px;

  overflow-x: hidden;

  margin-bottom: 8px;
`;

export const Header = styled.div`
  margin-bottom: 4px;

  > small {
    color: #888;
  }
`;
export const Content = styled.div`
  p {
    line-height: 1.4rem;
    word-wrap: break-word;
  }
`;
