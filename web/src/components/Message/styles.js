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
  position: relative;
  margin-bottom: 4px;
  
  display: flex;
  align-items: center;

  grid-column-gap: 4px;

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

export const MenuButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 1rem;
  height: 1rem;

  cursor: pointer;
`;

export const Menu = styled.ul`
  position: absolute;
  top: 1rem;
  right: 0;

  > li {
    cursor: pointer;
    list-style: none;
    padding: 0.4rem;

    border-radius: 7px;
    border: 1px solid #eee;
    background-color: #fff;

    &:hover {
      background-color: #eee;
    }
  }
`;
