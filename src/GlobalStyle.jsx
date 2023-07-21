import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: "Noto Sans KR", "Inter", sans-serif;
    font-size: 16px;
    margin: 0;
    padding: 0;
  }

  /* 스크롤바 전체 기본 꾸미기 */
  body::-webkit-scrollbar {
    width: 12px; /* 세로축 스크롤바 폭 너비 */
  }

  /* 스크롤바 막대 꾸미기 */
  body::-webkit-scrollbar-thumb {
    background-color: #cbd5e1;
    border-radius: 10px;
  }

  /* 스크롤바 트랙 꾸미기 */
  body::-webkit-scrollbar-track {
    background-color: transparent;
  }

  a {
    all: unset;
  }

  input, textarea {
    border: none;
    outline: none;
    font-family: "Noto Sans KR", "Inter", "sans-serif";
    /* font-weight: 500; */
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #94a3b8;
    }
  }

  button {
    border: none;
    outline: none;
    cursor: pointer;
    font-family: "Noto Sans KR", "Inter", "sans-serif";
    /* font-weight: 500; */
    &:focus {
      outline: none;
    }
  }

  .quill {
    width: 100%;
    height: 480px;
    margin: 15px 0 50px 0;

    .ql-toolbar {
      font-family: "Noto Sans KR", "Inter", "sans-serif" !important;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
    /* .ql-snow.ql-toolbar button:hover, .ql-snow .ql-toolbar button:hover, .ql-snow.ql-toolbar button:focus, .ql-snow .ql-toolbar button:focus, .ql-snow.ql-toolbar button.ql-active, .ql-snow .ql-toolbar button.ql-active, .ql-snow.ql-toolbar .ql-picker-label:hover, .ql-snow .ql-toolbar .ql-picker-label:hover, .ql-snow.ql-toolbar .ql-picker-label.ql-active, .ql-snow .ql-toolbar .ql-picker-label.ql-active, .ql-snow.ql-toolbar .ql-picker-item:hover, .ql-snow .ql-toolbar .ql-picker-item:hover, .ql-snow.ql-toolbar .ql-picker-item.ql-selected, .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
      color: #7c3aed !important;
    } */
    .ql-container {
      padding-top: 10px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }
    .ql-snow {
      border: 1px solid #e2e8f0 !important;
    }
    .ql-editor {
      font-family: "Noto Sans KR", "Inter", "sans-serif";
      font-size: 16px;
      font-weight: 500;
      color: #0f172a;
    }
    .ql-editor.ql-blank::before{
      color: #94a3b8;
      font-style: normal;
      font-weight: 400;
    } 
  }
`;

export default GlobalStyle;
