import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: "Inter", sans-serif;
    font-size: 16px;
    margin: 0;
    padding: 0;
  }

  a {
    all: unset;
  }
`;

export default GlobalStyle;