import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import GlobalStyle from "./GlobalStyle";
import { Nav } from "./components/Nav";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          {/* <Route index element={<Nav />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
