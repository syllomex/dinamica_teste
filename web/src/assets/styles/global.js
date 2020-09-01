import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    outline: 0;
    color: #555;

    font-family: "Roboto", sans-serif;
  }

  html, body, #root {
    min-height: 100vh;
    padding: 0 10px;
  }

  html {
    font-size: 100%;

    @media (max-width: 480px) {
      font-size: 80%;
    }
  }

  input, button {
    border: none;
    outline: 0;
  }

  a {
    text-decoration: none;
  }

  :root {
    --primary: rgb(157, 125, 200);
    --secondary: rgb(101, 120, 240);
  }

  html {
    background: linear-gradient(var(--primary), var(--secondary));
  }
`;
