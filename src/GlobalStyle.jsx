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

  input, textarea {
    border: none;
    outline: none;
    &:focus {
      outline: none;
    }
  }

  button {
    border: none;
    outline: none;
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
`;

export default GlobalStyle;
